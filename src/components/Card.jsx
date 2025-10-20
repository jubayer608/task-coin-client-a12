import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  ...props 
}) => {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300";
  
  const hoverClasses = hover ? "hover:shadow-2xl hover:scale-105" : "";
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;