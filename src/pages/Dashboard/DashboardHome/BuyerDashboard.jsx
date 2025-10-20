import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaTasks, FaClock, FaDollarSign, FaChartPie, FaCheckCircle, FaTimesCircle, FaEye, FaChartBar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";

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
      Swal.fire({
        title: "Approved!",
        text: "Submission approved and coins transferred.",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to approve submission. Try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  // Reject submission
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/${id}`, {
        status: "rejected",
        buyerName: user.displayName,
      });
      Swal.fire({
        title: "Rejected!",
        text: "Submission rejected and workers required increased.",
        icon: "info",
        confirmButtonColor: "#3B82F6",
      });
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to reject submission. Try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-base-content mb-2">
          Welcome, {user.displayName || "Buyer"}! 👋
        </h2>
        <p className="text-base-content/70">Manage your tasks and review worker submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Tasks Added</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.totalTasks || 0} duration={2} />
              </p>
            </div>
            <FaTasks className="text-5xl text-blue-200 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">Pending Reviews</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.pendingWorkers || 0} duration={2} />
              </p>
            </div>
            <FaClock className="text-5xl text-yellow-200 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Payment Paid</p>
              <p className="text-4xl font-bold">
                $<CountUp end={stats.totalPaid || 0} duration={2} />
              </p>
            </div>
            <FaDollarSign className="text-5xl text-green-200 opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Visual Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-base-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-base-content mb-6 flex items-center">
            <FaChartPie className="mr-2 text-primary" />
            Task Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Total Tasks</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.totalTasks || 0) / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">{stats.totalTasks || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Pending Reviews</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.pendingWorkers || 0) / 20) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">{stats.pendingWorkers || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Total Spent</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.totalPaid || 0) / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">${stats.totalPaid || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-base-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-base-content mb-6 flex items-center">
            <FaChartBar className="mr-2 text-secondary" />
            Quick Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalTasks || 0}
              </div>
              <div className="text-blue-800 text-sm font-medium">Tasks Created</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {(stats.totalTasks || 0) - (stats.pendingWorkers || 0)}
              </div>
              <div className="text-green-800 text-sm font-medium">Completed</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {stats.pendingWorkers || 0}
              </div>
              <div className="text-yellow-800 text-sm font-medium">In Review</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                ${stats.totalPaid || 0}
              </div>
              <div className="text-purple-800 text-sm font-medium">Total Spent</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tasks to Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-200 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <h3 className="text-2xl font-bold flex items-center">
            <FaClock className="mr-3" />
            Submissions To Review
          </h3>
          <p className="text-white/80 mt-1">Review and approve worker submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <FaCheckCircle className="text-6xl text-green-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-2">No pending submissions</p>
            <p className="text-gray-400">All submissions have been reviewed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payable Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((s, index) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {s.worker_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.task_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ${s.payable_amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center"
                        onClick={() => setModalContent(s.submission_details)}
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center"
                          onClick={() => handleApprove(s._id)}
                        >
                          <FaCheckCircle className="mr-1" />
                          Approve
                        </button>
                        <button
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center"
                          onClick={() => handleReject(s._id)}
                        >
                          <FaTimesCircle className="mr-1" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Submission Details Modal */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <motion.div
            className="bg-base-200 p-6 rounded-xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <h4 className="text-2xl font-bold mb-4 text-base-content flex items-center">
              <FaEye className="mr-2 text-primary" />
              Submission Details
            </h4>
            <div className="bg-base-100 p-4 rounded-lg mb-6 max-h-96 overflow-y-auto">
              <p className="text-base-content/80 whitespace-pre-wrap">{modalContent}</p>
            </div>
            <button
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
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
