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

  // ----------------- Fetch Users -----------------
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ----------------- Fetch Tasks -----------------
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tasks");
      return Array.isArray(res.data) ? res.data : [];
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

  // ----------------- Actions -----------------
  const handleRemoveUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/users/${id}`);
      Swal.fire("Deleted!", "User has been removed.", "success");
      queryClient.invalidateQueries(["adminUsers"]);
    }
  };

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/admin/users/role/${id}`, { role });
    Swal.fire("Updated!", "User role has been updated.", "success");
    queryClient.invalidateQueries(["adminUsers"]);
  };

  const handleDeleteTask = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/tasks/${id}`);
      Swal.fire("Deleted!", "Task has been removed.", "success");
      queryClient.invalidateQueries(["adminTasks"]);
    }
  };

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
  if (statsLoading || usersLoading || tasksLoading || withdrawLoading)
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
      <div>
        <h3 className="text-xl font-bold mb-4">Manage Users</h3>
        <table className="table w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 transition">
                <td>
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.display_name || user.name}</td>
                <td>{user.user_email || user.email}</td>
                <td>
                  <select
                    className="select select-sm"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>
                <td>{user.coin}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Tasks */}
      <div>
        <h3 className="text-xl font-bold mb-4">Manage Tasks</h3>
        <table className="table w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>Task Name</th>
              <th>Buyer</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-100 transition">
                <td>{task.task_title || task.name || "N/A"}</td>
                <td>{task.Buyer_email || task.buyerId || "N/A"}</td>
                <td>{task.required_workers}</td>
                <td>{task.payable_amount?.$numberInt || task.payable_amount || 0}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
