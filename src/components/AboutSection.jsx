import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Users, BookOpen, TrendingUp, ArrowRight, ChevronDown } from "lucide-react";
import AboutImage from "../assets/about-image.png"
const AboutSection = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const contentContainerRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (isMobile) {
        setIsFixed(false);
        setShowScrollIndicator(false);
        return;
      }

      if (sectionRef.current && contentContainerRef.current && rightContentRef.current) {
        const section = sectionRef.current;
        const contentContainer = contentContainerRef.current;
        const rightContent = rightContentRef.current;
        
        const sectionRect = section.getBoundingClientRect();
        const rightContentRect = rightContent.getBoundingClientRect();

        // Activate fixed mode when section enters viewport (desktop only)
        if (sectionRect.top <= 100 && sectionRect.bottom >= window.innerHeight) {
          setIsFixed(true);
          
          // Check if right content is fully visible
          const isContentFullyVisible = rightContentRect.bottom <= window.innerHeight - 50;
          setShowScrollIndicator(!isContentFullyVisible);
        } else {
          setIsFixed(false);
          setShowScrollIndicator(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const features = [
    {
      icon: <BookOpen size={20} />,
      title: "All-in-One Courses",
      text: "Browse and learn from a wide range of curated lessons designed to help you grow faster.",
      gradient: "from-blue-500 to-cyan-400",
      stats: "500+ Courses"
    },
    {
      icon: <Users size={20} />,
      title: "Mentor Sessions",
      text: "Book live sessions with mentors to get personalized guidance and insights anytime.",
      gradient: "from-purple-500 to-pink-400",
      stats: "100+ Experts"
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Progress Tracking",
      text: "Stay motivated by monitoring your achievements and learning milestones in real-time.",
      gradient: "from-green-500 to-emerald-400",
      stats: "95% Success Rate"
    },
    {
      icon: <Play size={20} />,
      title: "Live Sessions",
      text: "Interactive live classes with Q&A sessions and real-time collaboration features.",
      gradient: "from-orange-500 to-red-400",
      stats: "24/7 Access"
    }
  ];

  return (
    <>
      <section 
        id="about" 
        ref={sectionRef}
        className="relative w-full min-h-screen lg:h-screen py-12 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20 overflow-visible"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        {/* Container - Different behavior for mobile vs desktop */}
        <div 
          ref={contentContainerRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-start h-full py-8 lg:py-12 ${
            isFixed && !isMobile ? "fixed top-0 left-0 right-0 bottom-0 z-50 bg-white/90 backdrop-blur-md pt-20" : "relative"
          }`}
        >
          {/* Left side: Image - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[80vh] flex items-center block"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={AboutImage}
                alt="Students learning"
                className="w-full h-full object-cover"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">Interactive Learning</h4>
                      <p className="text-gray-600 text-xs">Join 50,000+ students worldwide</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">50K+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Content - Full width on mobile, scrollable on desktop */}
          <motion.div
            ref={rightContentRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-full ${isFixed && !isMobile ? "lg:overflow-y-auto lg:max-h-[80vh] lg:pr-4 lg:scrollbar-thin lg:scrollbar-thumb-blue-200 lg:scrollbar-track-transparent" : ""}`}
          >
            <div className="space-y-6 lg:space-y-8">
              {/* Header Section */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                  <TrendingUp size={16} className="mr-2" />
                  Transforming Education
                </div>

                <h5 className="text-blue-600 font-semibold text-lg mb-2">About Us</h5>
                <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                  Learn Smarter,{" "}
                  <span className="text-primary block lg:inline">
                    Grow Faster
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We're revolutionizing online education through interactive learning experiences, 
                  personalized mentorship, and a supportive community that helps you achieve your goals faster.
                </p>
              </div>

              {/* Stats Grid - Improved for mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">200+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Mentors</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">95%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Success</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Support</div>
                </div>
              </div>

              {/* Features Grid - Improved spacing for mobile */}
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 
                               hover:bg-white/80 hover:border-blue-200/60 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        {feature.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-2 gap-1 sm:gap-0">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                            {feature.title}
                          </h4>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600 whitespace-nowrap self-start sm:self-auto">
                            {feature.stats}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight size={14} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* CTA Section - Better mobile sizing */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-2 sm:pt-4"
              >
                <button className="group relative w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base">
                  <span className="relative z-10 flex items-center justify-center">
                    Start Learning Free
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </motion.div> */}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Only show on desktop when fixed */}
        {showScrollIndicator && isFixed && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex flex-col items-center space-y-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
              <span className="text-sm text-gray-600 font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={20} className="text-gray-500" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Spacer to maintain scroll flow when fixed - Only on desktop */}
      {isFixed && !isMobile && <div className="h-screen"></div>}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-blue-200::-webkit-scrollbar-thumb {
          background-color: #bfdbfe;
          border-radius: 10px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default AboutSection;