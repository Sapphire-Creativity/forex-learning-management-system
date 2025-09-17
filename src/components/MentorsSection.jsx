import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import { mentorsData } from "../assets/data";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MentorsSection = () => {
  return (
    <section id="mentors" className="px-10 py-14 relative overflow-x-hidden">
      {/*  */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-raleway text-4xl font-bold md:text-5xl text-gray-800  mb-6"
        >
          Meet Your <span className="text-primary">Mentors</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Mentors with practical experience
        </motion.p>
      </div>

      {/* Swiper Container */}
      <div className="relative mt-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 6000, disableOnInteraction: false }} // Slowed down
          speed={1200}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {mentorsData.map((data) => (
            <SwiperSlide key={data.id}>
              <div className="group relative rounded-lg overflow-hidden">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Info details (Hidden by default, slides up on hover) */}
                <div className="absolute bottom-[-120%] left-4 right-4 transition-all duration-700 group-hover:bottom-4 shadow-lg">
                  <span className="bg-primary text-white py-2 px-6 rounded-tr-lg rounded-tl-lg">
                    {data.role}
                  </span>

                  <div className="flex flex-col items-center mt-2 bg-white p-4 rounded-xl">
                    <h4 className="text-secondary text-lg font-bold">
                      {data.name}
                    </h4>

                    {/*  */}
                    <p className="text-[0.65rem] font-bold text-center">
                      {data.experience}
                    </p>
                    <p className="text-[0.7rem] text-center">{data.bio}</p>

                    {/* Social Icons with Rounded Border & Hover Effect */}
                    <div className="flex gap-3 mt-3">
                      <TiSocialFacebook className="border border-secondary hover:border-primary text-[2rem] bg-white text-black hover:bg-primary hover:text-white duration-500 p-2 rounded-full" />
                      <FaInstagram className="border border-secondary hover:border-primary text-[2rem] text-black bg-white hover:bg-primary hover:text-white duration-500 p-2 rounded-full" />
                      <FaXTwitter className="border border-secondary hover:border-primary text-[2rem] bg-white text-black hover:bg-primary hover:text-white duration-500 p-2 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 swiper-prev cursor-pointer border-2 border-gray-600 p-3 rounded-full transition-all duration-300 hover:bg-gray-600 hover:text-white hover:scale-110">
          <FaChevronLeft />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 swiper-next cursor-pointer border-2 border-gray-600 p-3 rounded-full transition-all duration-300 hover:bg-gray-600 hover:text-white hover:scale-110">
          <FaChevronRight />
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
