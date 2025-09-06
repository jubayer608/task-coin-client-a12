// components/TopWorkers.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";


const TopWorkers = () => {
  const { data: workers = [], isLoading, isError } = useQuery({
    queryKey: ["topWorkers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/workers/top");
      return res.data;
    },
  });

  if (isLoading) return <p>loading....</p>;
  if (isError) return <p className="text-red-500">Failed to load top workers</p>;

  // Sort by coins descending
  const sortedWorkers = [...workers].sort((a, b) => (b.coin || 0) - (a.coin || 0));

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">
        Best Workers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedWorkers.map((worker, index) => (
          <motion.div
            key={worker._id}
            className="card bg-white flex justify-center items-center dark:bg-gray-900 text-base-content shadow-lg rounded-2xl p-6 border border-base-300 hover:border-primary hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={worker.photoURL || "/default-avatar.png"}
              alt={worker.name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-white object-cover"
            />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {worker.name}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">{worker.coin || 0} Coins</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopWorkers;
