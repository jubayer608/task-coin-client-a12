import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUsers, FaCoins, FaDollarSign, FaTasks, FaChartBar, FaCheckCircle, FaClock } from "react-icons/fa";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // ----------------- Fetch Stats -----------------
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // ----------------- Fetch Withdrawals -----------------
  const { data: withdrawals = [], isLoading: withdrawLoading } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/withdrawals");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handlePaymentSuccess = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm Payment",
      text: "This will approve the withdrawal and deduct coins from user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/admin/withdrawals/approve/${id}`);
      Swal.fire("Approved!", "Withdrawal has been approved.", "success");
      queryClient.invalidateQueries(["withdrawals"]);
    }
  };

  // ----------------- Loading -----------------
  if (statsLoading || withdrawLoading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  // ----------------- JSX -----------------
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-base-content mb-2">
          Admin Dashboard 🎯
        </h2>
        <p className="text-base-content/70">Manage your platform and monitor performance</p>
      </div>

      {/* Stats Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Workers</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.totalWorkers || 0} duration={2} />
              </p>
            </div>
            <FaUsers className="text-5xl text-blue-200 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Buyers</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.totalBuyers || 0} duration={2} />
              </p>
            </div>
            <FaTasks className="text-5xl text-green-200 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">Total Coins</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.totalCoins || 0} duration={2} />
              </p>
            </div>
            <FaCoins className="text-5xl text-yellow-200 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Payments</p>
              <p className="text-4xl font-bold">
                <CountUp end={stats.totalPayments || 0} duration={2} prefix="$" />
              </p>
            </div>
            <FaDollarSign className="text-5xl text-purple-200 opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Visual Stats Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-base-200 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-base-content mb-6 flex items-center">
            <FaChartBar className="mr-2 text-primary" />
            Platform Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Workers</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.totalWorkers || 0) / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">{stats.totalWorkers || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Buyers</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.totalBuyers || 0) / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">{stats.totalBuyers || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Total Coins</span>
              <div className="flex items-center">
                <div className="w-48 bg-base-300 rounded-full h-3 mr-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(((stats.totalCoins || 0) / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-base-content">{stats.totalCoins || 0}</span>
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
            <FaCheckCircle className="mr-2 text-green-500" />
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalWorkers + stats.totalBuyers || 0}
              </div>
              <div className="text-blue-800 text-sm font-medium">Total Users</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {withdrawals.length}
              </div>
              <div className="text-green-800 text-sm font-medium">Pending Withdrawals</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                ${stats.totalPayments || 0}
              </div>
              <div className="text-purple-800 text-sm font-medium">Total Revenue</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {stats.totalCoins || 0}
              </div>
              <div className="text-orange-800 text-sm font-medium">Coins in Circulation</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Withdraw Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-200 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <h3 className="text-2xl font-bold flex items-center">
            <FaClock className="mr-3" />
            Pending Withdrawal Requests
          </h3>
          <p className="text-white/80 mt-1">Review and approve worker withdrawal requests</p>
        </div>

        {withdrawals.length === 0 ? (
          <div className="p-12 text-center">
            <FaCheckCircle className="text-6xl text-green-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-2">No pending withdrawal requests</p>
            <p className="text-gray-400">All withdrawals have been processed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Coins)</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Requested</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawals.map((w, index) => (
                  <motion.tr
                    key={w._id?.$oid || w._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {w.worker_email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {w.withdrawal_coin} coins
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                        onClick={() => handlePaymentSuccess(w._id?.$oid || w._id)}
                      >
                        <FaCheckCircle className="inline mr-2" />
                        Approve Payment
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
