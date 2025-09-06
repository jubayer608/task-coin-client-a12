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
      // Sort descending by coin
      return res.data.sort((a, b) => (b.coin || 0) - (a.coin || 0));
    },
  });

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load top workers</p>;

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">
        Best Workers
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workers.map((worker, index) => (
          <motion.div
            key={worker._id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 120 }}
            className="card p-6 rounded-2xl shadow-lg border border-base-300 
                       bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 
                       flex flex-col items-center text-base-content hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={worker.photoURL || "/default-avatar.png"}
              alt={worker.name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-white object-cover"
            />
            <h3 className="text-xl font-semibold text-center">{worker.name}</h3>
            <p className="text-lg mt-2 text-center">{worker.coin || 0} Coins</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopWorkers;
