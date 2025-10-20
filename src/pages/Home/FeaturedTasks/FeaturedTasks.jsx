import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import UniformCard from "../../../components/UniformCard";

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
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
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
            >
              <UniformCard
                title={task.title}
                description={task.description}
                image={task.image}
                price={task.price}
                badge="Featured"
                link="/dashboard/tasklist"
                buttonText="View Details"
                metadata={[
                  { icon: <FaClock />, text: task.deadline },
                  { icon: <FaUsers />, text: `${task.workers} workers` }
                ]}
                variant="featured"
              />
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
