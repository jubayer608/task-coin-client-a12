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
  if (statsLoading || withdrawLoading)
    return <p>Loading admin dashboard...</p>;

  // ----------------- JSX -----------------
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h4 className="font-bold">Total Workers</h4>
          <p>{stats.totalWorkers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h4 className="font-bold">Total Buyers</h4>
          <p>{stats.totalBuyers}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h4 className="font-bold">Total Coins</h4>
          <p>{stats.totalCoins}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg text-center">
          <h4 className="font-bold">Total Payments</h4>
          <p>{stats.totalPayments}</p>
        </div>
      </div>

      {/* Manage Users */}
     

      {/* Manage Tasks */}
      

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
              <tr key={w._id?.$oid || w._id} className="hover:bg-gray-100 transition">
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
  );
};

export default AdminDashboard;
