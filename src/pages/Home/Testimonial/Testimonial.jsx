import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "TaskCoin made managing micro-tasks effortless. I earn coins and withdraw easily!",
  },
  {
    name: "Mark Smith",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "Great platform for both buyers and workers. Very intuitive dashboard.",
  },
  {
    name: "Sophia Lee",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "I love the instant coin updates and notifications. Highly recommended!",
  },
  {
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    quote: "Smooth interface, fast payments, and excellent support. TaskCoin rocks!",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            What Our Users Say
          </h2>
          <p className="text-neutral text-lg">Hear from our satisfied community members</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center px-4 md:px-16 bg-base-200 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <img
                src={testimonials[currentIndex].photo}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-primary shadow-md"
              />
              <h3 className="text-xl font-semibold text-base-content">
                {testimonials[currentIndex].name}
              </h3>
              <p className="mt-2 text-base-content/70 italic">
                "{testimonials[currentIndex].quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button
              className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-full shadow hover:opacity-90 transition"
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
            >
              &#8592;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button
              className="bg-gradient-to-r from-secondary to-accent text-white p-2 rounded-full shadow hover:opacity-90 transition"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
