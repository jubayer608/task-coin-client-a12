import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";

const BuyerDashboard = () => {
  const { user, loading: userLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [modalContent, setModalContent] = useState(null);

  if (userLoading || !user) return <Loading />;

  // Buyer stats
  const { data: stats = {}, refetch: refetchStats } = useQuery({
    queryKey: ["buyerStats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/stats/${user.email}`);
      return res.data;
    },
  });

  // Pending submissions
  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["buyerSubmissions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/submissions/${user.email}`);
      return res.data;
    },
  });

  const handleApprove = async (id, amount, workerEmail) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/approve/${id}`);
      Swal.fire(
        "Approved!",
        "Submission approved and coins transferred.",
        "success"
      );
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/buyer/submissions/reject/${id}`);
      Swal.fire(
        "Rejected!",
        "Submission rejected and workers required increased.",
        "info"
      );
      refetch();
      refetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Welcome, {user.displayName || "Buyer"}
      </h2>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-blue-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Total Tasks Added</p>
          <p className="text-2xl font-bold text-blue-700">{stats.totalTasks || 0}</p>
        </motion.div>

        <motion.div
          className="bg-yellow-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Pending Workers</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pendingWorkers || 0}</p>
        </motion.div>

        <motion.div
          className="bg-green-100 p-6 rounded-lg shadow text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700 font-semibold">Total Payment Paid</p>
          <p className="text-2xl font-bold text-green-700">${stats.totalPaid || 0}</p>
        </motion.div>
      </div>

      {/* Tasks to Review */}
      <h3 className="text-xl font-semibold mb-4">Tasks To Review</h3>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500">No pending submissions.</p>
      ) : (
        <table className="table w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Submission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id} className="hover:bg-gray-100 transition">
                <td>{s.worker_name}</td>
                <td>{s.task_title}</td>
                <td>${s.payable_amount}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setModalContent(s.submission_details)}
                  >
                    View
                  </button>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      handleApprove(s._id, s.payable_amount, s.worker_email)
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleReject(s._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-white p-6 rounded-lg max-w-lg w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h4 className="text-xl font-bold mb-4">Submission Details</h4>
            <p className="mb-4">{modalContent}</p>
            <button
              className="btn btn-primary w-full"
              onClick={() => setModalContent(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
