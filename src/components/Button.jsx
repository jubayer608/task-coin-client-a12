import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Button = ({
  children,
  variant = 'filled', // filled, outline
  size = 'md', // sm, md, lg
  color = 'primary', // primary, secondary, accent, success, error
  disabled = false,
  loading = false,
  onClick,
  href,
  to,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left', // left, right
  fullWidth = false,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Color and variant combinations
  const variantClasses = {
    filled: {
      primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg focus:ring-primary',
      secondary: 'bg-gradient-to-r from-secondary to-accent text-white hover:shadow-lg focus:ring-secondary',
      accent: 'bg-accent text-white hover:bg-accent/90 hover:shadow-lg focus:ring-accent',
      success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500',
      error: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500'
    },
    outline: {
      primary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
      secondary: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary',
      accent: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
      success: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-green-500',
      error: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500'
    }
  };

  // Combine classes
  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant][color],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  // Button content
  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // Motion wrapper
  const MotionWrapper = ({ children, ...motionProps }) => (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );

  // External link
  if (href) {
    return (
      <MotionWrapper>
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {buttonContent}
        </a>
      </MotionWrapper>
    );
  }

  // Internal link
  if (to) {
    return (
      <MotionWrapper>
        <Link to={to} className={buttonClasses} {...props}>
          {buttonContent}
        </Link>
      </MotionWrapper>
    );
  }

  // Regular button
  return (
    <MotionWrapper>
      <button
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </button>
    </MotionWrapper>
  );
};

export default Button;