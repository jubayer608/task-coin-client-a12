import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";
import useUserRole from "../../../hooks/useUserRole";
import { FaTasks, FaClock, FaDollarSign, FaChartLine, FaTrophy, FaStar, FaArrowRight, FaCheckCircle, FaRocket } from "react-icons/fa";
import { Link } from "react-router";
import CountUp from "react-countup";

const WorkerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  if (userLoading || !user) return <Loading />;

  const { data: stats = {} } = useQuery({
    queryKey: ["workerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/stats/${user.email}`);
      return res.data;
    },
  });

  const { data: approvedSubmissions = [] } = useQuery({
    queryKey: ["workerApprovedSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/submissions/approved/${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const successRate = stats.totalSubmissions > 0 
    ? Math.round(((stats.totalSubmissions - (stats.pendingSubmissions || 0)) / stats.totalSubmissions) * 100)
    : 0;

  const statCards = [
    {
      label: "Total Submissions",
      value: stats.totalSubmissions || 0,
      icon: FaTasks,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Pending Reviews",
      value: stats.pendingSubmissions || 0,
      icon: FaClock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Total Earnings",
      value: stats.totalEarning || 0,
      icon: FaDollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      prefix: "$",
    },
    {
      label: "Success Rate",
      value: successRate,
      icon: FaChartLine,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      suffix: "%",
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
              Welcome back, {user.displayName || "Worker"}!
            </h2>
            <p className="text-lg text-base-content/70 mt-1">Here's your performance overview</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                  {card.suffix && <span>{card.suffix}</span>}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Success Rate & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Success Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-8 text-center"
        >
          <div className="radial-progress text-primary" style={{ "--value": successRate, "--size": "10rem", "--thickness": "12px" }} role="progressbar">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-base-content block">{successRate}%</span>
              <span className="text-sm text-base-content/60">Success Rate</span>
            </div>
          </div>
          <p className="mt-4 text-base-content/70">Task completion success rate</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
            <FaRocket className="text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/tasklist"
                className="block p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-center"
              >
                <FaTasks className="text-2xl mx-auto mb-2" />
                Browse Tasks
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/submissions"
                className="block p-4 bg-base-200 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-center"
              >
                <FaCheckCircle className="text-2xl mx-auto mb-2" />
                My Submissions
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/withdrawals"
                className="block p-4 bg-base-200 border-2 border-secondary text-secondary rounded-xl font-semibold hover:bg-secondary hover:text-white transition-all duration-300 text-center"
              >
                <FaDollarSign className="text-2xl mx-auto mb-2" />
                Withdraw
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Approved Submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b-2 border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
            <FaTrophy className="text-accent" />
            Approved Submissions
          </h3>
          <p className="text-sm text-base-content/70 mt-1">Tasks that have been approved by buyers</p>
        </div>

        {approvedSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <FaTasks className="text-6xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/70 text-xl mb-2">No approved submissions yet</p>
            <p className="text-base-content/50">Complete tasks to see your approved work here</p>
            <Link
              to="/dashboard/tasklist"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Browse Tasks <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Task Title</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Buyer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {approvedSubmissions.slice(0, 5).map((s, index) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-base-content">
                      {s.task_title || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-bold">
                        <FaDollarSign className="text-xs" />
                        {Number(s.payable_amount || 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-base-content/70">
                      {s.Buyer_email || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                        <FaCheckCircle className="text-xs" />
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-base-content/70">
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {approvedSubmissions.length > 5 && (
              <div className="p-4 text-center border-t border-base-300">
                <Link
                  to="/dashboard/submissions"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
                >
                  View All Submissions <FaArrowRight />
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WorkerDashboard;
