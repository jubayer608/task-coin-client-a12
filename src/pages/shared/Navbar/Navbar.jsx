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
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

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
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-accent transition-colors flex items-center"
            >
              🪙 TaskCoin
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/"
                >
                  Home
                </Link>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/login"
                >
                  Login
                </Link>
                <Link 
                  className="bg-accent text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-md" 
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/"
                >
                  Home
                </Link>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/dashboard/home"
                >
                  Dashboard
                </Link>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/dashboard/tasklist"
                >
                  Tasks
                </Link>
                <Link 
                  className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors" 
                  to="/profile"
                >
                  Profile
                </Link>
                <div className="relative group">
                  <button className="text-white hover:text-accent px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    More
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                    <div className="py-2">
                      <Link to="/dashboard/my-tasks" className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                        My Tasks
                      </Link>
                      <Link to="/dashboard/submissions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                        My Submissions
                      </Link>
                      <Link to="/dashboard/payment-history" className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                        Payment History
                      </Link>
                      <Link to="/dashboard/purchase" className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                        Purchase Coins
                      </Link>
                      <Link to="/dashboard/withdrawals" className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                        Withdraw
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <span className="text-accent mr-1">💰</span>
                  {coins}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors border border-white/20"
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                </motion.button>
                <button 
                  onClick={handleLogout} 
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20"
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
          <div className="md:hidden bg-white shadow-xl border-t border-gray-100">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {!user ? (
                <>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    className="block px-4 py-3 bg-accent text-white rounded-lg text-base font-semibold hover:bg-accent/90 transition-colors text-center" 
                    to="/register"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/dashboard/home"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/dashboard/tasklist"
                    onClick={() => setIsOpen(false)}
                  >
                    Tasks
                  </Link>
                  <Link 
                    className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg text-base font-medium transition-colors" 
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link 
                      className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" 
                      to="/dashboard/my-tasks"
                      onClick={() => setIsOpen(false)}
                    >
                      My Tasks
                    </Link>
                    <Link 
                      className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" 
                      to="/dashboard/submissions"
                      onClick={() => setIsOpen(false)}
                    >
                      My Submissions
                    </Link>
                    <Link 
                      className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" 
                      to="/dashboard/payment-history"
                      onClick={() => setIsOpen(false)}
                    >
                      Payment History
                    </Link>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Coins:</span>
                    <span className="text-primary font-bold flex items-center">
                      <span className="text-accent mr-1">💰</span>
                      {coins}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      toggleTheme();
                      setIsOpen(false);
                    }} 
                    className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    {isDark ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }} 
                    className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
