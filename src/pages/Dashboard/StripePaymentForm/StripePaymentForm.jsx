import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
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
      // Create payment intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: selectedPackage.price,
        email: user.email,
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: user.email },
        },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        // Save payment info in backend
        await axiosSecure.post("/payment-success", {
          email: user.email,
          coins: selectedPackage.coins,
          amount: selectedPackage.price,
          transactionId: result.paymentIntent.id,
        });

        // Update frontend coin state
        setCoins(coins + selectedPackage.coins);

        Swal.fire(
          "Success",
          `${selectedPackage.coins} coins added to your account!`,
          "success"
        );
        onSuccess();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed", "error");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-primary">
        Pay ${selectedPackage.price} to get {selectedPackage.coins} coins
      </h2>
      <CardElement className="p-3 border rounded" />
      <button
        className="btn btn-primary w-full mt-4"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default StripePaymentForm;
