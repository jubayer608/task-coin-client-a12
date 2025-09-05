import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r mt-10 from-primary via-secondary to-accent text-white p-10 rounded-t-xl shadow-lg">
      
      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-6 mb-6">
        <a href="/about" className="hover:text-yellow-300 transition-colors">About Us</a>
        <a href="/contact" className="hover:text-yellow-300 transition-colors">Contact</a>
        <a href="/jobs" className="hover:text-yellow-300 transition-colors">Jobs</a>
        <a href="/press" className="hover:text-yellow-300 transition-colors">Press Kit</a>
      </nav>

      {/* Social Icons */}
      <nav className="flex justify-center gap-6 mb-6">
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
      </nav>

      {/* Copyright */}
      <div className="text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} TaskCoin. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
