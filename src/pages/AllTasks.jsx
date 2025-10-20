import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAmountUp, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

const AllTasks = () => {
  const axiosInstance = useAxios();
  const [sortBy, setSortBy] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["publicTasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-error mb-2">Failed to load tasks</h2>
        <p className="text-base-content/70">Please try again later.</p>
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
        <p className="text-base-content/70 text-lg">Browse public tasks and get started</p>
      </div>

      {/* Sorting */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-8 border border-base-300">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-base-content">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered"
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
              className={`btn ${sortOrder === "asc" ? "btn-primary" : "btn-outline"}`}
            >
              <FaSortAmountUp />
              <span className="ml-2">Ascending</span>
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`btn ${sortOrder === "desc" ? "btn-primary" : "btn-outline"}`}
            >
              <FaSortAmountDown />
              <span className="ml-2">Descending</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-base-content/40 text-6xl mb-4">📝</div>
          <p className="text-base-content/70 text-xl">No tasks available right now.</p>
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
              className="bg-base-100 rounded-xl shadow-lg border border-base-300 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/9] bg-base-200 overflow-hidden">
                {task.task_image_url ? (
                  <img
                    src={task.task_image_url}
                    alt={task.task_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base-content/40">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-base-content">
                  {task.task_title}
                </h3>
                <p className="text-base-content/70 line-clamp-2 mb-4">
                  {task.task_detail}
                </p>

                <div className="flex items-center justify-between text-sm text-base-content/70 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-primary" />
                    {task.completion_date ? new Date(task.completion_date).toLocaleDateString() : "N/A"}
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1 text-secondary" />
                    {task.required_workers}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-secondary font-bold">
                    <FaDollarSign className="mr-1" />
                    <span className="text-lg">${task.payable_amount}</span>
                  </div>
                  <Link
                    to={`/dashboard/tasks/${task._id}`}
                    className="btn btn-primary"
                  >
                    See more
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

export default AllTasks;
