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
      <section className="relative h-[100vh] w-full flex flex-col items-center justify-start bg-gradient-to-b from-[rgb(248,251,255)] to-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10 pt-16">
          {/* Heading */}
          <h2 className="font-raleway text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Visualize Your <span className="text-primary">Growth</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay ahead in your learning journey with real-time insights, mentor
            guidance, and a seamless learning dashboard built just for you.
          </p>

          <div className="flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm md:text-[1rem] px-6 py-3 mx-autofont-semibold btn btn-primary"
            >
              Start Learning Now
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm md:text-[1rem] px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg"
            >
              Book a Mentor Session
            </motion.button> */}
          </div>
        </div>

        {/* Animated Chart Image with Buttons inside */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -30, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl"
        >
          <div className="relative">
            <img
              src="src/assets/chart.png"
              alt="Forex Chart"
              className="w-full drop-shadow-2xl rounded-2xl backdrop-blur-md border border-white/30"
            />

            {/* Glow accents */}
            <div className="absolute -top-12 -left-12 w-52 h-52 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-secondary/20 blur-3xl rounded-full"></div>
          </div>
        </motion.div>
      </section>
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
