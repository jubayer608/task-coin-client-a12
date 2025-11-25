import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StripePaymentForm = ({ selectedPackage, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, coins, setCoins } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: selectedPackage.price,
        email: user.email,
      });

      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: user.email },
        },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        // 3️⃣ Save Payment Info
        await axiosSecure.post("/payment-success", {
          email: user.email,
          coins: selectedPackage.coins,
          amount: selectedPackage.price,
          transactionId: result.paymentIntent.id,
        });

        // 4️⃣ Update Frontend Coin State
        setCoins(coins + selectedPackage.coins);

        // ✅ Clear Card Input Field
        elements.getElement(CardElement).clear();

        // ✅ Sweet Alert + Reset
        Swal.fire(
          "Payment Successful 🎉",
          `${selectedPackage.coins} coins have been added to your account!`,
          "success"
        ).then(() => {
          onSuccess(); // parent side reset
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-base-100 border border-base-300 p-8 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-xl opacity-70 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Pay <span className="text-secondary">${selectedPackage.price}</span> for{" "}
          <span className="text-accent">{selectedPackage.coins}</span> Coins
        </h2>

        <div className="bg-base-200/60 border border-base-300 rounded-xl p-4 mb-6 transition focus-within:border-primary">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1e293b",
                  iconColor: "#7C3AED",
                  "::placeholder": {
                    color: "#94A3B8",
                  },
                  fontFamily: "Inter, sans-serif",
                },
                invalid: {
                  color: "#EF4444",
                  iconColor: "#EF4444",
                },
              },
            }}
          />
        </div>

        {/* ✨ Gradient Pay Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handlePayment}
          className={`relative w-full py-3 rounded-xl font-bold text-lg text-white overflow-hidden transition-all duration-300 ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:shadow-lg hover:shadow-primary/40"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl"></span>
          <span className="absolute inset-0 bg-black/10 rounded-xl mix-blend-overlay"></span>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm text-white"></span>
                Processing...
              </>
            ) : (
              <>
                💳 Pay Now
              </>
            )}
          </span>
        </motion.button>

        <p className="text-center text-sm text-base-content/60 mt-4">
          100% Secure payment powered by Stripe 🔒
        </p>
      </div>
    </motion.div>
  );
};

export default StripePaymentForm;
