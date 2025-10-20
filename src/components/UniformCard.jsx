import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Button from './Button';

const UniformCard = ({ 
  title, 
  description, 
  image, 
  price, 
  badge, 
  link, 
  buttonText = "View Details",
  metadata = [],
  className = "",
  variant = "default" // default, featured, compact
}) => {
  const cardVariants = {
    default: "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300",
    featured: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-xl border-2 border-primary/20 overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300",
    compact: "bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
  };

  const imageHeights = {
    default: "h-48",
    featured: "h-56",
    compact: "h-32"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`${cardVariants[variant]} ${className}`}
    >
      {/* Image Section */}
      {image && (
        <div className={`${imageHeights[variant]} bg-cover bg-center relative`} 
             style={{ backgroundImage: `url(${image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {badge}
              </span>
            </div>
          )}
          
          {/* Price */}
          {price && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                ${price}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={`p-${variant === 'compact' ? '4' : '6'}`}>
        {/* Title */}
        <h3 className={`font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 ${
          variant === 'featured' ? 'text-xl' : 
          variant === 'compact' ? 'text-base' : 'text-lg'
        }`}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={`text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 ${
            variant === 'compact' ? 'text-sm' : 'text-base'
          }`}>
            {description}
          </p>
        )}

        {/* Metadata */}
        {metadata.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center">
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {link && (
          <div className="flex justify-end">
            <Button
              variant="filled"
              color="primary"
              size={variant === 'compact' ? 'sm' : 'md'}
              to={link.startsWith('http') ? undefined : link}
              href={link.startsWith('http') ? link : undefined}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UniformCard;