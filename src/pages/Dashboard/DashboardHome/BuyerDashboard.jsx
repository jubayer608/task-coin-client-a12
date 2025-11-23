import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { FaTasks, FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle, FaEye, FaPlus, FaArrowRight, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";
import CountUp from "react-countup";

const BuyerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [modalContent, setModalContent] = useState(null);

  if (userLoading || !user) return <Loading />;

  const { data: stats = {}, refetch: refetchStats } = useQuery({
    queryKey: ["buyerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/stats/${user.email}`);
      return res.data;
    },
  });

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["buyerSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/submissions/${user.email}`);
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/${id}`, {
        status: "approve",
        buyerName: user.displayName,
      });
      Swal.fire("Approved!", "Submission approved and coins transferred.", "success");
      refetch();
      refetchStats();
    } catch (err) {
      Swal.fire("Error", "Failed to approve submission. Try again.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/${id}`, {
        status: "rejected",
        buyerName: user.displayName,
      });
      Swal.fire("Rejected!", "Submission rejected and workers required increased.", "info");
      refetch();
      refetchStats();
    } catch (err) {
      Swal.fire("Error", "Failed to reject submission. Try again.", "error");
    }
  };

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.totalTasks || 0,
      icon: FaTasks,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Pending Reviews",
      value: stats.pendingWorkers || 0,
      icon: FaClock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Total Paid",
      value: stats.totalPaid || 0,
      icon: FaDollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      prefix: "$",
    },
  ];

  return (
    <div className="max-w-[95%] xl:max-w-[1400px] mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-3xl">👋</span>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
              Welcome, {user.displayName || "Buyer"}!
            </h2>
            <p className="text-lg text-base-content/70 mt-1">Manage your tasks and review submissions</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl shadow-xl border-2 border-base-300 hover:border-primary transition-all duration-300 ${card.bgColor}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                </div>
                <p className="text-base-content/70 text-sm font-medium mb-2">{card.label}</p>
                <p className="text-3xl md:text-4xl font-extrabold text-base-content">
                  {card.prefix && <span>{card.prefix}</span>}
                  <CountUp
                    start={0}
                    end={card.value}
                    duration={2}
                    separator=","
                  />
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10 bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl p-6"
      >
        <h3 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
          <FaChartLine className="text-primary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard/add-tasks"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FaPlus className="text-2xl" />
                <span>Add New Task</span>
              </div>
              <FaArrowRight />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard/my-tasks"
              className="flex items-center justify-between p-4 bg-base-200 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FaTasks className="text-2xl" />
                <span>View My Tasks</span>
              </div>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Tasks to Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b-2 border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
            <FaClock className="text-primary" />
            Tasks To Review
          </h3>
          <p className="text-sm text-base-content/70 mt-1">Review and approve worker submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <FaTasks className="text-6xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/70 text-xl mb-2">No pending submissions</p>
            <p className="text-base-content/50 mb-4">Workers will appear here when they submit tasks</p>
            <Link
              to="/dashboard/add-tasks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <FaPlus /> Add New Task
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Worker</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Task Title</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Submission</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-base-content">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {submissions.map((s, index) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-6 py-4 text-base-content font-medium">{s.worker_name}</td>
                    <td className="px-6 py-4 text-base-content">{s.task_title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                        <FaDollarSign className="text-xs" />
                        {s.payable_amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalContent(s.submission_details)}
                        className="px-4 py-2 bg-info/10 text-info rounded-lg font-semibold hover:bg-info hover:text-white transition-all"
                      >
                        <FaEye className="inline mr-2" />
                        View
                      </motion.button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(s._id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <FaCheckCircle />
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(s._id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <FaTimesCircle />
                          Reject
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
            onClick={() => setModalContent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-2xl max-w-2xl w-full p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-base-content">Submission Details</h4>
                <button
                  onClick={() => setModalContent(null)}
                  className="w-10 h-10 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center transition-colors"
                >
                  <FaTimesCircle className="text-base-content" />
                </button>
              </div>
              <div className="bg-base-200 rounded-xl p-6 mb-6">
                <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">{modalContent}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalContent(null)}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerDashboard;
