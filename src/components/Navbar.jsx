import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 flex justify-center"
    >
      {/* Background overlay only visible when scrolling */}
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-xl transition-all duration-300"></div>
      )}

      {/* Navbar */}
      <div
        className="relative w-[90vw] max-w-6xl py-2 px-8 rounded-full 
                   bg-white backdrop-blur-xl 
                   border border-white/20 shadow
                   flex items-center justify-between"
      >
        {/* Logo */}
        <h4 className="text-lg font-semibold text-primary tracking-wide">
          Sapph're
          <span className="font-extrabold italic">FX</span>
        </h4>

        {/* Nav menus */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
          <li className="text-primary-dark hover:text-primary transition-colors duration-300 cursor-pointer">
            Home
          </li>
          <li className="text-primary-dark hover:text-primary transition-colors duration-300 cursor-pointer">
            About
          </li>
          <li className="text-primary-dark hover:text-primary transition-colors duration-300 cursor-pointer">
            Services
          </li>
          <li className="text-primary-dark hover:text-primary transition-colors duration-300 cursor-pointer">
            Contact
          </li>
        </ul>

        {/* Hamburger (Mobile) */}
        <button className="md:hidden p-2 rounded-full hover:bg-white/40 transition">
          <LuMenu className="w-6 h-6 text-primary" />
        </button>

        {/*  */}
        <button className="btn btn-primary hidden md:inline-flex">
          Get Started <IoIosSend className="text-xl ml-2"/>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
