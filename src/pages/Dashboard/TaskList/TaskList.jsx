import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAmountUp, FaFilter, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  // Sort tasks based on selected criteria
  const sortedTasks = [...tasks].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "price":
        aValue = parseFloat(a.payable_amount);
        bValue = parseFloat(b.payable_amount);
        break;
      case "deadline":
        aValue = new Date(a.completion_date);
        bValue = new Date(b.completion_date);
        break;
      case "workers":
        aValue = parseInt(a.required_workers);
        bValue = parseInt(b.required_workers);
        break;
      default:
        aValue = a.task_title;
        bValue = b.task_title;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
          Available Tasks
        </h2>
        <p className="text-base-content/70 text-lg">Find the perfect task for your skills</p>
      </div>

      {/* Sorting Controls */}
      <div className="bg-base-200 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaFilter className="text-primary text-xl" />
            <span className="font-semibold text-base-content">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="deadline">Deadline</option>
              <option value="price">Price</option>
              <option value="workers">Workers Needed</option>
              <option value="title">Title</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSortOrder("asc")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                sortOrder === "asc" 
                  ? "bg-primary text-white" 
                  : "bg-base-100 text-base-content hover:bg-base-300"
              }`}
            >
              <FaSortAmountUp />
              <span>Ascending</span>
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                sortOrder === "desc" 
                  ? "bg-primary text-white" 
                  : "bg-base-100 text-base-content hover:bg-base-300"
              }`}
            >
              <FaSortAmountDown />
              <span>Descending</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-base-content/40 text-6xl mb-4">📝</div>
          <p className="text-base-content/70 text-xl">No tasks available at the moment.</p>
          <p className="text-base-content/50">Check back later for new opportunities!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-base-200 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {task.task_title}
                </h3>
                <p className="text-white/80 text-sm">
                  Buyer: {task.buyerId}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Task Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-base-content/70">
                    <FaClock className="mr-2 text-primary" />
                    <span className="text-sm">
                      Deadline: {new Date(task.completion_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-base-content/70">
                    <FaDollarSign className="mr-2 text-green-500" />
                    <span className="text-sm font-semibold">
                      Payable: ${task.payable_amount}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-base-content/70">
                    <FaUsers className="mr-2 text-blue-500" />
                    <span className="text-sm">
                      Workers Needed: {task.required_workers}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to={`/dashboard/tasks/${task._id}`}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
