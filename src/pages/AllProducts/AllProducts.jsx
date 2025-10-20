import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaDollarSign, FaUsers, FaSort, FaSearch } from 'react-icons/fa';

const AllProducts = () => {
  const [sortBy, setSortBy] = useState('price-asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in real app this would come from API
  const allTasks = [
    {
      id: 1,
      title: "Website Design Review",
      description: "Review and provide feedback on modern website designs. Need experienced UI/UX designer.",
      price: 25,
      deadline: "3 days",
      workers: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
      category: "Design",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Mobile App Testing",
      description: "Test mobile application functionality and report bugs. Android and iOS testing required.",
      price: 35,
      deadline: "5 days",
      workers: 3,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80",
      category: "Testing",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Content Writing",
      description: "Write engaging blog posts for tech companies. SEO optimized content required.",
      price: 20,
      deadline: "2 days",
      workers: 1,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
      category: "Writing",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Data Analysis",
      description: "Analyze customer data and create comprehensive reports with insights.",
      price: 50,
      deadline: "7 days",
      workers: 2,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
      category: "Analytics",
      difficulty: "Hard"
    },
    {
      id: 5,
      title: "Logo Design",
      description: "Create modern logo design for startup company. Multiple concepts needed.",
      price: 30,
      deadline: "4 days",
      workers: 1,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80",
      category: "Design",
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Social Media Management",
      description: "Manage social media accounts and create engaging content for 2 weeks.",
      price: 40,
      deadline: "14 days",
      workers: 1,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80",
      category: "Marketing",
      difficulty: "Medium"
    },
    {
      id: 7,
      title: "Video Editing",
      description: "Edit promotional video for product launch. Professional quality required.",
      price: 60,
      deadline: "6 days",
      workers: 1,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=500&q=80",
      category: "Video",
      difficulty: "Hard"
    },
    {
      id: 8,
      title: "Translation Services",
      description: "Translate documents from English to Spanish. Technical content included.",
      price: 15,
      deadline: "3 days",
      workers: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      category: "Language",
      difficulty: "Easy"
    },
    {
      id: 9,
      title: "Database Optimization",
      description: "Optimize database performance and fix slow queries. MySQL experience required.",
      price: 80,
      deadline: "10 days",
      workers: 1,
      image: "https://images.unsplash.com/photo-1544383835-ba2b9c0c2b88?auto=format&fit=crop&w=500&q=80",
      category: "Development",
      difficulty: "Hard"
    }
  ];

  // Filter and sort tasks
  const filteredTasks = allTasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'deadline-asc':
          return parseInt(a.deadline) - parseInt(b.deadline);
        case 'deadline-desc':
          return parseInt(b.deadline) - parseInt(a.deadline);
        default:
          return 0;
      }
    });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
          >
            All Available Tasks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover and complete tasks to earn coins. Find the perfect opportunity that matches your skills.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="deadline-asc">Deadline: Short to Long</option>
                <option value="deadline-desc">Deadline: Long to Short</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-primary">{filteredTasks.length}</span> tasks
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Task Image */}
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${task.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {task.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{task.title}</h3>
                </div>
              </div>

              {/* Task Content */}
              <div className="p-6">
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;