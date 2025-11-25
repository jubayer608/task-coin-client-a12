import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiDollarSign, FiCreditCard, FiArrowDownCircle } from "react-icons/fi";

const Withdraw = () => {
  const { user, coins, setCoins } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");

  const coinToDollar = 20; // Conversion rate: 20 coins = 1 USD

  useEffect(() => {
    setWithdrawAmount((withdrawCoin / coinToDollar).toFixed(2));
  }, [withdrawCoin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check minimum coin requirement
    if (coins < 200) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Coins",
        text: "You need at least 200 coins to withdraw.",
      });
      return;
    }

    if (withdrawCoin > coins) {
      Swal.fire({
        icon: "warning",
        title: "Not Enough Coins",
        text: "You don't have enough coins for this withdrawal.",
      });
      return;
    }

    const withdrawalData = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: withdrawCoin,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/withdrawals", withdrawalData);

      if (res.data.insertedId) {
        Swal.fire(
          "Success 🎉",
          `Withdrawal request of $${withdrawAmount} submitted successfully!`,
          "success"
        );
        setWithdrawCoin("");
        setPaymentSystem("Bkash");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit withdrawal request", "error");
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10 p-8 bg-base-100 border border-base-300 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex justify-center items-center gap-2">
          <FiArrowDownCircle /> Withdraw Coins
        </h2>
        <p className="text-base-content/70 mt-2">
          Convert your earned coins into real money securely
        </p>
      </div>

      {/* Coin Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-4 rounded-xl mb-6 text-center">
        <h3 className="text-lg font-semibold text-primary">
          Available Coins:{" "}
          <span className="text-secondary font-bold">{coins}</span>
        </h3>
        <p className="text-sm text-base-content/70">
          20 Coins = 1 USD | Minimum 200 coins required
        </p>
      </div>

      {/* Withdraw Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Coin Input */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Coins to Withdraw</span>
          </label>
          <input
            type="number"
            min={200}
            max={coins}
            value={withdrawCoin}
            onChange={(e) => setWithdrawCoin(Number(e.target.value))}
            placeholder="Enter coin amount"
            className="input input-bordered w-full focus:outline-primary"
            required
          />
        </div>

        {/* Withdraw Amount */}
        <div>
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <FiDollarSign /> Amount in USD
            </span>
          </label>
          <input
            type="text"
            value={`$${withdrawAmount || 0}`}
            className="input input-bordered w-full bg-base-200 text-base-content"
            disabled
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <FiCreditCard /> Select Payment System
            </span>
          </label>
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="select select-bordered w-full focus:outline-primary"
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
            <option>Upay</option>
            <option>Other</option>
          </select>
        </div>

        {/* Withdraw Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-full py-3 rounded-xl font-bold text-lg text-white overflow-hidden hover:shadow-lg transition-all"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl"></span>
          <span className="relative z-10">Withdraw Now</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Withdraw;
