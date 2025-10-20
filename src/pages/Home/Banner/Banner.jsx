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
    subtitle: "Complete micro-tasks and watch your wallet grow with TaskCoin",
    bgImage:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&h=1080&q=80",
    cta: "Start Earning Now"
  },
  {
    id: 2,
    title: "Join a Thriving Community",
    subtitle: "Collaborate with skilled professionals and grow your network",
    bgImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=1080&q=80",
    cta: "Join Community"
  },
  {
    id: 3,
    title: "Track Your Progress",
    subtitle: "Monitor your earnings and achievements with detailed analytics",
    bgImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&h=1080&q=80",
    cta: "View Dashboard"
  },
];

const Banner = () => {
  return (
    <div className="w-full mb-16">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl shadow-2xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative text-center text-white max-w-4xl px-6 md:px-8"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 drop-shadow-lg max-w-2xl mx-auto leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.a
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    href="/register"
                    className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    {slide.cta}
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/login"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 text-lg"
                  >
                    Learn More
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Custom Pagination Styling */}
      <style>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5);
          opacity: 0.7;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #3B82F6;
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;