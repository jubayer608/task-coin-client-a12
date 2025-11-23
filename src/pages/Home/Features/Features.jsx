import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaRocket,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaChartLine,
  FaMobileAlt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: FaShieldAlt,
    title: "Secure Payments",
    description: "Your earnings are protected with industry-leading security measures and encrypted transactions.",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    icon: FaRocket,
    title: "Fast Processing",
    description: "Get paid quickly with our streamlined payment system. Most withdrawals process within 24 hours.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    icon: FaDollarSign,
    title: "Competitive Rates",
    description: "Earn fair compensation for your work. We ensure competitive rates across all task categories.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    icon: FaClock,
    title: "Flexible Schedule",
    description: "Work on your own time. Choose tasks that fit your schedule and availability.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    icon: FaUsers,
    title: "Global Community",
    description: "Join a diverse community of skilled professionals from around the world.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    icon: FaChartLine,
    title: "Growth Opportunities",
    description: "Build your reputation, earn badges, and unlock higher-paying opportunities.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: 7,
    icon: FaMobileAlt,
    title: "Mobile Friendly",
    description: "Access TaskCoin anywhere, anytime with our fully responsive mobile platform.",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 8,
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated customer support team.",
    color: "from-orange-500 to-red-500",
  },
];

const Features = () => {
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
              Why Choose TaskCoin?
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Everything you need to succeed in the freelance world, all in one platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-base-100 rounded-2xl p-6 border-2 border-base-300 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;


