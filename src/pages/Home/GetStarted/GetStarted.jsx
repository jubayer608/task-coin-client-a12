import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaCheckCircle, FaArrowRight, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Create Account",
    description: "Sign up in less than 2 minutes with just your email",
    icon: FaUserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Choose Your Role",
    description: "Join as a Worker or Buyer based on your needs",
    icon: FaCheckCircle,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Start Earning",
    description: "Complete tasks and get paid instantly in coins",
    icon: FaRocket,
    color: "from-green-500 to-emerald-500",
  },
];

const benefits = [
  "No upfront costs",
  "Instant payments",
  "Flexible schedule",
  "Global opportunities",
];

const GetStarted = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30"
          >
            <FaRocket className="text-4xl text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Join thousands of users already earning on TaskCoin. Start your journey today!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl mb-4 mx-auto`}>
                    <Icon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <span className="text-white font-bold text-sm">{step.id}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Why Start Today?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-2 justify-center"
              >
                <FaCheckCircle className="text-white text-lg" />
                <span className="text-white font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <FaUserPlus />
              <span>Create Free Account</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <div className="text-4xl font-extrabold mb-2">10K+</div>
            <div className="text-white/80">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">50K+</div>
            <div className="text-white/80">Tasks Completed</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">$2M+</div>
            <div className="text-white/80">Total Earnings</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">4.9★</div>
            <div className="text-white/80">User Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;


