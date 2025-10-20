import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
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
                <Link 
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors" 
                  to="/tasks"
                >
                  Browse Tasks
                </Link>
                <motion.a
                  href="https://github.com/YourClientRepo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-yellow-300 transition-colors"
                  animate={pulseAnimation}
                >
                  Join as Developer
                </motion.a>
              </>
            ) : (
              <>
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
                  to="/profile"
                >
                  Profile
                </Link>
                <div className="relative group">
                  <button className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                    My Account
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link to="/dashboard/my-tasks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Tasks
                      </Link>
                      <Link to="/dashboard/my-submissions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Submissions
                      </Link>
                      <Link to="/dashboard/payment-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Payment History
                      </Link>
                      <Link to="/dashboard/purchase-coin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Purchase Coins
                      </Link>
                      <Link to="/dashboard/withdraw" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Withdraw
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Coins: {coins}
                </div>
                <button
                  onClick={toggleTheme}
                  className="text-white hover:text-yellow-300 p-2 rounded-md transition-colors"
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                </button>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                  <Link 
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium" 
                    to="/tasks"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Tasks
                  </Link>
                  <motion.a
                    href="https://github.com/YourClientRepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 bg-yellow-400 text-black rounded-md text-base font-bold hover:bg-yellow-300"
                    animate={pulseAnimation}
                    onClick={() => setIsOpen(false)}
                  >
                    Join as Developer
                  </motion.a>
                </>
              ) : (
                <>
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
                  <Link 
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium" 
                    to="/dashboard/my-submissions"
                    onClick={() => setIsOpen(false)}
                  >
                    My Submissions
                  </Link>
                  <Link 
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium" 
                    to="/dashboard/payment-history"
                    onClick={() => setIsOpen(false)}
                  >
                    Payment History
                  </Link>
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    Coins: {coins}
                  </div>
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
