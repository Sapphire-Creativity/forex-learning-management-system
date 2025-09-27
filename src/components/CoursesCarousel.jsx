import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectCreative } from "swiper/modules";
import {
  FaBookOpen,
  FaChartLine,
  FaLightbulb,
  FaShieldAlt,
  FaBrain,
  FaCogs,
  FaArrowRight,
} from "react-icons/fa";

const forexCourses = [
  {
    category: "Foundations of Forex",
    videos: 10,
    progress: 75,
    description:
      "Master the basics of currency trading and market fundamentals with expert guidance from professional traders.",
    instructor: "Sarah Johnson",
    role: "Senior Forex Analyst",
    icon: <FaBookOpen className="text-blue-500 text-lg" />,
  },
  {
    category: "Technical Analysis",
    videos: 15,
    progress: 60,
    description:
      "Learn chart patterns, indicators, and price action analysis techniques used by successful traders worldwide.",
    instructor: "Mike Chen",
    role: "Technical Analysis Expert",
    icon: <FaChartLine className="text-green-500 text-lg" />,
  },
  {
    category: "Trading Strategies",
    videos: 15,
    progress: 45,
    description:
      "Develop profitable trading systems and master entry/exit strategies that work in various market conditions.",
    instructor: "Emma Davis",
    role: "Professional Trader",
    icon: <FaLightbulb className="text-yellow-500 text-lg" />,
  },
  {
    category: "Risk & Money Management",
    videos: 5,
    progress: 30,
    description:
      "Protect your capital with proper risk management techniques that ensure long-term trading success.",
    instructor: "Robert Wilson",
    role: "Risk Management Specialist",
    icon: <FaShieldAlt className="text-red-500 text-lg" />,
  },
  {
    category: "Trading Psychology",
    videos: 8,
    progress: 20,
    description:
      "Master your mindset and emotional control to maintain consistency and discipline in your trading journey.",
    instructor: "Dr. Lisa Park",
    role: "Trading Psychologist",
    icon: <FaBrain className="text-purple-500 text-lg" />,
  },
  {
    category: "Advanced Concepts",
    videos: 8,
    progress: 10,
    description:
      "Explore advanced techniques, market microstructure, and professional trading methodologies.",
    instructor: "James Thompson",
    role: "Hedge Fund Manager",
    icon: <FaCogs className="text-gray-600 text-lg" />,
  },
];

export default function CourseCarousel() {
  return (
    <div className="w-full bg-gray-50 rounded-xl pt-5">
      <div className="flex items-center gap-2 mb-2">
        <h6 className="text-sm md:text-xl ml-2 mb-4 text-primary-dark">
          Courses{" "}
        </h6>
      </div>

      <Swiper
        slidesPerView={2}
        navigation
        speed={1200}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
      >
        {forexCourses.map((course, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-small rounded-2xl p-3 sm:p-4 flex flex-col justify-between h-full mb-4 mx-1 sm:mx-2 transition duration-300">
              {/* Header */}
              <div className="flex justify-start items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white rounded-xl shadow-small text-[0.65rem] sm:text-sm">
                  {course.icon}
                </div>

                <h3 className="text-[0.7rem] sm:text-sm md:text-base font-medium text-gray-800 truncate">
                  {course.category}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-[0.65rem] sm:text-xs md:text-sm mb-3 line-clamp-3">
                {course.description}
              </p>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2 mb-2">
                <div
                  className="bg-secondary h-1 sm:h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-gray-500 mb-2">
                Progress: {course.progress}%
              </p>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-2">
                <div>
                  <p className="font-medium text-[0.7rem] sm:text-xs text-gray-700 flex items-center gap-1">
                    👤 {course.instructor}
                  </p>
                  <p className="text-[0.65rem] sm:text-xs text-gray-500">
                    {course.role}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  <span className="text-[0.65rem] sm:text-xs font-medium text-gray-600">
                    🎥 {course.videos} Videos
                  </span>

                  <button className="p-1.5 sm:p-2 bg-primary/10 rounded-full hover:bg-primary group transition duration-300">
                    <FaArrowRight className="text-primary group-hover:text-white duration-300 text-[0.7rem] sm:text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white; /* Tailwind green-500 */
          color: primary;
          border-radius: 9999px; /* full rounded */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 12px; /* arrow size */
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
