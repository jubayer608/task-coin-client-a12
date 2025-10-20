import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";


const TopWorkers = () => {
   const axiosInstance =useAxios()
  const { data: workers = [], isLoading, isError } = useQuery({
    queryKey: ["topWorkers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/workers/top");
      return res.data;
    },
  });

  if (isLoading) return <p>loading....</p>;
  if (isError) return <p className="text-red-500">Failed to load top workers</p>;

  // Sort by coins descending
  const sortedWorkers = [...workers].sort((a, b) => (b.coin || 0) - (a.coin || 0));

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Best Workers
          </h2>
          <p className="text-neutral text-lg">Meet our top-performing community members</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedWorkers.map((worker, index) => (
            <motion.div
              key={worker._id}
              className="bg-white flex flex-col justify-center items-center shadow-lg rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={worker.photoURL || "/default-avatar.png"}
                  alt={worker.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-primary object-cover"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {worker.name}
              </h3>
              <div className="flex items-center text-secondary">
                <span className="text-lg font-semibold">{worker.coin || 0} Coins</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkers;
