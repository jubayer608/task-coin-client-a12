import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAmountUp, FaFilter, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const AllTasks = () => {
  const axiosPublic = useAxios();
  const [sortBy, setSortBy] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["publicTasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

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
        aValue = a.task_title || "";
        bValue = b.task_title || "";
    }
    if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
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
          All Tasks
        </h2>
        <p className="text-gray-600 text-lg">Browse and discover tasks that fit your skills</p>
      </div>

      {/* Sorting Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaFilter className="text-primary text-xl" />
            <span className="font-semibold text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                sortOrder === "asc" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaSortAmountUp />
              <span>Ascending</span>
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                sortOrder === "desc" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-xl">No tasks available at the moment.</p>
          <p className="text-gray-400">Check back later for new opportunities!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                {task.task_image_url ? (
                  <img
                    src={task.task_image_url}
                    alt={task.task_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{task.task_title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.task_detail}</p>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-primary" />
                    <span>{new Date(task.completion_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2 text-green-600" />
                    <span>${task.payable_amount}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-blue-600" />
                    <span>{task.required_workers}</span>
                  </div>
                </div>

                <Link
                  to={`/dashboard/tasks/${task._id}`}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  See more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
