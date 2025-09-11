import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-white to-blue-50 pt-16 pb-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-xl"></div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Newsletter Section - Creative Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-l from-primary to-primary-dark rounded-2xl p-8 mb-16 shadow-small overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-20"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 relative z-10">
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">
                Join Our Learning Community
              </h4>
              <p className="text-blue-100 max-w-md">
                Get exclusive insights, learning tips, and early access to new
                courses.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-shrink-0">
              <form className="w-full">
                <div className="flex flex-col justify-center sm:flex-row items-center gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full p-4 pr-12 bg-white/90 backdrop-blur-sm border-0 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
                    />
                    <FaPaperPlane className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto py-4 px-8 bg-white text-blue-600 font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center gap-2"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content - Creative Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Section - Takes full width on mobile, 5 cols on desktop */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                <span className="text-primary">Sapph'reFX</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Learning
                </span>
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Empowering you to grow with real-time insights, mentorship, and
                transformative learning experiences.
              </p>

              {/* Social Media - Moved to brand section */}
              <div className="mt-auto">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  {[
                    { Icon: FaTwitter, color: "hover:text-blue-400" },
                    { Icon: FaLinkedin, color: "hover:text-blue-600" },
                    { Icon: FaInstagram, color: "hover:text-pink-500" },
                    { Icon: FaFacebook, color: "hover:text-blue-700" },
                  ].map(({ Icon, color }, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ y: -3 }}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 ${color} transition-all duration-200 shadow-sm hover:shadow-md`}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links - 3 cols on desktop */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-gray-800 mb-4 text-lg relative inline-block">
                Explore
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {[
                  "About",
                  "Features",
                  "Testimonials",
                  "Contact",
                  "Blog",
                  "Careers",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources - 4 cols on desktop */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-gray-800 mb-4 text-lg relative inline-block">
                Resources
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-purple-500 rounded-full"></span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-3">
                    {["Docs", "FAQ", "Tutorials", "Webinars"].map(
                      (item, idx) => (
                        <li key={idx}>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-purple-600 transition-colors flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-3 group-hover:bg-purple-600 transition-colors"></span>
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    {[
                      "Privacy Policy",
                      "Terms of Service",
                      "Cookie Policy",
                      "Security",
                    ].map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-purple-600 transition-colors flex items-center group"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-200 rounded-full mr-3 group-hover:bg-purple-600 transition-colors"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-500 mb-4 md:mb-0 flex items-center">
            © {new Date().getFullYear()} Sapphire Learning. All rights reserved.
            <span className="mx-2">•</span>
            Made with <FaHeart className="text-red-500 mx-1" /> for learners
            worldwide
          </p>

          {/* Additional footer links */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Status
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Accessibility
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
