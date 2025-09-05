import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
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
      console.log("User logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err.message);
      alert("Logout failed, please try again!");
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to ="/"
          className="btn btn-ghost normal-case text-xl text-white hover:bg-primary/30"
        >
          🪙 TaskCoin
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2 items-center">
        {!user ? (
          <>
            <Link className="btn btn-ghost text-white hover:bg-primary/30" to="/login">
              Login
            </Link>
            <Link className="btn btn-ghost text-white hover:bg-primary/30" to="/register">
              Register
            </Link>

            <motion.a
              href="https://github.com/YourClientRepo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning text-black font-bold"
              animate={pulseAnimation}
            >
              Join as Developer
            </motion.a>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost text-white hover:bg-primary/30" to="/dashboard">
              Dashboard
            </Link>
            <button
              className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
             
            >
              Available Coin: {coins}
            </button>
            <Link className="btn btn-ghost text-white hover:bg-primary/30" to="/profile">
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-error">
              Logout
            </button>

            <motion.a
              href="https://github.com/YourClientRepo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning text-black font-bold"
              animate={pulseAnimation}
            >
              Join as Developer
            </motion.a>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="flex-none md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-square btn-ghost text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-base-200 shadow-md flex flex-col md:hidden p-2 gap-2 text-black">
          {!user ? (
            <>
              <Link className="btn btn-ghost w-full" to="/login">Login</Link>
              <Link className="btn btn-ghost w-full" to="/register">Register</Link>
              <motion.a
                href="https://github.com/YourClientRepo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                animate={pulseAnimation}
              >
                Join as Developer
              </motion.a>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost w-full" to="/dashboard">Dashboard</Link>
              <button className="btn btn-outline w-full">
                Available Coin: {coins}
              </button>
              <Link className="btn btn-ghost w-full" to="/profile">Profile</Link>
              <button onClick={handleLogout} className="btn btn-error w-full">Logout</button>
              <motion.a
                href="https://github.com/YourClientRepo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                animate={pulseAnimation}
              >
                Join as Developer
              </motion.a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
