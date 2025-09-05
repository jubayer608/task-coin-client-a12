import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from "../assets/authImg.png";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navbar */}
      <div className="p-6 flex justify-center">
        <Link to="/" className="text-3xl font-bold text-primary flex items-center gap-2">
          🪙 TaskCoin
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center items-center px-6">
        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl gap-8">
          
          {/* Illustration */}
          <div className="flex-1 flex justify-center hidden md:block"> 
            <img
              src={authImg}
              alt="Authentication Illustration"
              className="max-w-md rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Auth Form */}
          <div className="flex-1 w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl ring-1 ring-primary/20">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
