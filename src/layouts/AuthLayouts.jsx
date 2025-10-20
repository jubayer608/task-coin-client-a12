import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from "../assets/authImg.png";
import TitleManager from '../routes/TitleManager';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const AuthLayouts = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100'} flex flex-col relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-40 right-32 w-24 h-24 bg-secondary rounded-full"
        ></motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute bottom-32 left-32 w-28 h-28 bg-accent rounded-full"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [360, 0, -360] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-20 h-20 bg-primary rounded-full"
        ></motion.div>
      </div>

      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex justify-between items-center relative z-10"
      >
        <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center gap-2">
          🪙 TaskCoin
        </Link>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex justify-center items-center px-6 relative z-10">
        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-12">
          
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center hidden lg:block"
          >
            <div className="relative">
              <img
                src={authImg}
                alt="Authentication Illustration"
                className="max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
              >
                💰
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white text-xl shadow-lg"
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>

          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`flex-1 w-full max-w-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-2xl ring-1 ring-primary/20 backdrop-blur-sm relative overflow-hidden`}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
            <div className="relative z-10">
              <TitleManager />
              <Outlet />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-6 text-gray-500 dark:text-gray-400 relative z-10"
      >
        <p>&copy; 2025 TaskCoin. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default AuthLayouts;
