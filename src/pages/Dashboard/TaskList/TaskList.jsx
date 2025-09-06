import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Available Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available now.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl text-white rounded-2xl overflow-hidden"
            >
              <div className="card-body">
                <h3 className="card-title text-xl font-bold">
                  {task.task_title}
                </h3>
                <p className="text-sm">
                  <span className="font-semibold">Buyer:</span>{" "}
                  {task.buyerId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(task.completion_date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Payable Amount:</span> $
                  {task.payable_amount}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Workers Needed:</span>{" "}
                  {task.required_workers}
                </p>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/dashboard/tasks/${task._id}`}
                    className="btn bg-white text-indigo-600 hover:bg-gray-100 font-semibold shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
