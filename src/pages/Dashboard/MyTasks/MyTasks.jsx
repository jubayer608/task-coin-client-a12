import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit, FiTrash2, FiClipboard } from "react-icons/fi";

const MyTasks = () => {
  const { user, coins, setCoins, loading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  useEffect(() => {
    if (!loading && user?.email) {
      fetchTasks();
    }
  }, [user, loading]);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get(`/tasks/buyer/${user.email}`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (task) => {
    setEditingTask(task);
    setFormData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  const submitUpdate = async () => {
    try {
      await axiosSecure.patch(`/tasks/${editingTask._id}`, formData);
      Swal.fire("Success", "Task updated successfully!", "success");
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update task", "error");
    }
  };

  const handleDelete = async (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Deleting this task will refund unspent coins.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7C3AED",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/tasks/${task._id}`);
          Swal.fire("Deleted!", "Task has been deleted.", "success");

          const refund = task.required_workers * task.payable_amount;
          setCoins(coins + refund);

          fetchTasks();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete task", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-base-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-2 poppins-font">
          <FiClipboard className="text-secondary" />
          My Tasks
        </h2>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold shadow-sm">
          Coins: {coins}
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-2xl shadow-md">
        <table className="table table-zebra w-full text-base-content">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th>Title</th>
              <th>Required Workers</th>
              <th>Pay/Worker</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-base-content/70"
                >
                  No tasks added yet.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <motion.tr
                  key={task._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td className="font-semibold">{task.task_title}</td>
                  <td>{task.required_workers}</td>
                  <td>${task.payable_amount}</td>
                  <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm bg-info/20 text-info border-info/30 hover:bg-info/30 transition-all"
                      onClick={() => handleUpdate(task)}
                    >
                      <FiEdit />
                      <span className="hidden sm:inline">Update</span>
                    </button>
                    <button
                      className="btn btn-sm bg-error/20 text-error border-error/30 hover:bg-error/30 transition-all"
                      onClick={() => handleDelete(task)}
                    >
                      <FiTrash2 />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 border border-base-300 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              {/* Modal gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-40 rounded-2xl pointer-events-none"></div>

              <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">
                ✏️ Update Task
              </h3>

              <div className="space-y-4 relative z-10">
                <input
                  type="text"
                  name="task_title"
                  placeholder="Task Title"
                  className="input input-bordered w-full focus:outline-primary"
                  value={formData.task_title}
                  onChange={handleChange}
                />
                <textarea
                  name="task_detail"
                  placeholder="Task Detail"
                  className="textarea textarea-bordered w-full focus:outline-primary min-h-[100px]"
                  value={formData.task_detail}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="submission_info"
                  placeholder="Submission Info"
                  className="input input-bordered w-full focus:outline-primary"
                  value={formData.submission_info}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 relative z-10">
                <button
                  onClick={() => setEditingTask(null)}
                  className="btn btn-outline btn-error"
                >
                  Cancel
                </button>
                <button
                  onClick={submitUpdate}
                  className="btn btn-primary shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyTasks;
