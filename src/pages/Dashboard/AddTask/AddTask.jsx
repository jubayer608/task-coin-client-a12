import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUploadCloud, FiPlusCircle } from "react-icons/fi";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddTask = () => {
  const navigate = useNavigate();
  const { user, coins, setCoins, loading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [task, setTask] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: "",
    task_image_url: "",
  });

  const imgbbApiKey = import.meta.env.VITE_image_upload_key;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setTask({ ...task, task_image_url: res.data.data.display_url });
      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPayable =
      parseFloat(task.required_workers) * parseFloat(task.payable_amount);

    if (totalPayable > coins) {
      Swal.fire({
        icon: "error",
        title: "Not enough Coins",
        text: "Purchase more coins to add this task",
      }).then(() => navigate("/dashboard/purchase"));
      return;
    }

    try {
      await axiosSecure.post("/tasks", {
        ...task,
        buyerId: user.email,
      });

      setCoins(coins - totalPayable);
      Swal.fire("Success", "Task added successfully!", "success");
      setTask({
        task_title: "",
        task_detail: "",
        required_workers: "",
        payable_amount: "",
        completion_date: "",
        submission_info: "",
        task_image_url: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add task", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-4xl bg-base-100 border border-base-300 rounded-2xl shadow-lg p-8 sm:p-10 relative overflow-hidden">
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-primary via-secondary to-accent pointer-events-none rounded-2xl"></div>

        {/* Title Section */}
        <div className="relative mb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-primary flex justify-center items-center gap-2 poppins-font"
          >
            <FiPlusCircle className="text-primary text-3xl" />
            Add New Task
          </motion.h2>
          <p className="text-sm text-base-content/70 mt-1">
            Fill in the details below to post a new earning task.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 inter-font relative">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Task Title</span>
              </label>
              <input
                type="text"
                name="task_title"
                placeholder="Enter task title"
                className="input input-bordered w-full focus:outline-primary"
                value={task.task_title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Required Workers
                </span>
              </label>
              <input
                type="number"
                name="required_workers"
                placeholder="e.g. 20"
                className="input input-bordered w-full focus:outline-primary"
                value={task.required_workers}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Task Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Task Detail / Description
              </span>
            </label>
            <textarea
              name="task_detail"
              placeholder="Write task details clearly for the workers..."
              className="textarea textarea-bordered w-full focus:outline-primary min-h-[130px]"
              value={task.task_detail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Payable Amount (Per Worker)
                </span>
              </label>
              <input
                type="number"
                name="payable_amount"
                placeholder="e.g. 10"
                className="input input-bordered w-full focus:outline-primary"
                value={task.payable_amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Completion Date</span>
              </label>
              <input
                type="date"
                name="completion_date"
                className="input input-bordered w-full focus:outline-primary"
                value={task.completion_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submission Info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Submission Info</span>
            </label>
            <input
              type="text"
              name="submission_info"
              placeholder="e.g. Screenshot proof, URL link..."
              className="input input-bordered w-full focus:outline-primary"
              value={task.submission_info}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Task Image</span>
            </label>
            <div className="border-2 border-dashed border-primary/40 p-6 rounded-xl text-center hover:border-primary transition duration-300">
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <FiUploadCloud className="text-4xl text-primary" />
                <span className="font-semibold text-base-content">
                  Upload Task Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {task.task_image_url && (
                <motion.img
                  src={task.task_image_url}
                  alt="Task Preview"
                  className="mt-4 w-44 h-44 object-cover rounded-lg mx-auto shadow-md border border-base-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn bg-gradient-to-r from-primary via-secondary to-accent text-white w-full text-lg font-semibold mt-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add Task
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTask;
