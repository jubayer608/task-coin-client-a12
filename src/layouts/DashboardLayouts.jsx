import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { FaBell, FaBars, FaHome, FaTasks, FaFileAlt, FaCoins, FaUserCog, FaPlusCircle, FaMoon, FaSun, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useUserRole from "../hooks/useUserRole";
import TitleManager from "../routes/TitleManager";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { role, user, coins, loading } = useUserRole();
  const { theme, toggleTheme } = useTheme();
  const { logOut } = useAuth();
  const popupRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/notifications/${user.email}`).then((res) => {
        setNotifications(res.data || []);
      });
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (showNotifications) {
          axiosSecure.delete(`/notifications/${user.email}`).then(() => {
            setNotifications([]);
          }).catch(err => {
            console.error("Failed to clear notifications:", err);
          });
        }
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications, axiosSecure, user]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const navItems = {
    worker: [
      { name: "Dashboard", path: "/dashboard/home", icon: FaHome },
      { name: "Task List", path: "/dashboard/tasklist", icon: FaTasks },
      { name: "My Submissions", path: "/dashboard/submissions", icon: FaFileAlt },
      { name: "Withdrawals", path: "/dashboard/withdrawals", icon: FaCoins },
    ],
    buyer: [
      { name: "Dashboard", path: "/dashboard/home", icon: FaHome },
      { name: "Add Tasks", path: "/dashboard/add-tasks", icon: FaPlusCircle },
      { name: "My Tasks", path: "/dashboard/my-tasks", icon: FaTasks },
      { name: "Purchase Coin", path: "/dashboard/purchase", icon: FaCoins },
      { name: "Payment History", path: "/dashboard/payment-history", icon: FaFileAlt },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard/home", icon: FaHome },
      { name: "Manage Users", path: "/dashboard/manage-users", icon: FaUserCog },
      { name: "Manage Tasks", path: "/dashboard/manage-task", icon: FaTasks },
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 shadow-lg bg-gradient-to-r from-primary via-secondary to-accent text-white">
        {/* Left side: Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold hover:opacity-80 transition-opacity">
            <span className="text-3xl">🪙</span>
            <span className="hidden sm:inline">TaskCoin</span>
          </Link>
        </div>

        {/* Right side: User Info & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Coins Display */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
          >
            <FaCoins className="text-accent" />
            <span className="font-bold">{coins || 0}</span>
          </motion.div>

          {/* Role Badge */}
          <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
            <span className="text-xs font-semibold capitalize">{role}</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=7C3AED&color=fff`}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white/50 shadow-lg"
            />
            <span className="hidden sm:inline text-sm font-medium">{user?.displayName}</span>
          </div>

          {/* Notification Icon */}
          <div className="relative cursor-pointer" ref={popupRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
            >
              <FaBell size={20} />
              {notifications.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {notifications.length}
                </motion.span>
              )}
            </motion.button>

            {/* Notifications Popup */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-base-100 border-2 border-base-300 text-base-content shadow-2xl rounded-2xl z-50"
                >
                  <div className="p-4 border-b-2 border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <h3 className="font-bold text-base-content flex items-center gap-2">
                      <FaBell />
                      Notifications
                    </h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <FaBell className="text-4xl text-base-content/20 mx-auto mb-2" />
                      <p className="text-sm text-base-content/70">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-base-300">
                      {notifications.map((n, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 hover:bg-base-200 transition cursor-pointer"
                          onClick={() => (window.location.href = n.actionRoute)}
                        >
                          <p className="text-sm text-base-content font-medium">{n.message}</p>
                          <p className="text-xs text-base-content/60 mt-1">
                            {new Date(n.time).toLocaleString()}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </motion.button>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt size={16} />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] lg:h-full w-72 bg-base-100 border-r-2 border-base-300 shadow-2xl z-30 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"
          }`}
        >
              <nav className="flex flex-col h-full p-6">
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-4">Navigation</h3>
                  <div className="space-y-2">
                    {navItems[role]?.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={idx}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg"
                                : "text-base-content hover:bg-base-200 hover:text-primary"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <Icon className={`text-lg ${isActive ? "text-white" : "text-base-content/60 group-hover:text-primary"}`} />
                              <span>{item.name}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="activeTab"
                                  className="absolute right-4 w-2 h-2 bg-white rounded-full"
                                />
                              )}
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t-2 border-base-300">
                  <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=7C3AED&color=fff`}
                      alt="profile"
                      className="w-12 h-12 rounded-full border-2 border-primary/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base-content truncate">{user?.displayName}</p>
                      <p className="text-xs text-base-content/60 capitalize">{role}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-xl font-semibold transition-all border border-red-500/20"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </motion.button>
                  <p className="text-center text-xs text-base-content/50 mt-4">
                    © 2025 TaskCoin
                  </p>
                </div>
              </nav>
        </aside>

        {/* Overlay for mobile */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-base-100">
          <div className="max-w-full p-4 sm:p-6 lg:p-8">
            <TitleManager />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
