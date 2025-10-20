import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
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
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-base-content">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl text-white text-center shadow bg-gradient-to-r from-blue-500 to-blue-600">
          <h4 className="font-bold text-blue-100">Total Workers</h4>
          <p className="text-3xl font-extrabold">{stats.totalWorkers}</p>
        </div>
        <div className="p-6 rounded-xl text-white text-center shadow bg-gradient-to-r from-green-500 to-green-600">
          <h4 className="font-bold text-green-100">Total Buyers</h4>
          <p className="text-3xl font-extrabold">{stats.totalBuyers}</p>
        </div>
        <div className="p-6 rounded-xl text-white text-center shadow bg-gradient-to-r from-yellow-500 to-yellow-600">
          <h4 className="font-bold text-yellow-100">Total Coins</h4>
          <p className="text-3xl font-extrabold">{stats.totalCoins}</p>
        </div>
        <div className="p-6 rounded-xl text-white text-center shadow bg-gradient-to-r from-purple-500 to-purple-600">
          <h4 className="font-bold text-purple-100">Total Payments</h4>
          <p className="text-3xl font-extrabold">{stats.totalPayments}</p>
        </div>
      </div>

      {/* Withdraw Requests */}
      <div className="bg-base-100 rounded-xl shadow border border-base-300">
        <h3 className="text-xl font-bold mb-4 p-4 border-b border-base-300">Withdraw Requests</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
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
                  className="hover:bg-base-200/60 transition"
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
      </div>
    </div>
  );
};

export default AdminDashboard;
