import { useState, useEffect } from "react";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Withdraw = () => {
  const { user, coins, setCoins } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");

  const coinToDollar = 20; // business logic

  useEffect(() => {
    setWithdrawAmount((withdrawCoin / coinToDollar).toFixed(2));
  }, [withdrawCoin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (withdrawCoin > coins) {
      Swal.fire("Error", "You don't have enough coins", "error");
      return;
    }

    try {
      const res = await axiosSecure.post("/withdrawals", {
        worker_email: user.email,
        worker_name: user.displayName,
        withdrawal_coin: withdrawCoin,
        withdrawal_amount: withdrawAmount,
        payment_system: paymentSystem,
      });

      if (res.data.insertedId) {
        Swal.fire(
          "Success",
          `Withdrawal request of $${withdrawAmount} submitted!`,
          "success"
        );
        setCoins(coins - withdrawCoin);
        setWithdrawCoin(0);
        setPaymentSystem("Bkash");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit withdrawal", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-primary mb-4">Withdraw Coins</h2>
      <p className="mb-2">Your total coins: {coins}</p>
      <p className="mb-4">
        Withdrawal amount: ${withdrawCoin ? withdrawAmount : 0}
      </p>

      {coins < 200 ? (
        <p className="text-red-500 font-semibold">Insufficient coins to withdraw</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            min={200}
            max={coins}
            value={withdrawCoin}
            onChange={(e) => setWithdrawCoin(Number(e.target.value))}
            className="input input-bordered w-full"
            placeholder="Coins to withdraw"
            required
          />
          <input
            type="text"
            value={`$${withdrawAmount}`}
            className="input input-bordered w-full bg-gray-100"
            disabled
          />
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="select select-bordered w-full"
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
            <option>Other</option>
          </select>
          <button type="submit" className="btn btn-primary w-full">
            Withdraw
          </button>
        </form>
      )}
    </div>
  );
};

export default Withdraw;
