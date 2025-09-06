import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";

const WorkerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  if (userLoading || !user) return <Loading />;

  // Stats Query
  const { data: stats = {} } = useQuery({
    queryKey: ["workerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/stats/${user.email}`);
      return res.data;
    },
  });

  // Approved submissions query
  const { data: approvedSubmissions = [] } = useQuery({
    queryKey: ["workerApprovedSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/submissions/approved/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user.displayName || "Worker"}
      </h2>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-blue-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Total Submissions</p>
          <p className="text-2xl font-bold text-blue-700">{stats.totalSubmissions || 0}</p>
        </motion.div>

        <motion.div
          className="bg-yellow-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Pending Submissions</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pendingSubmissions || 0}</p>
        </motion.div>

        <motion.div
          className="bg-green-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Total Earnings</p>
          <p className="text-2xl font-bold text-green-700">${stats.totalEarnings || 0}</p>
        </motion.div>
      </div>

      {/* Approved Submissions Table */}
      <h3 className="text-xl font-semibold mb-4">Approved Submissions</h3>

      {approvedSubmissions.length === 0 ? (
        <p className="text-center text-gray-500">No approved submissions yet.</p>
      ) : (
        <table className="table w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((s) => (
              <tr key={s._id} className="hover:bg-gray-100 transition">
                <td>{s.task_title}</td>
                <td>${s.payable_amount}</td>
                <td>{s.buyer_name}</td>
                <td>
                  <span className="badge badge-success">{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkerDashboard;
