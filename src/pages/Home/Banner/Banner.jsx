import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaCheckCircle, FaArrowRight, FaPlayCircle, FaUsers, FaCoins, FaStar } from "react-icons/fa";

const Banner = () => {
  const stats = [
    { icon: FaUsers, value: "10K+", label: "Active Users" },
    { icon: FaCoins, value: "$2M+", label: "Total Earnings" },
    { icon: FaStar, value: "4.9", label: "Rating" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <FaRocket className="text-primary" />
              <span className="text-sm font-semibold text-primary">Join 10,000+ Freelancers</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Earn Money
              </span>
              <br />
              <span className="text-base-content">Doing What You Love</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-base-content/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Complete micro-tasks, build your reputation, and earn coins instantly. Join the most trusted platform for freelancers and businesses.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
            >
              {["Instant Payments", "Flexible Schedule", "Global Opportunities"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary" />
                  <span className="text-base-content/80 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>Get Started Free</span>
                  <FaArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-base-100 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaPlayCircle />
                  <span>Watch Demo</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-base-300"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center lg:text-left">
                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                      <Icon className="text-primary text-xl" />
                      <span className="text-2xl md:text-3xl font-extrabold text-base-content">{stat.value}</span>
                    </div>
                    <p className="text-sm text-base-content/60">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 bg-base-100 p-6 rounded-2xl shadow-2xl border border-base-300 z-20 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <FaCoins className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-base-content">$1,250</p>
                    <p className="text-xs text-base-content/60">Earned This Month</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 bg-base-100 p-6 rounded-2xl shadow-2xl border border-base-300 z-20 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-base-content">145</p>
                    <p className="text-xs text-base-content/60">Tasks Completed</p>
                  </div>
                </div>
              </motion.div>

              {/* Main Visual */}
              <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-white/80 text-sm mb-2">Active Tasks</div>
                      <div className="text-3xl font-bold text-white">24</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-white/80 text-sm mb-2">Total Coins</div>
                      <div className="text-3xl font-bold text-white">5.2K</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-semibold">Recent Earnings</span>
                      <span className="text-white/80 text-sm">Today</span>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20"></div>
                            <div>
                              <div className="text-white font-medium">Task #{100 + item}</div>
                              <div className="text-white/60 text-xs">Completed</div>
                            </div>
                          </div>
                          <div className="text-white font-bold">+$25</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-base-content/50 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
