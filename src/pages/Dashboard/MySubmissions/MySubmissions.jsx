import React from "react";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const MySubmissions = () => {
  const { user, loading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["mySubmissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?workerEmail=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "approved":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        My Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No submissions found yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-xl bg-white shadow-md">
            <thead className="bg-purple-100">
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Submission Details</th>
                <th>Buyer</th>
                <th>Status</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, idx) => (
                <tr
                  key={sub._id}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{sub.task_title}</td>
                  <td>${sub.payable_amount}</td>
                  <td className="max-w-xs truncate">{sub.submission_details}</td>
                  <td>{sub.Buyer_email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                        sub.status
                      )}`}
                    >
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(sub.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MySubmissions;
