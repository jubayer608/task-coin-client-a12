import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import StripePaymentForm from "../StripePaymentForm/StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const coinsPackages = [
  { coins: 50, price: 5 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const [selectedPackage, setSelectedPackage] = useState(coinsPackages[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-base-200 py-10 px-6 flex flex-col items-center justify-center"
    >
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-primary flex items-center gap-2">
        <FiDollarSign className="text-secondary" /> Purchase Coins
      </h1>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl w-full">
        {coinsPackages.map((pkg, index) => (
          <motion.div
            key={pkg.coins}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPackage(pkg)}
            className={`relative cursor-pointer rounded-2xl p-8 border-2 transition-all shadow-md ${
              selectedPackage?.coins === pkg.coins
                ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg"
                : "border-base-300 bg-base-100 hover:border-primary/50 hover:shadow-lg"
            }`}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-2">
                {pkg.coins} Coins
              </h2>
              <p className="text-lg text-base-content/70 font-medium">
                ${pkg.price} USD
              </p>
            </div>
            {selectedPackage?.coins === pkg.coins && (
              <motion.div
                layoutId="glow"
                className="absolute inset-0 border-4 border-primary/50 rounded-2xl animate-pulse pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Payment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center text-base-content mb-6">
          Complete Your Payment
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 text-center sm:text-left">
          <div className="flex-1 mb-4 sm:mb-0">
            <p className="text-base-content/70">Selected Package</p>
            <h3 className="text-2xl font-bold text-primary">
              {selectedPackage.coins} Coins
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-base-content/70">Total Price</p>
            <h3 className="text-2xl font-bold text-secondary">
              ${selectedPackage.price} USD
            </h3>
          </div>
        </div>

        <div className="divider my-4"></div>

        <Elements stripe={stripePromise}>
          <StripePaymentForm
            selectedPackage={selectedPackage}
            onSuccess={() => console.log("Payment successful!")}
          />
        </Elements>
      </motion.div>
    </motion.div>
  );
};

export default PurchaseCoin;
