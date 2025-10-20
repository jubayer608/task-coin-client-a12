import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaUsers, FaShoppingCart, FaCoins, FaCreditCard, FaEye, FaCheck, FaTimes, FaChartLine } from "react-icons/fa";

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
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/admin/withdrawals/approve/${id}`);
      Swal.fire("Approved!", "Withdrawal has been approved.", "success");
      queryClient.invalidateQueries(["withdrawals"]);
    }
  };

  // ----------------- Loading -----------------
  if (statsLoading || withdrawLoading) return <p>Loading admin dashboard...</p>;

  // ----------------- JSX -----------------
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <FaChartLine className="mr-3 text-primary" />
          Admin Dashboard
        </h2>
        <p className="text-gray-600">Monitor platform performance and manage user activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Workers</p>
              <p className="text-3xl font-bold">{stats?.totalWorkers || 0}</p>
              <p className="text-blue-200 text-xs mt-1">Active users</p>
            </div>
            <FaUsers className="text-4xl text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Buyers</p>
              <p className="text-3xl font-bold">{stats?.totalBuyers || 0}</p>
              <p className="text-green-200 text-xs mt-1">Task creators</p>
            </div>
            <FaShoppingCart className="text-4xl text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Total Coins</p>
              <p className="text-3xl font-bold">{stats?.totalCoins || 0}</p>
              <p className="text-yellow-200 text-xs mt-1">In circulation</p>
            </div>
            <FaCoins className="text-4xl text-yellow-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Payments</p>
              <p className="text-3xl font-bold">{stats?.totalPayments || 0}</p>
              <p className="text-purple-200 text-xs mt-1">Processed</p>
            </div>
            <FaCreditCard className="text-4xl text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-primary" />
          Platform Analytics
        </h3>
        <div className="h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaChartLine className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Analytics Dashboard</p>
            <p className="text-gray-400 text-sm">Visual representation of platform metrics</p>
          </div>
        </div>
      </div>

      {/* Withdraw Requests */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <FaCoins className="mr-2 text-primary" />
            Withdrawal Requests
          </h3>
          <p className="text-gray-600 text-sm">Manage pending withdrawal requests from workers</p>
        </div>

        {withdrawals.length === 0 ? (
          <div className="p-12 text-center">
            <FaCoins className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-2">No pending withdrawals</p>
            <p className="text-gray-400">All withdrawal requests have been processed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawals.map((w, index) => (
                  <motion.tr
                    key={w._id?.$oid || w._id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {w.worker_email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {w.withdrawal_coin} coins
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
                        onClick={() => handlePaymentSuccess(w._id?.$oid || w._id)}
                      >
                        <FaCheck className="mr-2" />
                        Approve
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
