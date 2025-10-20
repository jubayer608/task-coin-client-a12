import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Earn Coins Effortlessly",
    subtitle: "Complete micro-tasks and watch your wallet grow",
    bgImage:
      "https://images.unsplash.com/photo-1587614379689-4095582a94c2?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Join a Thriving Community",
    subtitle: "Collaborate with developers, share ideas, and earn rewards",
    bgImage:
      "https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Track Your Progress",
    subtitle: "Dashboard insights for all your completed tasks",
    bgImage:
      "https://images.unsplash.com/photo-1655964638312-d737d8efe645?auto=format&fit=crop&w=1470&q=80",
  },
];

const Banner = () => {
  return (
    <div className="w-full my-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full  h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] shadow-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative text-center text-white max-w-3xl px-4 md:px-0"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-gray-200 drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="/register"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </motion.a>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style>{`
        .swiper-pagination-bullet {
          background-color: #0ea5e9; /* primary color */
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: #f59e0b; /* secondary color */
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Banner;