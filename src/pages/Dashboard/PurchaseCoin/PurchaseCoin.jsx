import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../StripePaymentForm/StripePaymentForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const coinsPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-secondary">
        Purchase Coins
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinsPackages.map((pkg) => (
          <div
            key={pkg.coins}
            className={`card p-4 cursor-pointer shadow-md ${
              selectedPackage?.coins === pkg.coins
                ? "border-4 border-primary"
                : ""
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <h2 className="text-xl font-bold">{pkg.coins} Coins</h2>
            <p className="mt-2 text-gray-700">= ${pkg.price}</p>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm
            selectedPackage={selectedPackage}
            onSuccess={() => setSelectedPackage(null)}
          />
        </Elements>
      )}
    </div>
  );
};

export default PurchaseCoin;
