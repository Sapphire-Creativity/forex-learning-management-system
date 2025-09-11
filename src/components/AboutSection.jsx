import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative w-full py-40 bg-gradient-to-b from-white via-[#f8fbff] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left side: Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <motion.img
              src="/images/students-learning.jpg"
              alt="Students learning"
              className="object-cover w-full h-[400px]"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          {/* Glow Effect */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/30 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/30 blur-3xl rounded-full animate-pulse"></div>
        </motion.div>

        {/* Right side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h5 className="text-secondary ">About Us</h5>
          <hr className="max-w-[60px] h-[1.5px] rounded-full bg-secondary my-1 border-0" />
          <h2 className="font-sans text-4xl md:text-4xl font-bold text-primary-dark mb-4">
            Learn. Connect. Grow.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our platform brings all your learning needs into one place — access
            expert-led courses, collaborate with peers, and stay connected with
            your mentor. Whether you're studying at your own pace or scheduling
            1:1 sessions, we’re here to make learning simple, engaging, and
            effective.
          </p>

          {/* Key Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                icon: "📚",
                title: "All-in-One Courses",
                text: "Browse and learn from a wide range of curated lessons designed to help you grow faster.",
                gradient: "from-blue-500 to-blue-300",
                accent: "bg-blue-400/30",
                hover: "text-blue-600",
              },
              {
                icon: "👨‍🏫",
                title: "Mentor Sessions",
                text: "Book live sessions with mentors to get personalized guidance and insights anytime.",
                gradient: "from-purple-500 to-pink-400",
                accent: "bg-purple-400/30",
                hover: "text-purple-600",
              },
              {
                icon: "🤝",
                title: "Community Support",
                text: "Join discussions, share ideas, and grow together with a supportive learning community.",
                gradient: "from-green-500 to-emerald-400",
                accent: "bg-green-400/30",
                hover: "text-green-600",
              },
              {
                icon: "📈",
                title: "Track Progress",
                text: "Stay motivated by monitoring your achievements and learning milestones in real-time.",
                gradient: "from-pink-500 to-rose-400",
                accent: "bg-pink-400/30",
                hover: "text-pink-600",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative p-3 rounded-2xl bg-white/20 backdrop-blur-md shadow 
                           transition-all duration-500 group overflow-hidden border border-white/30 hover:shadow-xl"
              >
                {/* Glow accent */}
                <div
                  className={`absolute -top-6 -right-6 w-10 h-10 ${card.accent} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr ${card.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition`}
                >
                  {card.icon}
                </div>

                <h4
                  className={`font-semibold text-[0.8rem] mb-2 text-gray-800 group-hover:${card.hover} transition`}
                >
                  {card.title}
                </h4>
                <p className="text-gray-600 text-xs ">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
