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
  <section aria-labelledby="earning-tips-heading" className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 id="earning-tips-heading" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
          Earning Tips
        </h2>
        <p className="text-neutral text-lg">Maximize your earning potential with these proven strategies</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="bg-base-100 border border-base-300 shadow-lg rounded-2xl p-6 hover:border-primary hover:shadow-2xl transition-all duration-300"
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
            <h3 className="text-xl font-bold mb-3 text-center text-base-content">{tip.title}</h3>
            <p className="text-base-content/70 text-center">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EarningTips;
