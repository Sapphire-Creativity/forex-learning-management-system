import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    text: "This platform changed the way I learn! The mentor sessions gave me confidence and clarity in my studies.",
    image: "/images/user1.jpg",
  },
  {
    name: "David Kim",
    role: "Software Engineering Intern",
    text: "Having all my courses and mentor support in one place makes learning seamless and motivating.",
    image: "/images/user2.jpg",
  },
  {
    name: "Amara Bello",
    role: "Business Administration Student",
    text: "The community support is amazing. I never feel alone in my journey anymore!",
    image: "/images/user3.jpg",
  },
  {
    name: "James Lee",
    role: "Data Analyst",
    text: "The progress tracking keeps me motivated and focused. I can literally see my growth!",
    image: "/images/user4.jpg",
  },
];

const TestimonialCarousel = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 40,
        ease: "linear",
      },
    });
  }, [controls]);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 40,
        ease: "linear",
      },
    });
  };

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-white via-[#f8fbff] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Heading */}
        <h2 className="font-raleway text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          What Our <span className="text-primary">Students</span> Say
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mb-16 max-w-2xl mx-auto">
          Hear from learners who have experienced growth, mentorship, and
          community through our platform.
        </p>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fade Overlays */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div> */}

          {/* Slider */}
          <motion.div className="flex gap-8" animate={controls}>
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={index}
                className="relative min-w-[300px] max-w-[350px] p-6 rounded-3xl bg-white/10 backdrop-blur-xl shadow-[inset_8px_8px_16px_rgba(255,255,255,0.25),inset_-8px_-8px_16px_rgba(0,0,0,0.05)] border border-white/30 hover:scale-105 transition-transform duration-500"
              >
                {/* User Info */}
                <div className="flex flex-col items-center mb-4">
                  {/* <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md mb-2"
                  /> */}
                  <h4 className="font-semibold text-md text-primary ">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm italic mb-4">
                  "{t.text}"
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
