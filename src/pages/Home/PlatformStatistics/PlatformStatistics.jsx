import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaTasks, FaCoins, FaChartLine, FaTrophy, FaGlobe } from "react-icons/fa";

const statsData = [
  {
    icon: FaUsers,
    title: "Active Users",
    value: 12500,
    suffix: "+",
    desc: "Freelancers & Businesses",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: FaTasks,
    title: "Tasks Completed",
    value: 45000,
    suffix: "+",
    desc: "Successfully finished",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: FaCoins,
    title: "Coins Distributed",
    value: 2500000,
    suffix: "+",
    desc: "Total rewards paid",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaChartLine,
    title: "Growth Rate",
    value: 150,
    suffix: "%",
    desc: "Year over year",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: FaTrophy,
    title: "Top Workers",
    value: 500,
    suffix: "+",
    desc: "Elite performers",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: FaGlobe,
    title: "Countries",
    value: 85,
    suffix: "+",
    desc: "Global presence",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
  },
];

const PlatformStatistics = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Platform Statistics
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Numbers that showcase our growing community and platform success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-base-100 rounded-2xl p-8 border-2 border-base-300 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl ${stat.bgColor}`}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} opacity-20`}></div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-base-content mb-3">
                  {stat.title}
                </h3>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      decimals={0}
                    />
                  </span>
                  <span className="text-2xl font-bold text-primary ml-1">{stat.suffix}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-base-content/60">
                  {stat.desc}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-base-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-base-100 border-2 border-primary/20 rounded-full">
            <FaChartLine className="text-primary" />
            <span className="text-base-content font-semibold">
              Growing every day • Join thousands of satisfied users
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStatistics;
