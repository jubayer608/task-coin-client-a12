import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FiClock,
  FiUser,
  FiDollarSign,
  FiUsers,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: task, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data;
    },
  });

  const { isOwner, isPastDeadline, deadlineText, canSubmit } = useMemo(() => {
    if (!task) return { isOwner: false, isPastDeadline: false, canSubmit: false };

    const deadline = new Date(task.completion_date);
    const now = new Date();
    const isPastDeadline = deadline.getTime() < now.getTime();
    const isOwner = user?.email && task?.buyerId === user.email;

    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    const deadlineText = isPastDeadline
      ? "Deadline passed"
      : daysLeft > 1
      ? `${daysLeft} days left`
      : daysLeft === 1
      ? "1 day left"
      : "Due today";

    const canSubmit = !isPastDeadline && !isOwner;
    return { isOwner, isPastDeadline, deadlineText, canSubmit };
  }, [task, user?.email]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError || !task)
    return (
      <div className="text-center py-20">
        <FiAlertTriangle className="text-error text-5xl mx-auto mb-4" />
        <h2 className="text-xl font-bold text-base-content">
          Task not found
        </h2>
        <p className="text-base-content/70 mt-1">
          Something went wrong while loading this task.
        </p>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      Swal.fire("Unavailable", "You cannot submit this task.", "warning");
      return;
    }

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName || "Worker",
      submission_details: details.trim(),
      Buyer_email: task.buyerId,
      Buyer_name: task.buyer_name || "Unknown",
      status: "pending",
      createdAt: new Date(),
    };

    try {
      setSubmitting(true);
      const res = await axiosSecure.post("/submissions", submissionData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Your task submission is pending approval.", "success");
        setDetails("");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit task", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-10 bg-base-100 border border-base-300 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
        {task.task_title}
      </h2>

      {/* Image */}
      {task.task_image_url ? (
        <motion.img
          src={task.task_image_url}
          alt={task.task_title}
          className="w-full max-h-96 object-cover rounded-xl border-4 border-primary/20 shadow-lg mb-6"
          whileHover={{ scale: 1.03 }}
        />
      ) : (
        <div className="w-full h-60 bg-base-200 rounded-xl flex items-center justify-center mb-6">
          <span className="text-base-content/70">No Image Available</span>
        </div>
      )}

      {/* Info Badges Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 text-primary border border-primary/20 rounded-xl px-4 py-3 font-medium">
          <FiClock className="flex-shrink-0" />
          <span>{new Date(task.completion_date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary border border-secondary/20 rounded-xl px-4 py-3 font-medium">
          <FiUser className="flex-shrink-0" />
          <span
            className="truncate"
            title={task.buyerId}
          >
            {task.buyerId.length > 22
              ? `${task.buyerId.slice(0, 22)}...`
              : task.buyerId}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-success/10 to-success/20 text-success border border-success/20 rounded-xl px-4 py-3 font-semibold">
          <FiDollarSign className="flex-shrink-0" />
          <span>${task.payable_amount}</span>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent/20 text-accent border border-accent/20 rounded-xl px-4 py-3 font-medium">
          <FiUsers className="flex-shrink-0" />
          <span>{task.required_workers} workers</span>
        </div>
      </div>

      {/* Task Details */}
      <div className="space-y-2 mb-6 text-base-content">
        <p>
          <span className="font-semibold text-primary">Details:</span>{" "}
          {task.task_detail}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div
            className={`badge badge-outline ${
              isPastDeadline ? "badge-error" : "badge-info"
            }`}
          >
            {deadlineText}
          </div>

          {isOwner && (
            <div className="badge badge-warning gap-2">
              <FiShield />
              You are the buyer
            </div>
          )}
        </div>
      </div>

      {/* Submission Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-base-100 border border-base-300 p-5 rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="label">
          <span className="label-text font-semibold">Submission Details</span>
          <span className="label-text-alt text-base-content/60">
            Minimum 20 characters
          </span>
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="textarea textarea-bordered w-full h-32 p-3 rounded-lg focus:outline-none focus:border-primary"
          placeholder="Enter your submission details..."
          required
        />

        <motion.button
          type="submit"
          disabled={!canSubmit || submitting}
          whileHover={{ scale: canSubmit && !submitting ? 1.05 : 1 }}
          whileTap={{ scale: canSubmit && !submitting ? 0.95 : 1 }}
          className={`btn w-full text-white text-lg font-semibold ${
            !canSubmit || submitting
              ? "btn-disabled"
              : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          }`}
        >
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Submitting...
            </>
          ) : isPastDeadline ? (
            "Deadline Passed"
          ) : isOwner ? (
            "Owner Cannot Submit"
          ) : (
            "Submit Task"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default TaskDetails;
