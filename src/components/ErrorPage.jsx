import { FaExclamationTriangle, FaHome, FaArrowLeft, FaRedo } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = ({ code = "500", message = "Something went wrong!" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-neutral rounded-full"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
            <FaExclamationTriangle className="text-6xl text-white" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4"
        >
          {code}
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Oops! {message}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto"
        >
          Don't worry, this happens to the best of us. Let's get you back on track!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <FaHome />
              <span>Go Home</span>
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center space-x-2"
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-white border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center space-x-2"
          >
            <FaRedo />
            <span>Try Again</span>
          </motion.button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Need Help?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            If this problem persists, please contact our support team or check our FAQ section.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
            <Link to="/contact" className="text-primary hover:text-secondary transition-colors text-sm font-medium">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-500">•</span>
            <Link to="/faq" className="text-primary hover:text-secondary transition-colors text-sm font-medium">
              FAQ
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full opacity-60"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full opacity-60"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary rounded-full opacity-60"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
};

export default ErrorPage;
