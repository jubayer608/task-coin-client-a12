import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUserTie, FaCoins, FaMoneyBillWave } from "react-icons/fa";

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
  if (statsLoading || withdrawLoading) return (
    <div className="flex items-center justify-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  // ----------------- JSX -----------------
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Admin Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          label: 'Total Workers', value: stats.totalWorkers || 0, icon: <FaUsers className="text-3xl opacity-80" />,
        }, {
          label: 'Total Buyers', value: stats.totalBuyers || 0, icon: <FaUserTie className="text-3xl opacity-80" />,
        }, {
          label: 'Total Coins', value: stats.totalCoins || 0, icon: <FaCoins className="text-3xl opacity-80" />,
        }, {
          label: 'Total Payments', value: stats.totalPayments || 0, icon: <FaMoneyBillWave className="text-3xl opacity-80" />,
        }].map((card, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-primary/90 to-secondary/90 text-white p-6">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-extrabold">{card.value}</p>
              </div>
              <div className="text-white/80">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Withdraw Requests */}
      <div>
        <h3 className="text-xl font-bold mb-4">Withdraw Requests</h3>
        <table className="table w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>User Email</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr
                key={w._id?.$oid || w._id}
                className="hover:bg-gray-100 transition"
              >
                <td>{w.worker_email}</td>
                <td>{w.withdrawal_coin}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handlePaymentSuccess(w._id?.$oid || w._id)}
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Platform Snapshot</h3>
        {(() => {
          const entries = [
            { name: 'Workers', value: Number(stats.totalWorkers || 0) },
            { name: 'Buyers', value: Number(stats.totalBuyers || 0) },
            { name: 'Coins', value: Number(stats.totalCoins || 0) },
            { name: 'Payments', value: Number(stats.totalPayments || 0) },
          ];
          const maxVal = Math.max(1, ...entries.map(e => e.value));
          return (
            <div className="h-56 flex items-end gap-6">
              {entries.map((e) => (
                <div key={e.name} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full max-w-20 bg-gradient-to-t from-secondary to-primary rounded-t-md shadow"
                    style={{ height: `${(e.value / maxVal) * 100}%` }}
                    title={`${e.name}: ${e.value}`}
                  />
                  <span className="mt-2 text-sm text-gray-600">{e.name}</span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default AdminDashboard;
