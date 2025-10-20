import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">🪙 TaskCoin</h3>
            <p className="text-white/80 mb-4 max-w-md">
              The premier platform for micro-tasks and freelance work. Connect buyers with skilled workers and earn coins for your contributions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-yellow-300 transition-colors">
                <FaLinkedinIn className="text-2xl" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-yellow-300 transition-colors">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-yellow-300 transition-colors">
                <FaGithub className="text-2xl" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter" className="hover:text-yellow-300 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links (Only existing routes) */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="hover:text-yellow-300 transition-colors">Home</a>
              <a href="/tasks" className="hover:text-yellow-300 transition-colors">Browse Tasks</a>
              <a href="/login" className="hover:text-yellow-300 transition-colors">Login</a>
              <a href="/register" className="hover:text-yellow-300 transition-colors">Register</a>
            </nav>
          </div>

          {/* Support (placeholder-free) */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/dashboard" className="hover:text-yellow-300 transition-colors">Dashboard</a>
              <a href="/profile" className="hover:text-yellow-300 transition-colors">Profile</a>
              <a href="/dashboard/payment-history" className="hover:text-yellow-300 transition-colors">Payment History</a>
              <a href="/dashboard/withdrawals" className="hover:text-yellow-300 transition-colors">Withdrawals</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left text-white/80 text-sm">
              &copy; {new Date().getFullYear()} TaskCoin. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right text-white/60 text-sm">
              Made with ❤️ for the global workforce
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
