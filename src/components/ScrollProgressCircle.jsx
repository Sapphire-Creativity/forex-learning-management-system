"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollProgressCircle() {
  const { scrollYProgress } = useScroll();

  // Smooth stroke animation
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [visible, setVisible] = useState(false);

  // Show button after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200); // visible after 200px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-3 z-50"
    >
      <motion.button
        onClick={scrollToTop}
        whileTap={{ scale: 0.9 }}
        className="shadow relative p-1 rounded-full bg-white hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Scroll to top"
      >
        {/* Arrow in the center */}
        <div className="absolute flex items-center justify-center">
          <ArrowUp className="w-5 h-5 text-primary" />
        </div>

        {/* Circular progress */}
        <svg className="w-10 h-10 rotate-[-90deg] " viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="#0066FF"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength,
            }}
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
