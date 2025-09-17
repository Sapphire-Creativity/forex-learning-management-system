import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";
import {
  FaHome,
  FaInfoCircle,
  FaStar,
  FaUserFriends,
  FaQuoteRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "home", title: "Home", icon: <FaHome className="w-4 h-4" /> },
  { id: "about", title: "About", icon: <FaInfoCircle className="w-4 h-4" /> },
  { id: "features", title: "Features", icon: <FaStar className="w-4 h-4" /> },
  {
    id: "mentors",
    title: "Mentors",
    icon: <FaUserFriends className="w-4 h-4" />,
  },
  {
    id: "testimonials",
    title: "Testimonials",
    icon: <FaQuoteRight className="w-4 h-4" />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  //
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenu(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveMenu(id);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 flex justify-center"
      >
        {scrolled && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-xl transition-all duration-300"></div>
        )}

        <div
          className="relative w-[90vw] max-w-6xl py-2 px-8 rounded-full 
                     bg-white backdrop-blur-xl 
                     border border-white/20 shadow
                     flex items-center justify-between"
        >
          {/* Logo */}
          <h4 className="text-lg font-semibold text-primary tracking-wide">
            Sapph're<span className="font-extrabold italic">FX</span>
          </h4>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-8 text-gray-700 font-medium text-sm">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition-colors duration-300 ${
                  activeMenu === item.id
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button onClick={() => navigate("/auth")} className="btn btn-primary">
            Get Started <IoIosSend className="text-xl ml-2" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center justify-around bg-white backdrop-blur-xl px-4 py-2 rounded-full shadow border border-white/20">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative flex items-center cursor-pointer text-gray-600 hover:text-primary"
              // onMouseEnter={() => setActive(item.id)}
              // onMouseLeave={() => setActive(null)}
              // onClick={() => setActive(item.id)}
              onClick={() => scrollToSection(item.id)}
            >
              {/* Icon */}
              <div
                className={`p-2 rounded-full transition flex flex-col items-center ${
                  activeMenu === item.id
                    ? " text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <p className="text-[0.58rem] mt-1">{item.title}</p>
              </div>

              {/* Title (appears on hover/tap) */}
              {/* <AnimatePresence>
                {active === item.id && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 6 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full ml-2 bg-white shadow px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                  ></motion.span>
                )}
              </AnimatePresence> */}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
