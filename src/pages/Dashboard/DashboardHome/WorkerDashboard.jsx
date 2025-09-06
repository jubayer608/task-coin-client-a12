import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";
import useUserRole from "../../../hooks/useUserRole";

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
          <p className="text-2xl font-bold text-blue-700">
            {stats.totalSubmissions || 0}
          </p>
        </motion.div>

        <motion.div
          className="bg-yellow-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Pending Submissions</p>
          <p className="text-2xl font-bold text-yellow-700">
            {stats.pendingSubmissions || 0}
          </p>
        </motion.div>

        <motion.div
          className="bg-green-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Total Earnings</p>
          <p className="text-2xl font-bold text-green-700">
            ${stats.totalEarning || 0}
          </p>
        </motion.div>
      </div>

      {/* Approved Submissions Table */}
      <h3 className="text-xl font-semibold mb-4">My Approved Submissions</h3>

      {approvedSubmissions.length === 0 ? (
        <p className="text-center text-gray-500">
          No approved submissions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Buyer Email</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((s) => (
                <tr key={s._id} className="hover:bg-gray-100 transition">
                  <td>{s.task_title || "N/A"}</td>
                  <td>${Number(s.payable_amount || 0)}</td>
                  <td>{s.Buyer_email || "Unknown"}</td>
                  <td>
                    <span className="badge badge-success">
                      {s.status === "approve" ? "Approved" : s.status}
                    </span>
                  </td>
                  <td>
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
