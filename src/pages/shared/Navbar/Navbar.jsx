import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  // const [theme, setTheme] = useState("microtasktheme");
  const { role } = useUserRole();

  // Framer Motion animation
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" },
  };

  // React Query for fetching coin
  const { data: coinsData } = useQuery({
    queryKey: ["userCoin", user?.email],
    enabled: !!user?.email, // only fetch if user is logged in
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.coin || 0;
    },
  });

  const coins = coinsData || 0;

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logOut();
      // console.log("User logged out successfully");
    } catch (err) {
      // console.error("Logout failed:", err.message);
      alert("Logout failed, please try again!");
    }
  };

  // // Theme handling (persist and apply to container with data-theme)
  // useEffect(() => {
  //   const saved = localStorage.getItem("theme");
  //   if (saved) {
  //     setTheme(saved);
  //     const container = document.querySelector('[data-theme]');
  //     if (container) container.setAttribute('data-theme', saved);
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const next = theme === "dark" ? "microtasktheme" : "dark";
  //   setTheme(next);
  //   localStorage.setItem("theme", next);
  //   const container = document.querySelector('[data-theme]');
  //   if (container) container.setAttribute('data-theme', next);
  // };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-yellow-300 transition-colors"
            >
              🪙 TaskCoin
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
               <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/tasks"
                >
                  Browse Tasks
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/register"
                >
                  Register
                </Link>
               <motion.a
              href="https://github.com/YourClientRepo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning text-black font-bold"
              animate={pulseAnimation}>
                Join as Developer
              </motion.a>
                  
               
                {/* <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </button> */}
              </>
            ) : (
              <>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/tasks"
                >
                  Browse Tasks
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/dashboard/purchase"
                >
                  Purchase Coin
                </Link>
                <Link
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/profile"
                >
                  Profile
                </Link>
                <div className="relative group">
                  <button className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                    My Account
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard/my-tasks"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Tasks
                      </Link>
                      {role === "buyer" && (
                        <>
                          <Link
                            to="/dashboard/add-tasks"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Add Tasks
                          </Link>
                          <Link
                            to="/dashboard/purchase"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Purchase Coins
                          </Link>
                          <Link
                            to="/dashboard/payment-history"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Payment History
                          </Link>
                        </>
                      )}
                      {role === "worker" && (
                        <>
                          <Link
                            to="/dashboard/submissions"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Submissions
                          </Link>
                          <Link
                            to="/dashboard/withdrawals"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Withdrawals
                          </Link>
                        </>
                      )}
                      {role === "admin" && (
                        <>
                          <Link
                            to="/dashboard/manage-users"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Manage Users
                          </Link>
                          <Link
                            to="/dashboard/manage-task"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Manage Task
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Coins: {coins}
                </div>
                {/* <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </button> */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 p-2 rounded-md"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!user ? (
                <>
                 <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/tasks"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Tasks
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/register"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                   <motion.a
              href="https://github.com/YourClientRepo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning text-black font-bold"
              animate={pulseAnimation}
              onClick={() => setIsOpen(false)}
              >
                   
                Join as Developer
              </motion.a>
                  {/* <button 
                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gray-100 hover:bg-gray-200"
                  >
                    Toggle Theme {theme === 'dark' ? '🌙' : '☀️'}
                  </button> */}
                </>
              ) : (
                <>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/tasks"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Tasks
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/dashboard/purchase"
                    onClick={() => setIsOpen(false)}
                  >
                    Purchase Coin
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                    to="/dashboard/my-tasks"
                    onClick={() => setIsOpen(false)}
                  >
                    My Tasks
                  </Link>
                  {role === "buyer" && (
                    <>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/add-tasks"
                        onClick={() => setIsOpen(false)}
                      >
                        Add Tasks
                      </Link>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/purchase"
                        onClick={() => setIsOpen(false)}
                      >
                        Purchase Coins
                      </Link>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/payment-history"
                        onClick={() => setIsOpen(false)}
                      >
                        Payment History
                      </Link>
                    </>
                  )}
                  {role === "worker" && (
                    <>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/submissions"
                        onClick={() => setIsOpen(false)}
                      >
                        My Submissions
                      </Link>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/withdrawals"
                        onClick={() => setIsOpen(false)}
                      >
                        Withdrawals
                      </Link>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/manage-users"
                        onClick={() => setIsOpen(false)}
                      >
                        Manage Users
                      </Link>
                      <Link
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                        to="/dashboard/manage-task"
                        onClick={() => setIsOpen(false)}
                      >
                        Manage Task
                      </Link>
                    </>
                  )}
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    Coins: {coins}
                  </div>
                  {/* <button 
                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gray-100 hover:bg-gray-200"
                  >
                    Toggle Theme {theme === 'dark' ? '🌙' : '☀️'}
                  </button> */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md text-base font-medium hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
