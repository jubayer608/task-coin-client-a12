import React from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">Error loading profile</div>;

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-base-100 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL || profile?.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png"}
            alt={user?.displayName || profile?.name || "User"}
            className="w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          {user?.displayName || profile?.name || "No Name"}
        </h2>

        {/* Email */}
        <p className="text-center text-gray-600 mb-4">{user?.email || profile?.email || "No Email"}</p>

        {/* Role & Info */}
        <div className="flex justify-around bg-base-200 rounded-xl p-4 mb-6 shadow-inner">
          <div className="text-center">
            <h3 className="text-sm text-gray-500">Role</h3>
            <p className="text-lg font-semibold text-secondary">{profile?.role || "User"}</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm text-gray-500">Joined</h3>
            <p className="text-lg font-semibold text-secondary">
              {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="btn btn-primary w-full hover:scale-105 transition-transform">
            Edit Profile
          </button>
          <button className="btn btn-outline w-full hover:scale-105 transition-transform">
            Change Password
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
