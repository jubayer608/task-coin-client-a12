import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCreditCard } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-base-200"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2 poppins-font">
          <FiCreditCard className="text-secondary text-3xl" />
          Payment History
        </h1>
        <p className="text-base-content/70 inter-font mt-1">
          Review all your past coin purchases and transaction details
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-10 text-center">
          <p className="text-base-content/70 text-lg">
            You haven’t made any payments yet 💳
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto bg-base-100 border border-base-300 rounded-2xl shadow-md"
        >
          <table className="table table-zebra w-full inter-font">
            <thead className="bg-gradient-to-r from-primary to-secondary text-white">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Coins</th>
                <th>Amount ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-base-200 transition-all"
                >
                  <td className="font-semibold">{index + 1}</td>
                  <td className="text-sm text-primary font-medium">
                    {p.transactionId || "N/A"}
                  </td>
                  <td className="font-semibold text-secondary">{p.coins}</td>
                  <td className="font-semibold text-success">${p.amount}</td>
                  <td className="text-sm text-base-content/70">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentHistory;
