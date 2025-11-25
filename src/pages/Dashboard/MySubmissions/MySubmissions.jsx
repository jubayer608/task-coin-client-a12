import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const MySubmissions = () => {
  const { user, loading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["mySubmissions", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions?workerEmail=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data; // { submissions: [], totalPages, currentPage }
    },
  });

  const submissions = data.submissions || [];
  const totalPages = data.totalPages || 1;

  const statusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit";
    switch (status) {
      case "approved":
        return (
          <span className={`${base} bg-success/10 text-success border border-success/30`}>
            <FiCheckCircle /> Approved
          </span>
        );
      case "pending":
        return (
          <span className={`${base} bg-warning/10 text-warning border border-warning/30`}>
            <FiClock /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-error/10 text-error border border-error/30`}>
            <FiXCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${base} bg-neutral/10 text-neutral border border-neutral/30`}>
            Unknown
          </span>
        );
    }
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 p-6 bg-base-100 border border-base-300 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          My Submissions
        </h2>
        <p className="text-base-content/70 mt-1">
          Track all your submitted tasks and their review status
        </p>
      </div>

      {/* Table */}
      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-base-content/70 text-lg">No submissions found yet.</p>
          <p className="text-base-content/50 text-sm mt-1">
            Complete a task to see your progress here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 shadow-inner">
          <table className="table w-full text-sm text-base-content">
            <thead className="bg-gradient-to-r from-primary via-secondary to-accent text-white">
              <tr>
                <th className="rounded-tl-2xl">#</th>
                <th>Task Title</th>
                <th>Payable ($)</th>
                <th>Submission Details</th>
                <th>Buyer</th>
                <th>Status</th>
                <th className="rounded-tr-2xl">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, idx) => (
                <motion.tr
                  key={sub._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="hover:bg-base-200 transition-all"
                >
                  <td className="font-semibold">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="font-semibold">{sub.task_title}</td>
                  <td>${sub.payable_amount}</td>
                  <td className="max-w-xs truncate" title={sub.submission_details}>
                    {sub.submission_details}
                  </td>
                  <td className="truncate" title={sub.Buyer_email}>
                    {sub.Buyer_email}
                  </td>
                  <td>{statusBadge(sub.status)}</td>
                  <td>{new Date(sub.createdAt).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            className="btn btn-sm btn-outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setPage(num + 1)}
              className={`btn btn-sm ${
                page === num + 1
                  ? "btn-primary text-white shadow-md"
                  : "btn-outline hover:shadow-sm"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="btn btn-sm btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MySubmissions;
