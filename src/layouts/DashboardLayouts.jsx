import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link } from "react-router"; 
import { FaBell, FaBars, FaHome, FaTasks, FaFileAlt, FaCoins, FaUserCog, FaPlusCircle } from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import TitleManager from "../routes/TitleManager";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { role, user, coins, loading } = useUserRole();
  const popupRef = useRef(null);

  // Fetch notifications
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/notifications/${user.email}`).then((res) => {
        setNotifications(res.data || []);
      });
    }
  }, [user, axiosSecure]);

  // Handle click outside to close popup and clear notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (showNotifications) {
          // Call backend to delete all notifications for the user
          axiosSecure.delete(`/notifications/${user.email}`).then(() => {
            // Update the state to clear notifications
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const navItems = {
    worker: [
      { name: "Home", path: "/dashboard/home", icon: <FaHome /> },
      { name: "Task List", path: "/dashboard/tasklist", icon: <FaTasks /> },
      { name: "My Submissions", path: "/dashboard/submissions", icon: <FaFileAlt /> },
      { name: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
    ],
    buyer: [
      { name: "Home", path: "/dashboard/home", icon: <FaHome /> },
      { name: "Add New Tasks", path: "/dashboard/add-tasks", icon: <FaPlusCircle /> },
      { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
      { name: "Purchase Coin", path: "/dashboard/purchase", icon: <FaCoins /> },
      { name: "Payment History", path: "/dashboard/payment-history", icon: <FaFileAlt /> },
    ],
    admin: [
      { name: "Home", path: "/dashboard/home", icon: <FaHome /> },
      { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUserCog /> },
      { name: "Manage Task", path: "/dashboard/manage-task", icon: <FaTasks /> },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 shadow-md bg-gradient-to-r from-primary to-secondary text-white relative">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={20} />
          </button>
          <Link to="/" className="text-xl font-bold flex items-center gap-1">
            <span className="text-2xl">🪙</span> TaskCoin
          </Link>
        </div>

        {/* Right side: User Info */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-md">
            Coins: <span className="font-bold">{coins}</span>
          </span>
          <span className="hidden sm:inline text-sm capitalize bg-white/20 px-2 py-1 rounded-md">
            {role}
          </span>
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || 'https://placehold.co/40x40/E5E7EB/1F2937?text=NO+IMG'}
              alt="profile"
              className="w-8 h-8 rounded-full border border-white"
            />
            <span className="hidden sm:inline text-sm">{user?.displayName}</span>
          </div>

          {/* Notification Icon */}
          <div className="relative cursor-pointer" ref={popupRef}>
            <FaBell
              size={20}
              className="hover:text-yellow-300"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                {notifications.length}
              </span>
            )}

            {/* Floating Popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black shadow-lg rounded-lg z-50">
                <div className="p-3 border-b font-bold">Notifications</div>
                {notifications.length === 0 ? (
                  <p className="p-3 text-sm text-gray-500">No notifications</p>
                ) : (
                  notifications.map((n, idx) => (
                    <div
                      key={idx}
                      className="p-3 border-b hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => (window.location.href = n.actionRoute)}
                    >
                      <p className="text-sm">{n.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(n.time).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-14 sm:top-16 left-0 h-[calc(100vh-3.5rem)] lg:h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <nav className="flex flex-col h-full p-4 space-y-2">
            {navItems[role]?.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
            <div className="mt-auto text-center text-xs text-base-content/60">
              © 2025 TaskCoin. All rights reserved.
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-base-100">
          <TitleManager />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
