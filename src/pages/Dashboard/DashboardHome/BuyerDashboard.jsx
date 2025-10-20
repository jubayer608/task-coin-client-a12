import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";
import { FaTasks, FaClock, FaDollarSign, FaChartLine, FaTrophy, FaStar } from "react-icons/fa";

const BuyerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [modalContent, setModalContent] = useState(null);

  if (userLoading || !user) return <Loading />;

  // Buyer stats
  const { data: stats = {}, refetch: refetchStats } = useQuery({
    queryKey: ["buyerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/stats/${user.email}`);
      return res.data;
    },
  });

  // Pending submissions
  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["buyerSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/submissions/${user.email}`);
      return res.data;
    },
  });

  // Approve submission
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/${id}`, {
        status: "approve",
        buyerName: user.displayName,
      });
      Swal.fire(
        "Approved!",
        "Submission approved and coins transferred.",
        "success"
      );
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "Failed to approve submission. Try again.",
        "error"
      );
    }
  };

  // Reject submission
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/${id}`, {
        status: "rejected",
        buyerName: user.displayName,
      });
      Swal.fire(
        "Rejected!",
        "Submission rejected and workers required increased.",
        "info"
      );
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "Failed to reject submission. Try again.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user.displayName || "Buyer"}
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Tasks Added</p>
              <p className="text-3xl font-bold">{stats.totalTasks || 0}</p>
            </div>
            <FaTasks className="text-4xl text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending Workers</p>
              <p className="text-3xl font-bold">{stats.pendingWorkers || 0}</p>
            </div>
            <FaClock className="text-4xl text-yellow-200" />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Payment Paid</p>
              <p className="text-3xl font-bold">${stats.totalPaid || 0}</p>
            </div>
            <FaDollarSign className="text-4xl text-green-200" />
          </div>
        </motion.div>
      </div>

      {/* Tasks to Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <FaTasks className="mr-2 text-primary" />
            Tasks To Review
          </h3>
          <p className="text-gray-600 text-sm">Review and approve worker submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <FaTasks className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-2">No pending submissions</p>
            <p className="text-gray-400">All submissions have been reviewed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payable Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((s, index) => (
                  <motion.tr
                    key={s._id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {s.worker_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.task_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        ${s.payable_amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        onClick={() => setModalContent(s.submission_details)}
                      >
                        View Details
                      </motion.button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        onClick={() => handleApprove(s._id)}
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        onClick={() => handleReject(s._id)}
                      >
                        Reject
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-white p-6 rounded-lg max-w-lg w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h4 className="text-xl font-bold mb-4">Submission Details</h4>
            <p className="mb-4">{modalContent}</p>
            <button
              className="btn btn-primary w-full"
              onClick={() => setModalContent(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
