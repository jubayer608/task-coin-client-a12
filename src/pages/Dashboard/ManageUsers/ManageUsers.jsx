import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaUsers, FaTrash, FaUserShield, FaUserTie, FaUser, FaCoins, FaSearch, FaFilter } from "react-icons/fa";
import { useState } from "react";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleRemoveUser = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${name}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/users/${id}`);
      Swal.fire("Deleted!", "User has been removed.", "success");
      queryClient.invalidateQueries(["adminUsers"]);
    }
  };

  const handleRoleChange = async (id, role, name) => {
    await axiosSecure.patch(`/admin/users/role/${id}`, { role });
    Swal.fire("Updated!", `${name}'s role has been updated to ${role}.`, "success");
    queryClient.invalidateQueries(["adminUsers"]);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    admin: users.filter(u => u.role === "admin").length,
    buyer: users.filter(u => u.role === "buyer").length,
    worker: users.filter(u => u.role === "worker").length,
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-12">
      <p className="text-error text-xl">Error loading users!</p>
    </div>
  );

  return (
    <div className="max-w-[95%] xl:max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-base-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
              Manage Users
            </h2>
            <p className="text-lg text-base-content/70 mt-1">Manage all platform users and their roles</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-base-content">{users.length}</p>
              </div>
              <FaUsers className="text-4xl text-blue-500/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Buyers</p>
                <p className="text-3xl font-bold text-base-content">{roleStats.buyer}</p>
              </div>
              <FaUserTie className="text-4xl text-purple-500/30" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 mb-1">Workers</p>
                <p className="text-3xl font-bold text-base-content">{roleStats.worker}</p>
              </div>
              <FaUser className="text-4xl text-green-500/30" />
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10 bg-base-100 text-base-content border-base-300"
            />
          </div>
          <div className="flex gap-2">
            {["all", "admin", "buyer", "worker"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  roleFilter === role
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-base-200 text-base-content hover:bg-base-300"
                }`}
              >
                {role === "all" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-base-200 rounded-2xl"
        >
          <FaUsers className="text-6xl text-base-content/20 mx-auto mb-4" />
          <p className="text-xl text-base-content/70 mb-2">No users found</p>
          <p className="text-base-content/50">Try adjusting your search or filter</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-base-100 border-2 border-base-300 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">User</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Coins</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-base-content">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=7C3AED&color=fff`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border-2 border-primary/20"
                        />
                        <div>
                          <p className="font-semibold text-base-content">{user.name}</p>
                          <p className="text-xs text-base-content/60">{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base-content/80">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        className="select select-bordered select-sm bg-base-100 text-base-content border-base-300 focus:border-primary"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value, user.name)}
                      >
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                        <option value="worker">Worker</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                        <FaCoins className="text-xs" />
                        {user.coin || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveUser(user._id, user.name)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageUsers;
