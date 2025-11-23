import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaCheckCircle, FaUsers, FaClock } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your account and choose your role as a buyer or worker",
      icon: <FaUsers />,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Browse Tasks",
      description: "Explore available tasks or post your own micro-tasks",
      icon: <FaPlay />,
      color: "from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Complete Work",
      description: "Finish tasks efficiently and submit your work for review",
      icon: <FaCheckCircle />,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "Get Paid",
      description: "Receive coins instantly upon task approval and withdraw anytime",
      icon: <FaClock />,
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">How It Works</h2>
          <p className="text-neutral text-lg">Simple steps to start earning with TaskCoin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="relative">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white text-3xl shadow-lg`}>
                  {step.icon}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-base-300 transform translate-x-4">
                    <div className={`h-full bg-gradient-to-r ${step.color} w-0 animate-pulse`}></div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-base-content mb-3">{step.title}</h3>
              <p className="text-base-content/70">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
