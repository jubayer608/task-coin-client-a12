import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaPenFancy, FaChartLine, FaCamera, FaVideo, FaLanguage, FaPencilAlt, FaBullhorn } from "react-icons/fa";
import { Link } from "react-router";

const categories = [
  {
    id: 1,
    name: "Web Development",
    icon: FaCode,
    description: "Build modern websites and web applications",
    color: "from-blue-500 to-cyan-500",
    tasks: "1,234 tasks",
  },
  {
    id: 2,
    name: "Content Writing",
    icon: FaPenFancy,
    description: "Create engaging content for your brand",
    color: "from-purple-500 to-pink-500",
    tasks: "856 tasks",
  },
  {
    id: 3,
    name: "Data Analysis",
    icon: FaChartLine,
    description: "Analyze data and create insights",
    color: "from-green-500 to-emerald-500",
    tasks: "642 tasks",
  },
  {
    id: 4,
    name: "Graphic Design",
    icon: FaCamera,
    description: "Design stunning visuals and graphics",
    color: "from-orange-500 to-red-500",
    tasks: "1,089 tasks",
  },
  {
    id: 5,
    name: "Video Editing",
    icon: FaVideo,
    description: "Edit and produce professional videos",
    color: "from-indigo-500 to-purple-500",
    tasks: "723 tasks",
  },
  {
    id: 6,
    name: "Translation",
    icon: FaLanguage,
    description: "Translate content in multiple languages",
    color: "from-teal-500 to-cyan-500",
    tasks: "445 tasks",
  },
  {
    id: 7,
    name: "Copywriting",
    icon: FaPencilAlt,
    description: "Write compelling copy that converts",
    color: "from-rose-500 to-pink-500",
    tasks: "567 tasks",
  },
  {
    id: 8,
    name: "Marketing",
    icon: FaBullhorn,
    description: "Promote your brand and reach audiences",
    color: "from-yellow-500 to-orange-500",
    tasks: "892 tasks",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Explore Categories
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover tasks across various categories and find what matches your skills
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <Link
                  to="/tasks"
                  className="block bg-base-100 border-2 border-base-300 rounded-2xl p-6 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-base-content/60 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-xs text-primary font-semibold">
                    {category.tasks} available
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <span>View All Categories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;


