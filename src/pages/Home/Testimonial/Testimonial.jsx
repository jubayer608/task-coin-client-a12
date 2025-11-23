import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Freelance Designer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "TaskCoin has completely transformed how I work. The platform is intuitive, payments are instant, and the variety of tasks keeps me engaged. I've earned over $5,000 in just 3 months!",
    rating: 5,
    location: "New York, USA",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Mark Smith",
    role: "Content Writer",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "As a buyer, TaskCoin makes it so easy to find skilled workers. The quality of work is outstanding and the pricing is fair. Highly recommend for any business looking to outsource tasks.",
    rating: 5,
    location: "London, UK",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Web Developer",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The best freelance platform I've used! The dashboard is clean, support is responsive, and I love how I can track my earnings in real-time. TaskCoin is a game-changer!",
    rating: 5,
    location: "Tokyo, Japan",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Digital Marketer",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    quote: "I've tried many platforms, but TaskCoin stands out. The community is supportive, tasks are well-defined, and payments are always on time. This is my go-to platform now!",
    rating: 5,
    location: "Sydney, Australia",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "Graphic Designer",
    photo: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "TaskCoin has helped me build a steady income stream. The variety of projects keeps me motivated, and the rating system helps me showcase my skills. Absolutely love it!",
    rating: 5,
    location: "Toronto, Canada",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Real feedback from our community of freelancers and businesses
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-base-100 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-base-300"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Left - Avatar & Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="relative inline-block mb-4">
                      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} p-1`}>
                        <img
                          src={currentTestimonial.photo}
                          alt={currentTestimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-base-100">
                        <FaQuoteLeft className="text-white text-sm" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-base-content mb-1">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-base-content/60 mb-2">{currentTestimonial.role}</p>
                    <p className="text-sm text-base-content/50 mb-3">{currentTestimonial.location}</p>
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-accent text-lg" />
                      ))}
                    </div>
                  </div>

                  {/* Right - Quote */}
                  <div className="flex-1">
                    <FaQuoteLeft className="text-primary/30 text-5xl mb-4" />
                    <p className="text-xl md:text-2xl text-base-content/80 leading-relaxed mb-6 italic">
                      "{currentTestimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-base-100 border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-base-100 border-2 border-primary rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-base-300 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
