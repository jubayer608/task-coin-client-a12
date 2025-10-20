import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCoins, FaEdit, FaShieldAlt } from "react-icons/fa";
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

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <p className="text-red-600 text-xl">Error loading profile</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src={user?.photoURL || profile?.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png"}
                  alt={user?.displayName || profile?.name || "User"}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <FaShieldAlt className="text-white text-sm" />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  {user?.displayName || profile?.name || "No Name"}
                </h1>
                <p className="text-white/80 text-lg mb-2">
                  {user?.email || profile?.email || "No Email"}
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">
                      {profile?.role || "User"}
                    </span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                    <FaCoins className="mr-1" />
                    <span className="text-sm font-semibold">
                      {profile?.coin || 0} Coins
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FaUser className="mr-2 text-primary" />
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FaEnvelope className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{user?.email || profile?.email || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FaPhone className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{profile?.phone || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FaMapMarkerAlt className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{profile?.address || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FaCalendarAlt className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaCoins className="mr-2 text-primary" />
                  Account Statistics
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <div className="text-3xl font-bold">{profile?.coin || 0}</div>
                    <div className="text-blue-100">Total Coins</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <div className="text-3xl font-bold">{profile?.completedTasks || 0}</div>
                    <div className="text-green-100">Tasks Completed</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <div className="text-3xl font-bold">{profile?.rating || "N/A"}</div>
                    <div className="text-purple-100">Rating</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                    <div className="text-3xl font-bold">{profile?.level || 1}</div>
                    <div className="text-orange-100">Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white border-2 border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Change Password
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
