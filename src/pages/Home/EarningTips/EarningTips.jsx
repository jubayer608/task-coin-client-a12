import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaHandsHelping, FaClock, FaRocket, FaStar, FaMoneyBillWave } from 'react-icons/fa';

const tips = [
  { icon: <FaLightbulb />, title: "Understand Task Details", desc: "Read each task’s instructions carefully before starting. This minimizes revisions and earns you more rewards." },
  { icon: <FaHandsHelping />, title: "Stay Consistent", desc: "Log in regularly and complete tasks consistently. Frequent activity improves your rating and unlocks bonus tasks." },
  { icon: <FaClock />, title: "Manage Your Time", desc: "Prioritize short tasks when you’re pressed for time, and use quieter hours to tackle longer tasks efficiently." },
  { icon: <FaRocket />, title: "Boost Your Earnings", desc: "Focus on high-paying tasks or special events to maximize your daily earnings efficiently." },
  { icon: <FaStar />, title: "Maintain Quality", desc: "Submit tasks accurately to maintain a high rating. Top-rated users get priority access to premium tasks." },
  { icon: <FaMoneyBillWave />, title: "Track Your Coins", desc: "Keep track of your earned coins and plan your purchases wisely to stay ahead in the platform." }
];

const EarningTips = () => (
  <section aria-labelledby="earning-tips-heading" className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg">
    <h2 id="earning-tips-heading" className="text-3xl font-bold text-center text-primary mb-12">
      Earning Tips
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          className="card bg-white dark:bg-gray-900 text-base-content shadow-lg rounded-2xl p-6 border border-base-300 hover:border-primary hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center mb-5">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary text-3xl">
              {tip.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">{tip.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-center">{tip.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default EarningTips;
