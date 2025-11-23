import { FaLock } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 relative">
      
      {/* Lock Icon with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        className="text-error mb-6"
      >
        <FaLock className="text-8xl text-error shadow-lg" />
      </motion.div>

      {/* 403 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4"
      >
        403
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl md:text-2xl text-base-content text-center max-w-xl mb-6"
      >
        Oops! You don't have permission to access this page. 
        <br />
        If you believe this is a mistake, please contact the admin.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/">
          <button className="btn btn-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:opacity-90">
            Go Back Home
          </button>
        </Link>
      </motion.div>

      {/* Optional subtle background effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.2 }}
      >
        <div className="absolute w-80 h-80 bg-primary/20 rounded-full -top-20 -left-20 filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-secondary/20 rounded-full -bottom-32 -right-32 filter blur-3xl opacity-30 animate-pulse"></div>
      </motion.div>

    </div>
  );
};

export default Forbidden;
