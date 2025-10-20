import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAmountUp, FaSearch, FaFilter, FaClock, FaDollarSign, FaUsers, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const AllTasks = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample tasks data - in real app this would come from API
  const tasks = [
    {
      id: 1,
      title: "Website Design Review",
      description: "Review and provide feedback on modern website designs for e-commerce platform",
      price: 25,
      deadline: "3 days",
      workers: 2,
      category: "Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 2,
      title: "Mobile App Testing",
      description: "Test mobile application functionality and report bugs for iOS and Android",
      price: 35,
      deadline: "5 days",
      workers: 3,
      category: "Testing",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 3,
      title: "Content Writing",
      description: "Write engaging blog posts for tech companies and startups",
      price: 20,
      deadline: "2 days",
      workers: 1,
      category: "Writing",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 4,
      title: "Data Analysis",
      description: "Analyze customer data and create comprehensive reports",
      price: 45,
      deadline: "7 days",
      workers: 2,
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 5,
      title: "Social Media Management",
      description: "Manage social media accounts and create engaging content",
      price: 30,
      deadline: "4 days",
      workers: 1,
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 6,
      title: "Video Editing",
      description: "Edit promotional videos for product launches",
      price: 55,
      deadline: "6 days",
      workers: 2,
      category: "Video",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2c4be3b3?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 7,
      title: "Logo Design",
      description: "Create modern and professional logo designs for new businesses",
      price: 40,
      deadline: "3 days",
      workers: 1,
      category: "Design",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    },
    {
      id: 8,
      title: "Database Optimization",
      description: "Optimize database performance and improve query efficiency",
      price: 60,
      deadline: "5 days",
      workers: 1,
      category: "Development",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
      status: "Active"
    }
  ];

  const categories = ["all", "Design", "Testing", "Writing", "Analytics", "Marketing", "Video", "Development"];

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || task.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            All Available Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Discover and apply to tasks that match your skills</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSortToggle}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {sortOrder === "asc" ? <FaSortAmountUp className="mr-2" /> : <FaSortAmountDown className="mr-2" />}
              Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
            </motion.button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Task Image */}
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${task.image})` }}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {task.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {task.category}
                  </span>
                </div>
              </div>

              {/* Task Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{task.description}</p>

                {/* Task Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    {task.deadline}
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    {task.workers} workers
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-secondary font-bold">
                    <FaDollarSign className="mr-1" />
                    <span className="text-2xl">${task.price}</span>
                  </div>
                  <Link
                    to={`/tasks/${task.id}`}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredTasks.length > 0 && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              Load More Tasks
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;