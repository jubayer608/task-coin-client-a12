import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaDollarSign, FaUsers, FaHeadset } from "react-icons/fa";

const whyChooseData = [
  {
    id: 1,
    title: "Trusted Platform",
    content:
      "Our platform is trusted by thousands of users worldwide for secure micro-tasks and reliable payments.",
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    title: "Fast Payment",
    content:
      "Workers receive coins instantly after task approval. Buyers can purchase coins easily.",
    icon:
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <FaDollarSign />
      </motion.div>,
  },
  {
    id: 3,
    title: "User Friendly",
    content:
      "Our interface is clean, intuitive, and responsive for all devices.",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "24/7 Support",
    content:
      "We provide round-the-clock support to ensure all users have a smooth experience.",
    icon: <FaHeadset />,
  },
];

const WhyChooseUsSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="bg-base-200 py-20 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {whyChooseData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 120 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-primary transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 focus:outline-none hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 text-primary text-2xl shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                </div>
                <span className="text-2xl text-primary">
                  {openId === item.id ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="px-6 pb-6 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
