import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";
import useUserRole from "../../../hooks/useUserRole";
import { FaTasks, FaClock, FaDollarSign, FaChartLine, FaTrophy, FaStar } from "react-icons/fa";

const WorkerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  if (userLoading || !user) return <Loading />;

  // Worker stats (total submissions, pending, earnings from approved)
  const { data: stats = {} } = useQuery({
    queryKey: ["workerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/stats/${user.email}`);
      return res.data;
    },
  });

  // Approved submissions list (buyer approved)
  const { data: approvedSubmissions = [] } = useQuery({
    queryKey: ["workerApprovedSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/worker/submissions/approved/${user.email}`
      );
      // Ensure data is array and has correct fields
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.displayName || "Worker"}! 👋
        </h2>
        <p className="text-gray-600">Here's your performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Submissions</p>
              <p className="text-3xl font-bold">{stats.totalSubmissions || 0}</p>
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
              <p className="text-yellow-100 text-sm font-medium">Pending Reviews</p>
              <p className="text-3xl font-bold">{stats.pendingSubmissions || 0}</p>
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
              <p className="text-green-100 text-sm font-medium">Total Earnings</p>
              <p className="text-3xl font-bold">${stats.totalEarning || 0}</p>
            </div>
            <FaDollarSign className="text-4xl text-green-200" />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold">
                {stats.totalSubmissions > 0 
                  ? Math.round(((stats.totalSubmissions - stats.pendingSubmissions) / stats.totalSubmissions) * 100)
                  : 0}%
              </p>
            </div>
            <FaChartLine className="text-4xl text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <FaChartLine className="mr-2 text-primary" />
            Performance Overview
          </h3>
          <div className="flex items-center space-x-2">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm text-gray-600">Top Performer</span>
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaChartLine className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Performance Chart</p>
            <p className="text-gray-400 text-sm">Visual representation of your work progress</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FaStar className="mr-2 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <FaTrophy className="text-yellow-500 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">First Submission</p>
                <p className="text-sm text-gray-600">Completed your first task</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <FaStar className="text-green-500 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">Quality Worker</p>
                <p className="text-sm text-gray-600">Maintained high quality standards</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Browse Available Tasks
            </button>
            <button className="w-full bg-white border-2 border-primary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              View My Submissions
            </button>
            <button className="w-full bg-white border-2 border-secondary text-secondary py-3 px-4 rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all duration-300">
              Withdraw Earnings
            </button>
          </div>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">My Approved Submissions</h3>
          <p className="text-gray-600 text-sm">Tasks that have been approved by buyers</p>
        </div>

        {approvedSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <FaTasks className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-2">No approved submissions yet</p>
            <p className="text-gray-400">Complete tasks to see your approved work here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payable Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedSubmissions.map((s, index) => (
                  <motion.tr
                    key={s._id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {s.task_title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        ${Number(s.payable_amount || 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {s.Buyer_email || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {s.status === "approve" ? "Approved" : s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString("en-GB")
                        : "N/A"}
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

export default WorkerDashboard;
