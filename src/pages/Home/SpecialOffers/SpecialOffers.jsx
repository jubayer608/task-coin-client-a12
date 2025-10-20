import React from "react";
import { motion } from "framer-motion";
import { FaGift, FaPercent, FaFire, FaCrown } from "react-icons/fa";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "New User Bonus",
      description: "Get 50 bonus coins when you complete your first task",
      icon: <FaGift />,
      color: "from-green-400 to-green-600",
      badge: "Limited Time"
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "20% extra coins on all weekend tasks",
      icon: <FaPercent />,
      color: "from-blue-400 to-blue-600",
      badge: "Weekends Only"
    },
    {
      id: 3,
      title: "Hot Tasks",
      description: "Premium tasks with double coin rewards",
      icon: <FaFire />,
      color: "from-red-400 to-red-600",
      badge: "Premium"
    },
    {
      id: 4,
      title: "VIP Membership",
      description: "Unlock exclusive high-paying tasks",
      icon: <FaCrown />,
      color: "from-purple-400 to-purple-600",
      badge: "Exclusive"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">Special Offers</h2>
          <p className="text-neutral text-lg">Don't miss out on these amazing opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative bg-base-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 bg-gradient-to-r ${offer.color} text-white px-3 py-1 text-xs font-bold rounded-bl-lg`}>
                {offer.badge}
              </div>
              
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${offer.color} rounded-full flex items-center justify-center text-white text-2xl`}>
                  {offer.icon}
                </div>
                
                <h3 className="text-xl font-bold text-base-content mb-3">{offer.title}</h3>
                <p className="text-base-content/70 mb-4">{offer.description}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
