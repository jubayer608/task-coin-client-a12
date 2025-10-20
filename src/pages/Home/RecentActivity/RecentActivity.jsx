import React from "react";
import { motion } from "framer-motion";
import { FaCoins, FaStar } from "react-icons/fa";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "completed",
      task: "Logo Design Review",
      coins: 15,
      time: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "earned",
      task: "Mobile App Testing",
      coins: 25,
      time: "3 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "completed",
      task: "Content Writing",
      coins: 20,
      time: "5 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 4,
      user: "Alex Rodriguez",
      action: "earned",
      task: "Website Review",
      coins: 30,
      time: "6 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Recent Activity
          </h2>
          <p className="text-neutral text-lg">See what our community is accomplishing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-base-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-base-content">{activity.user}</span>
                    <span className="text-base-content/60">{activity.action}</span>
                    <span className="font-medium text-base-content/80">{activity.task}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-secondary">
                      <FaCoins className="mr-1" />
                      <span className="font-semibold">{activity.coins} coins</span>
                    </div>
                    <span className="text-neutral text-sm">{activity.time}</span>
                  </div>
                </div>
                <div className="text-accent">
                  <FaStar />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Join the Community
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
