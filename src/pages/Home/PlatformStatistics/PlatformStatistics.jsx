import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaTasks, FaCoins } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Total Users",
    value: 8523,
    desc: "registered so far",
  },
  {
    icon: <FaTasks className="w-8 h-8" />,
    title: "Tasks Completed",
    value: 15309,
    desc: "total tasks finished",
  },
  {
    icon: <FaCoins className="w-8 h-8" />,
    title: "Coins Earned",
    value: 1254678,
    desc: "rewarded to users",
  },
];

const PlatformStatistics = () => (
  <section
    aria-labelledby="platform-stats-heading"
    className="py-16 my-12 px-4 md:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl"
  >
    <h2
      id="platform-stats-heading"
      className="text-3xl font-bold text-center text-primary mb-12"
    >
      Platform Statistics
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          className="card bg-white dark:bg-gray-900 text-base-content shadow-lg rounded-2xl p-8 border border-base-300 hover:border-primary hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.2, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary text-2xl">
              {stat.icon}
            </div>
          </div>

          {/* Title */}
          <div className="text-center text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {stat.title}
          </div>

          {/* Value */}
          <div className="text-3xl font-bold text-center text-secondary mb-1">
            <CountUp start={0} end={stat.value} duration={2.5} separator="," />
          </div>

          {/* Description */}
          <div className="text-center text-base-content/70 dark:text-gray-300">
            {stat.desc}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default PlatformStatistics;
