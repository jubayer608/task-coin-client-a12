import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
  FaClock,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
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

  // ---------- Sorting ----------
  const sortedTasks = useMemo(() => {
    const copy = [...tasks];
    const getVal = (t) => {
      switch (sortBy) {
        case "price":
          return Number(t.payable_amount) || 0;
        case "deadline":
          return new Date(t.completion_date).getTime();
        case "workers":
          return Number(t.required_workers) || 0;
        case "title":
        default:
          return (t.task_title || "").toLowerCase();
      }
    };
    copy.sort((a, b) => {
      const A = getVal(a);
      const B = getVal(b);
      if (A === B) return 0;
      return sortOrder === "asc" ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
    });
    return copy;
  }, [tasks, sortBy, sortOrder]);

  // ---------- Loading Skeleton ----------
  const SkeletonCard = () => (
    <div className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 bg-base-300 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-base-300 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-base-300 rounded animate-pulse" />
        <div className="pt-4 border-t border-base-300">
          <div className="h-10 w-full bg-base-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl poppins-font font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
          Available Tasks
        </h2>
        <p className="text-base-content/70 inter-font">
          Find the perfect task for your skills
        </p>
      </div>

      {/* Sorting Controls */}
      <div className="bg-base-100 rounded-2xl shadow-md p-6 mb-8 border border-base-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <FaFilter />
              <span className="font-semibold">Sort by</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered select-sm md:select-md"
            >
              <option value="deadline">Deadline</option>
              <option value="price">Price</option>
              <option value="workers">Workers Needed</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder("asc")}
              className={`btn btn-sm md:btn-md gap-2 ${
                sortOrder === "asc"
                  ? "btn-primary text-white"
                  : "btn-ghost border border-base-300"
              }`}
              aria-pressed={sortOrder === "asc"}
            >
              <FaSortAmountUp />
              Asc
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`btn btn-sm md:btn-md gap-2 ${
                sortOrder === "desc"
                  ? "btn-primary text-white"
                  : "btn-ghost border border-base-300"
              }`}
              aria-pressed={sortOrder === "desc"}
            >
              <FaSortAmountDown />
              Desc
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-base-content/70 text-lg">
            No tasks available at the moment.
          </p>
          <p className="text-base-content/60">
            Check back later for new opportunities!
          </p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
                  <h3 className="text-xl font-bold mb-1 line-clamp-2 poppins-font">
                    {task.task_title}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm inter-font">
                    Buyer: {task.buyerId}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 inter-font text-base-content">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-primary" />
                      <span className="text-sm">
                        Deadline:{" "}
                        {new Date(task.completion_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaDollarSign className="mr-2 text-success" />
                      <span className="text-sm font-semibold">
                        Payable: ${task.payable_amount}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-secondary" />
                      <span className="text-sm">
                        Workers Needed: {task.required_workers}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-base-300">
                    <Link
                      to={`/dashboard/tasks/${task._id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default TaskList;
