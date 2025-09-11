import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  BookOpen,
  UserCheck,
  Video,
  GraduationCap,
  Award,
  Globe,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 18000,
    autoplay: true,
    autoplaySpeed: 0, // continuous
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section id="features" className="relative w-full py-20 bg-gradient-to-b from-white via-[#f9fafc] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-raleway text-4xl font-bold md:text-5xl text-gray-800  mb-6"
        >
          How It <span className="text-primary">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          A simple path to growth — discover, connect, learn, and achieve all in
          one place.
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-6">
        <Slider {...settings}>
          {steps.map((step) => (
            <div key={step.id} className="px-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-[150px] rounded-xl py-4 px-2  gap-2 mb-5 text-center  flex justify-start items-center
                  bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500"
              >
                {/* Glow accent */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md mb-6">
                  {step.icon}
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-[0.75rem]">{step.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>

        {/* Faded Edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
