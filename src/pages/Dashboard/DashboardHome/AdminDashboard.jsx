import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUserTie, FaCoins, FaMoneyBillWave, FaChartBar, FaCheckCircle, FaClock, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

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
      confirmButtonColor: "#7C3AED",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/admin/withdrawals/approve/${id}`);
      Swal.fire("Approved!", "Withdrawal has been approved.", "success");
      queryClient.invalidateQueries(["withdrawals"]);
    }
  };

  if (statsLoading || withdrawLoading) return (
    <div className="flex items-center justify-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const statCards = [
    {
      label: 'Total Workers',
      value: stats?.totalWorkers || 0,
      icon: FaUsers,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: 'Total Buyers',
      value: stats?.totalBuyers || 0,
      icon: FaUserTie,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: 'Total Coins',
      value: stats?.totalCoins || 0,
      icon: FaCoins,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: 'Total Payments',
      value: stats?.totalPayments || 0,
      icon: FaMoneyBillWave,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="max-w-[95%] xl:max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-base-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </span>
        </h2>
        <p className="text-lg text-base-content/70">Manage and monitor your platform</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl shadow-xl border-2 border-base-300 hover:border-primary transition-all duration-300 ${card.bgColor}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <FaArrowUp className="text-base-content/30 text-2xl" />
                </div>
                <p className="text-base-content/70 text-sm font-medium mb-2">{card.label}</p>
                <p className="text-3xl md:text-4xl font-extrabold text-base-content">
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

      {/* Charts and Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Snapshot Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
              <FaChartBar className="text-primary" />
              Platform Snapshot
            </h3>
          </div>
          {(() => {
            const entries = [
              { name: 'Workers', value: Number(stats?.totalWorkers || 0), color: "from-blue-500 to-cyan-500" },
              { name: 'Buyers', value: Number(stats?.totalBuyers || 0), color: "from-purple-500 to-pink-500" },
              { name: 'Coins', value: Number(stats?.totalCoins || 0), color: "from-green-500 to-emerald-500" },
              { name: 'Payments', value: Number(stats?.totalPayments || 0), color: "from-orange-500 to-red-500" },
            ];
            const maxVal = Math.max(1, ...entries.map(e => e.value));
            return (
              <div className="h-64 flex items-end gap-4">
                {entries.map((e, idx) => (
                  <div key={e.name} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(e.value / maxVal) * 100}%` }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                      className={`w-full max-w-16 bg-gradient-to-t ${e.color} rounded-t-xl shadow-lg`}
                      title={`${e.name}: ${e.value}`}
                    />
                    <span className="mt-3 text-sm font-semibold text-base-content">{e.name}</span>
                    <span className="text-xs text-base-content/60 mt-1">{e.value}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </motion.div>

        {/* Withdraw Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b-2 border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
              <FaClock className="text-primary" />
              Withdraw Requests
            </h3>
            <p className="text-sm text-base-content/70 mt-1">Pending withdrawal approvals</p>
          </div>
          
          {withdrawals.length === 0 ? (
            <div className="p-12 text-center">
              <FaCheckCircle className="text-6xl text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/70 text-lg">No pending withdrawals</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-base-content">User Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Amount</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-base-content">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  {withdrawals.map((w, idx) => (
                    <motion.tr
                      key={w._id?.$oid || w._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.05 }}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="px-6 py-4 text-base-content font-medium">{w.worker_email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                          <FaCoins className="text-sm" />
                          {w.withdrawal_coin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePaymentSuccess(w._id?.$oid || w._id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Approve
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
