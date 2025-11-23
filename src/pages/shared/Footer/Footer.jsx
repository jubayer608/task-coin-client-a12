import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-base-100 via-base-200 to-base-100 border-t border-base-300">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl">🪙</span>
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  TaskCoin
                </h3>
              </div>
              <p className="text-base-content/70 mb-6 max-w-md leading-relaxed">
                The premier platform for micro-tasks and freelance work. Connect buyers with skilled workers and earn coins for your contributions. Join thousands of professionals worldwide.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="LinkedIn"
                >
                  <FaLinkedinIn />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="Facebook"
                >
                  <FaFacebookF />
                </motion.a>
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="GitHub"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="Twitter"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="Instagram"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  title="YouTube"
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-base-content mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Home</span>
              </Link>
              <Link
                to="/blog"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Blog</span>
              </Link>
              <Link
                to="/login"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Register</span>
              </Link>
              <Link
                to="/dashboard"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Dashboard</span>
              </Link>
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-base-content mb-4">Resources</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/dashboard/purchase"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Purchase Coins</span>
              </Link>
              <Link
                to="/dashboard/payment-history"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Payment History</span>
              </Link>
              <Link
                to="/dashboard/withdrawals"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Withdrawals</span>
              </Link>
              <Link
                to="/profile"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>My Profile</span>
              </Link>
              <a
                href="#faq"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>FAQ</span>
              </a>
            </nav>
          </motion.div>

          {/* Company & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-base-content mb-4">Company</h4>
            <nav className="flex flex-col space-y-3 mb-6">
              <a
                href="#about"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>About Us</span>
              </a>
              <a
                href="#careers"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Careers</span>
              </a>
              <a
                href="#contact"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Contact Us</span>
              </a>
            </nav>
            <h4 className="text-lg font-bold text-base-content mb-4">Legal</h4>
            <nav className="flex flex-col space-y-3">
              <a
                href="#privacy"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Privacy Policy</span>
              </a>
              <a
                href="#terms"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Terms of Service</span>
              </a>
              <a
                href="#cookie"
                className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Cookie Policy</span>
              </a>
            </nav>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-base-content mb-2">Stay Updated</h4>
            <p className="text-base-content/70 mb-6">
              Subscribe to our newsletter and get the latest updates, tips, and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <FaPaperPlane />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-base-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-primary" />
            </div>
            <div>
              <h5 className="font-semibold text-base-content mb-1">Email</h5>
              <a href="mailto:support@taskcoin.com" className="text-base-content/70 hover:text-primary transition-colors">
                support@taskcoin.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-primary" />
            </div>
            <div>
              <h5 className="font-semibold text-base-content mb-1">Phone</h5>
              <a href="tel:+1234567890" className="text-base-content/70 hover:text-primary transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-primary" />
            </div>
            <div>
              <h5 className="font-semibold text-base-content mb-1">Address</h5>
              <p className="text-base-content/70">123 Business St, Suite 100, City, Country</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-base-content/70 text-sm">
              &copy; {new Date().getFullYear()} TaskCoin. All rights reserved.
            </p>
            <p className="text-base-content/50 text-xs mt-1">
              Built with ❤️ for the global workforce
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-base-content/70">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
            <a href="#cookie" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
