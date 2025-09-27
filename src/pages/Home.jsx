import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Features from "../components/Features";
import { motion } from "framer-motion";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import ScrollProgressCircle from "../components/ScrollProgressCircle";
import MentorsSection from "../components/MentorsSection";
import Navbar from "../components/Navbar";
import ChartImage from "../assets/chart.png";
import studentDashboard from "../assets/student-dashboard.png";
const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />
      <AboutSection />
      <Features />
      {/*  */}

      {/* Mentors Section */}
      <MentorsSection />

      {/* Chart Section */}
      <section className="relative h-[90vh] w-full flex flex-col items-center justify-start bg-gradient-to-b from-[rgb(248,251,255)] to-white overflow-hidden">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10 pt-16">
          <h2 className="font-raleway text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Visualize Your <span className="text-primary">Growth</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto mb-8">
            Stay ahead in your learning journey with real-time insights, mentor
            guidance, and a seamless dashboard built just for you.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm md:text-[1rem] px-6 py-3 font-semibold btn btn-primary shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning Now
          </motion.button>
        </div>

        {/* Animated Dashboard Image */}
        <motion.div
          initial={{ y: 0, scale: 0.95 }}
          animate={{ y: [0, -20, 0], scale: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[70vh]"
        >
          <div className="relative w-full h-full">
            <img
              src={studentDashboard}
              alt="Dashboard"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/20 transform transition-transform hover:scale-105 hover:rotate-1"
            />

            {/* Glow accents */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/30 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-20 -right-16 w-64 h-64 bg-secondary/30 blur-3xl animate-pulse"></div>

            {/* Floating Insight Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-40 md:top-10 left-0 p-3 bg-white rounded-xl shadow-2xl flex flex-col justify-center items-start transform rotate-[-3deg]"
            >
              <p className="text-xs text-gray-500">Completed Lessons</p>
              <p className="text-lg font-bold text-primary">24/30</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-5 md:bottom-20 right-0 md:right-20  bg-white rounded-xl p-4 shadow-2xl flex flex-col justify-center items-start transform rotate-[2deg]"
            >
              <p className="text-xs text-gray-500">Upcoming Events</p>
              <p className="text-lg font-bold text-secondary">3 this week</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-10 left-0 md:top-40 md:right-100 w-32 h-16 bg-white rounded-xl p-3 shadow-2xl flex flex-col justify-center items-start transform rotate-[1deg]"
            >
              <p className="text-xs text-gray-500">Tasks Pending</p>
              <p className="text-sm font-bold text-[#FF7A00]">5</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/*  */}
      <TestimonialSection />
      {/*  */}
      <Faq />
      {/*  */}
      <ScrollProgressCircle />
      <Footer />
    </>
  );
};

export default Home;
