import React from 'react';
import { Link, Outlet } from 'react-router';
import TitleManager from '../routes/TitleManager';

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
      <div className="flex-1 flex justify-center items-center px-6 py-8">
        <div className="w-full max-w-4xl">
          <TitleManager></TitleManager>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
