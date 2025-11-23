import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheck, FaRocket, FaCrown, FaStar } from "react-icons/fa";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    icon: FaRocket,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Up to 5 tasks per month",
      "Basic support",
      "Standard payment processing",
      "Community access",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Professional",
    price: "$9.99",
    period: "/month",
    description: "For serious freelancers",
    icon: FaStar,
    color: "from-purple-500 to-pink-500",
    features: [
      "Unlimited tasks",
      "Priority support",
      "Fast payment processing",
      "Advanced analytics",
      "Featured profile",
      "Early access to new features",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    description: "For businesses and teams",
    icon: FaCrown,
    color: "from-yellow-500 to-orange-500",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "Team collaboration tools",
      "Bulk task management",
      "API access",
      "24/7 phone support",
    ],
    popular: false,
  },
];

const PricingPlans = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Start free and upgrade anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-base-100 rounded-2xl p-8 border-2 shadow-xl transition-all duration-300 flex flex-col ${
                  plan.popular
                    ? "border-primary shadow-2xl scale-105"
                    : "border-base-300 hover:border-primary"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 mx-auto flex-shrink-0`}>
                  <Icon className="text-white text-2xl" />
                </div>

                <h3 className="text-2xl font-bold text-base-content mb-2 text-center">
                  {plan.name}
                </h3>
                <p className="text-base-content/60 text-center mb-6">{plan.description}</p>

                <div className="text-center mb-6">
                  <span className="text-4xl font-extrabold text-base-content">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base-content/60 ml-1">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <FaCheck className="text-primary flex-shrink-0 mt-1" />
                      <span className="text-base-content/70">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto flex-shrink-0"
                >
                  <Link
                    to={plan.id === 3 ? "/contact" : "/register"}
                    className={`block w-full text-center py-3 rounded-xl font-bold transition-all duration-300 ${
                      plan.id === 1
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-xl"
                        : plan.id === 2
                        ? "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-xl"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl"
                    }`}
                  >
                    {plan.id === 3 ? "Contact Sales" : "Get Started"}
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-base-content/70 mb-4">
            All plans include secure payments and 30-day money-back guarantee
          </p>
          <a href="#faq" className="text-primary hover:text-secondary font-semibold transition-colors">
            View FAQ →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;

