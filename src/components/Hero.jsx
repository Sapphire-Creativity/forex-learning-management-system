import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden bg-gray-50">
      {/*  */}

      {/* Soft blur glow top-right with drift */}
      <motion.div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/40 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0], // slight horizontal drift
          y: [0, 15, 0], // slight vertical drift
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Soft blur glow bottom-left with drift */}
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/40 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0], // slight horizontal drift
          y: [0, -15, 0], // slight vertical drift
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Interactive radial glow following cursor */}
      <div
        className="absolute -inset-10 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
        }}
      />
      {/* Main content */}
      <div className="relative z-10 px-4 max-w-[60rem]">
        <h1 className="font-raleway text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Master Forex Trading with{" "}
          <span className="text-primary font-extrabold">Sapph'reFX</span>
        </h1>

        <div className="my-10">
          <ReactTyped
            strings={[
              "Learn Forex the smart way.",
              "Trade with confidence.",
              "Build your financial future.",
              "Connect with expert mentors.",
              "Access courses all in one place.",
              "Stay ahead with live market insights.",
            ]}
            typeSpeed={50}
            backSpeed={40}
            backDelay={1500}
            loop
            className="font-sans text-xl md:text-2xl text-gray-800 font-medium"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm md:text-[1rem] btn btn-primary transition-all"
          >
            Explore Courses
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm md:text-[1rem] btn btn-secondary transition-all"
          >
            Meet your Mentor
          </motion.button>
        </div>
      </div>
      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
