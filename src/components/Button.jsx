import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'filled', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    filled: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-primary",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;