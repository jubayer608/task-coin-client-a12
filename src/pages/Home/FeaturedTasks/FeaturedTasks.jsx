import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaClock, FaDollarSign, FaUsers } from "react-icons/fa";

const FeaturedTasks = () => {
  const featuredTasks = [
    {
      id: 1,
      title: "Website Design Review",
      description: "Review and provide feedback on modern website designs",
      price: 25,
      deadline: "3 days",
      workers: 2,
      image: "https://i.postimg.cc/bvSbvtz4/2348785.jpg"
    },
    {
      id: 2,
      title: "Mobile App Testing",
      description: "Test mobile application functionality and report bugs",
      price: 35,
      deadline: "5 days",
      workers: 3,
      image: "https://i.ibb.co/8DN30f5k/representation-user-experience-interface-design.jpg"
    },
    {
      id: 3,
      title: "Content Writing",
      description: "Write engaging blog posts for tech companies",
      price: 20,
      deadline: "2 days",
      workers: 1,
      image: "https://i.ibb.co.com/7J659X1x/notepad-laptop-concept.jpg"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">Featured Tasks</h2>
          <p className="text-neutral text-lg">Discover high-paying tasks available now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-base-200 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${task.image})` }}>
                <div className="h-full bg-opacity-40 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{task.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    {task.deadline}
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    {task.workers} workers
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-secondary font-bold">
                    <FaDollarSign className="mr-1" />
                    <span className="text-lg">${task.price}</span>
                  </div>
                  <Link
                    to="/tasks"
                    className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/tasks"
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            View All Tasks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
