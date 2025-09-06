import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [details, setDetails] = useState("");

  // fetch task details
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );

  // handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: details,
      Buyer_name: task.buyer_name || "Unknown",
      Buyer_email: task.buyerId,
      status: "pending",
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/submissions", submissionData);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your task submission is pending approval.",
      });
      setDetails("");
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl shadow-2xl mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent mb-4">
        {task.task_title}
      </h2>

      <motion.img
        src={task.task_image_url}
        alt={task.task_title}
        className="rounded-xl w-full max-h-80 object-cover mb-6 border-4 border-purple-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <div className="space-y-2 mb-6">
        <p className="text-gray-700">
          <span className="font-semibold text-purple-600">Details:</span>{" "}
          {task.task_detail}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Buyer:</span>{" "}
          {task.buyerId}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-red-600">Deadline:</span>{" "}
          {new Date(task.completion_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-yellow-600">Payable Amount:</span>{" "}
          ${task.payable_amount}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-blue-600">Workers Needed:</span>{" "}
          {task.required_workers}
        </p>
      </div>

      {/* Submission Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-5 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="textarea textarea-bordered w-full h-32 p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200"
          placeholder="Enter your submission details..."
          required
        />
        <motion.button
          type="submit"
          className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full hover:from-blue-500 hover:to-purple-500 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Task
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default TaskDetails;
