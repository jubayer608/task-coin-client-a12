import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaTasks, FaTrash, FaDollarSign, FaUsers, FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useState } from "react";

const ManageTasks = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tasks");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDeleteTask = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Delete Task?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/tasks/${id}`);
      Swal.fire("Deleted!", "Task has been removed.", "success");
      queryClient.invalidateQueries(["adminTasks"]);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const taskName = task.name || task.task_title || "";
    const buyer = task.buyerId || task.buyer_email || "";
    return (
      taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalValue = tasks.reduce((sum, task) => sum + (parseFloat(task.payable_amount) || 0) * (parseInt(task.required_workers) || 0), 0);
  const totalWorkers = tasks.reduce((sum, task) => sum + (parseInt(task.required_workers) || 0), 0);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-12">
      <p className="text-error text-xl">Error loading tasks!</p>
    </div>
  );

  return (
    <div className="max-w-[95%] xl:max-w-[1400px] mx-auto p-4 sm:p-6 lg:px-8 space-y-8 bg-base-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <FaTasks className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
              Manage Tasks
            </h2>
            <p className="text-lg text-base-content/70 mt-1">Monitor and manage all platform tasks</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-base-content">{tasks.length}</p>
              </div>
              <FaTasks className="text-4xl text-blue-500/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Total Workers Needed</p>
                <p className="text-3xl font-bold text-base-content">{totalWorkers}</p>
              </div>
              <FaUsers className="text-4xl text-green-500/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-base-content">${totalValue.toFixed(2)}</p>
              </div>
              <FaDollarSign className="text-4xl text-yellow-500/30" />
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search tasks by name or buyer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100 text-base-content border-base-300"
          />
        </div>
      </motion.div>

      {/* Tasks Table */}
      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-base-200 rounded-2xl"
        >
          <FaTasks className="text-6xl text-base-content/20 mx-auto mb-4" />
          <p className="text-xl text-base-content/70 mb-2">No tasks found</p>
          <p className="text-base-content/50">Try adjusting your search</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Task Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Buyer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Workers</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Deadline</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-base-content">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {filteredTasks.map((task, index) => (
                  <motion.tr
                    key={task._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <FaTasks className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-base-content">{task.name || task.task_title || "N/A"}</p>
                          <p className="text-xs text-base-content/60 line-clamp-1">{task.description || "No description"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-base-content/50" />
                        <span className="text-base-content/80">{task.buyerId || task.buyer_email || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                        <FaUsers className="text-xs" />
                        {task.required_workers || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full font-bold">
                        <FaDollarSign className="text-xs" />
                        {task.payable_amount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <FaCalendarAlt />
                        <span>{task.completion_date ? new Date(task.completion_date).toLocaleDateString() : "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteTask(task._id, task.name || task.task_title)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageTasks;
