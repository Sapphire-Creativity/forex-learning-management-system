import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {
  BookOpen,
  UserCheck,
  Video,
  GraduationCap,
  Award,
  Globe,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <BookOpen size={20} />,
    title: "Explore Courses",
    desc: "Browse curated courses designed to meet your learning goals.",
  },
  {
    id: 2,
    icon: <UserCheck size={20} />,
    title: "Connect with Mentors",
    desc: "Learn directly from experts and receive personalized guidance.",
  },
  {
    id: 3,
    icon: <Video size={20} />,
    title: "Book Live Sessions",
    desc: "Engage in real-time sessions for deeper understanding.",
  },
  {
    id: 4,
    icon: <GraduationCap size={20} />,
    title: "Track Progress",
    desc: "See your growth clearly with smart progress tracking.",
  },
  {
    id: 5,
    icon: <Award size={20} />,
    title: "Earn Certifications",
    desc: "Showcase your achievements with shareable certificates.",
  },
  {
    id: 6,
    icon: <Globe size={20} />,
    title: "Learn Anywhere",
    desc: "Access learning seamlessly across all your devices.",
  },
];

const HowItWorks = () => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    if (swiperRef.current && !swiperInstance.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Autoplay],
        loop: true,
        speed: 8000, // Adjust speed for continuous movement
        autoplay: {
          delay: 0, // Continuous movement
          disableOnInteraction: false,
        },
        slidesPerView: 1, // Default for mobile
        spaceBetween: 20,
        breakpoints: {
          // When window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 28,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          // When window width is >= 1280px
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        },
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
      });
    }

    // Cleanup function
    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
        swiperInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="features" className="relative w-full py-20 bg-gradient-to-b from-white via-[#f9fafc] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-raleway text-4xl font-bold md:text-5xl text-gray-800 mb-6"
        >
          How It <span className="text-primary">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          A simple path to growth — discover, connect, learn, and achieve all in
          one place.
        </motion.p>
      </div>

      {/* Swiper Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {steps.map((step) => (
              <div key={step.id} className="swiper-slide">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-[150px] rounded-xl py-4 px-4 gap-3 flex flex-col sm:flex-row sm:items-center justify-start text-center sm:text-left
                    bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500"
                >
                  {/* Glow accent */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md mx-auto sm:mx-0 mb-3 sm:mb-0">
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 sm:text-base">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Faded Edges */}
        <div className="absolute top-0 left-0 w-16 sm:w-24 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-16 sm:w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx>{`
        .swiper-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .swiper-wrapper {
          transition-timing-function: linear !important;
          display: flex;
          align-items: stretch;
        }
        
        .swiper-slide {
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;