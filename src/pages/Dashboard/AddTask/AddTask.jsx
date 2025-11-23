import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios"; // Import standard axios
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
      // Use standard axios for the imgBB upload to avoid sending auth header
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setTask({ ...task, task_image_url: res.data.data.display_url });
      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Image upload failed!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPayable = task.required_workers * task.payable_amount;

    if (totalPayable > coins) {
      Swal.fire({
        icon: "error",
        title: "Not enough Coins",
        text: "Purchase more coins to add this task",
      }).then(() => navigate("/dashboard/purchase"));
      return;
    }

    try {
      // Save task to backend using axiosSecure
      await axiosSecure.post("/tasks", {
        ...task,
        buyerId: user.email,
      });

      // Deduct coins in the frontend state
      setCoins(coins - totalPayable);

      Swal.fire("Success", "Task added successfully!", "success");

      // Reset form
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
      console.log(error);
      Swal.fire("Error", "Failed to add task", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 border border-base-300 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-base-content">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="task_title"
          placeholder="Task Title"
          className="input input-bordered w-full"
          value={task.task_title}
          onChange={handleChange}
          required
        />
        <textarea
          name="task_detail"
          placeholder="Task Detail / Description"
          className="textarea textarea-bordered w-full"
          value={task.task_detail}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="required_workers"
          placeholder="Required Workers"
          className="input input-bordered w-full"
          value={task.required_workers}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="payable_amount"
          placeholder="Payable Amount per Worker"
          className="input input-bordered w-full"
          value={task.payable_amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="completion_date"
          className="input input-bordered w-full"
          value={task.completion_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="submission_info"
          placeholder="Submission Info"
          className="input input-bordered w-full"
          value={task.submission_info}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block mb-1">Task Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {task.task_image_url && (
            <img
              src={task.task_image_url}
              alt="Task"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;