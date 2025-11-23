import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaDollarSign, FaUsers, FaHeadset, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const whyChooseData = [
  {
    id: 1,
    title: "Trusted Platform",
    content:
      "Our platform is trusted by thousands of users worldwide for secure micro-tasks and reliable payments. We use industry-leading security measures to protect your data and transactions.",
    icon: FaShieldAlt,
    features: ["SSL Encryption", "Secure Payments", "Data Protection", "Verified Users"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Fast Payment",
    content:
      "Workers receive coins instantly after task approval. Buyers can purchase coins easily with multiple payment options. No waiting, no delays - get paid when you deserve it.",
    icon: FaDollarSign,
    features: ["Instant Payments", "Multiple Methods", "24/7 Processing", "Low Fees"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "User Friendly",
    content:
      "Our interface is clean, intuitive, and responsive for all devices. Whether you're on desktop, tablet, or mobile, TaskCoin works seamlessly everywhere you go.",
    icon: FaUsers,
    features: ["Easy Navigation", "Mobile Responsive", "Intuitive Design", "Quick Setup"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "24/7 Support",
    content:
      "We provide round-the-clock support to ensure all users have a smooth experience. Our dedicated team is always ready to help you with any questions or issues.",
    icon: FaHeadset,
    features: ["Live Chat", "Email Support", "Help Center", "Community Forum"],
    gradient: "from-orange-500 to-red-500",
  },
];

const WhyChooseUsSection = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId(openId === id ? null : id);

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
            Discover what makes us the preferred choice for freelancers and businesses worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {whyChooseData.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openId === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-base-100 border-2 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-primary shadow-2xl" : "border-base-300 hover:border-primary/50"
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full focus:outline-none"
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="text-white text-2xl" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-base-content mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-base-content/60 line-clamp-1">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex-shrink-0"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? "bg-primary text-white" : "bg-base-200 text-base-content"
                      }`}>
                        <FaArrowRight className="text-sm" />
                      </div>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-base-300 pt-6">
                        <p className="text-base-content/80 mb-6 leading-relaxed">
                          {item.content}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {item.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <FaCheckCircle className="text-primary flex-shrink-0" />
                              <span className="text-base-content/70">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
