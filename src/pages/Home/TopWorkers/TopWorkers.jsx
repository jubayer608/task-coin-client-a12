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
    <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Top Performers
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Meet our best workers who are leading the way with exceptional performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedWorkers.slice(0, 8).map((worker, index) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-base-100 border-2 border-base-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-primary transition-all duration-300 text-center"
            >
              <div className="relative inline-block mb-4">
                <div className="relative">
                  <img
                    src={worker.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(worker.name || "User") + "&background=7C3AED&color=fff"}
                    alt={worker.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                  />
                  {index < 3 && (
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-base-100 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">#{index + 1}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-base-content">
                {worker.name || "Anonymous"}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🪙</span>
                <span className="text-xl font-bold text-primary">{worker.coin || 0}</span>
                <span className="text-sm text-base-content/60">Coins</span>
              </div>
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="text-xs text-base-content/60">Top Performer</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkers;
