import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaHome, FaBlog, FaSignInAlt, FaUserPlus, FaCoins, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { role } = useUserRole();

  // Framer Motion animation
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" },
  };

  // React Query for fetching coin
  const { data: coinsData } = useQuery({
    queryKey: ["userCoin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.coin || 0;
    },
  });

  const coins = coinsData || 0;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      alert("Logout failed, please try again!");
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-xl border-b border-base-300"
          : "bg-gradient-to-r from-primary via-secondary to-accent"
      }`}
    >
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className={`flex items-center gap-2 text-2xl font-extrabold transition-colors ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              <span className="text-3xl">🪙</span>
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                TaskCoin
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {!user ? (
              <>
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  <FaHome className="text-xs" />
                  Home
                </Link>
                <Link
                  to="/blog"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  <FaBlog className="text-xs" />
                  Blog
                </Link>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  <FaSignInAlt className="text-xs" />
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white text-primary hover:bg-yellow-200 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaUserPlus className="text-xs" />
                    Register
                  </Link>
                </motion.div>
                <motion.a
                  href="https://github.com/YourClientRepo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-accent text-white hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  animate={pulseAnimation}
                >
                  Join Developer
                </motion.a>
                <button
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? "bg-base-200 text-base-content hover:bg-base-300"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  title="Toggle theme"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  <FaHome className="text-xs" />
                  Home
                </Link>
                <Link
                  to="/dashboard/home"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/blog"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "text-base-content hover:bg-base-200 hover:text-primary"
                      : "text-white hover:bg-white/20 hover:text-yellow-200"
                  }`}
                >
                  <FaBlog className="text-xs" />
                  Blog
                </Link>
                <div className="relative group">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      scrolled
                        ? "text-base-content hover:bg-base-200 hover:text-primary"
                        : "text-white hover:bg-white/20 hover:text-yellow-200"
                    }`}
                  >
                    <FaUser className="text-xs" />
                    Account
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 border border-base-300 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      <Link
                        to="/dashboard/my-tasks"
                        className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                      >
                        My Tasks
                      </Link>
                      {role === "buyer" && (
                        <>
                          <Link
                            to="/dashboard/add-tasks"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Add Tasks
                          </Link>
                          <Link
                            to="/dashboard/purchase"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Purchase Coins
                          </Link>
                          <Link
                            to="/dashboard/payment-history"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Payment History
                          </Link>
                        </>
                      )}
                      {role === "worker" && (
                        <>
                          <Link
                            to="/dashboard/submissions"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            My Submissions
                          </Link>
                          <Link
                            to="/dashboard/withdrawals"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Withdrawals
                          </Link>
                        </>
                      )}
                      {role === "admin" && (
                        <>
                          <Link
                            to="/dashboard/manage-users"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Manage Users
                          </Link>
                          <Link
                            to="/dashboard/manage-task"
                            className="block px-4 py-2.5 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                          >
                            Manage Tasks
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    scrolled
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-white/20 text-white border border-white/30"
                  }`}
                >
                  <FaCoins className="text-accent" />
                  <span>{coins}</span>
                </motion.div>
                <button
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? "bg-base-200 text-base-content hover:bg-base-300"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  title="Toggle theme"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                </button>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-error text-white hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "bg-base-200 text-base-content hover:bg-base-300"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <HiOutlineMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-base-100 border-t border-base-300 shadow-xl"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {!user ? (
                  <>
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      <FaHome />
                      Home
                    </Link>
                    <Link
                      to="/blog"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      <FaBlog />
                      Blog
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      <FaSignInAlt />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                    >
                      <FaUserPlus />
                      Register
                    </Link>
                    <motion.a
                      href="https://github.com/YourClientRepo"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-accent text-white rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                      animate={pulseAnimation}
                    >
                      Join Developer
                    </motion.a>
                    <button
                      onClick={() => { toggleTheme(); setIsOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3 bg-base-200 text-base-content rounded-lg font-medium hover:bg-base-300 transition-colors"
                    >
                      {theme === 'dark' ? <FaSun /> : <FaMoon />}
                      Toggle Theme
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      <FaHome />
                      Home
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/blog"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-base-200 hover:text-primary rounded-lg font-medium transition-colors"
                    >
                      <FaBlog />
                      Blog
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg">
                      <FaCoins className="text-accent" />
                      <span className="font-bold">Coins: {coins}</span>
                    </div>
                    <Link
                      to="/dashboard/my-tasks"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                    >
                      My Tasks
                    </Link>
                    {role === "buyer" && (
                      <>
                        <Link
                          to="/dashboard/add-tasks"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Add Tasks
                        </Link>
                        <Link
                          to="/dashboard/purchase"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Purchase Coins
                        </Link>
                        <Link
                          to="/dashboard/payment-history"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Payment History
                        </Link>
                      </>
                    )}
                    {role === "worker" && (
                      <>
                        <Link
                          to="/dashboard/submissions"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          My Submissions
                        </Link>
                        <Link
                          to="/dashboard/withdrawals"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Withdrawals
                        </Link>
                      </>
                    )}
                    {role === "admin" && (
                      <>
                        <Link
                          to="/dashboard/manage-users"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Manage Users
                        </Link>
                        <Link
                          to="/dashboard/manage-task"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-base-content hover:bg-base-200 rounded-lg font-medium"
                        >
                          Manage Tasks
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => { toggleTheme(); setIsOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3 bg-base-200 text-base-content rounded-lg font-medium hover:bg-base-300 transition-colors"
                    >
                      {theme === 'dark' ? <FaSun /> : <FaMoon />}
                      Toggle Theme
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-error text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
