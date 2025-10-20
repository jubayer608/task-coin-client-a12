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
    className="py-16 px-4 md:px-8 bg-white"
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2
          id="platform-stats-heading"
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
        >
          Platform Statistics
        </h2>
        <p className="text-neutral text-lg">Our growing community achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-2xl transition-all duration-300"
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
            <div className="text-center text-lg font-semibold mb-2 text-gray-900">
              {stat.title}
            </div>

            {/* Value */}
            <div className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1">
              <CountUp start={0} end={stat.value} duration={2.5} separator="," />
            </div>

            {/* Description */}
            <div className="text-center text-gray-600">
              {stat.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformStatistics;
