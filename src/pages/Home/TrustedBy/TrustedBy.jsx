import React from "react";
import { motion } from "framer-motion";

const companies = [
  { 
    id: 1, 
    name: "TechCorp", 
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500"
  },
  { 
    id: 2, 
    name: "InnovateLab", 
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500"
  },
  { 
    id: 3, 
    name: "DigitalFlow", 
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500"
  },
  { 
    id: 4, 
    name: "CloudSync", 
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500"
  },
  { 
    id: 5, 
    name: "DataViz", 
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500"
  },
  { 
    id: 6, 
    name: "CodeBase", 
    gradient: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500"
  },
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-base-content">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-base-content/70">
            Join thousands of businesses that trust TaskCoin for their project needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center justify-center p-6 bg-base-200 rounded-xl border-2 border-base-300 hover:border-primary transition-all duration-300 hover:shadow-xl"
            >
              <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${company.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg md:text-xl">{company.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

