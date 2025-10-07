import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { forexCourses } from "../../assets/data";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";

import CourseOutline from "../../components/CourseOutline";
import { IoIosArrowForward } from "react-icons/io";
const StudentCourses = () => {
  // Get categories from the actual data

  const courseCategories = forexCourses.map((course) => course.category);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(forexCourses[0]); // Track selected course

  // Track selected category
  const [selectedCategory, setSelectedCategory] = useState(courseCategories[0]);
  const [courseSideBar, setCourseSideBar] = useState(false);

  const handleCategorySelect = (category) => {
    const course = forexCourses.find((course) => course.category === category);

    if (course) {
      setSelectedCourse(course);
      setSelectedCategory(category);

      // Reset lesson selection when switching courses
      setSelectedLesson(null);
      setSelectedModule(null);
    }
  };

  const displayDetails = (moduleTitle, lessonTitle) => {
    const module = selectedCourse.modules.find(
      (item) => item.moduleTitle === moduleTitle
    );

    if (module) {
      const lesson = module.lessons.find((e) => e.title === lessonTitle);
      if (lesson) {
        setSelectedModule(module);
        setSelectedLesson(lesson);
      }
    }
  };
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 5);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -200 : 200;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <>
      {/* Categories header */}
      <div className="relative w-full bg-white py-2 mb-4">
        {/* Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 md:p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide px-8"
        >
          {courseCategories.map((category, index) => (
            <p
              key={index}
              onClick={() => handleCategorySelect(category)}
              className="bg-gray-100 text-[0.7rem] md:text-sm p-4 rounded-xl cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition whitespace-nowrap"
            >
              {category}
            </p>
          ))}
        </div>

        {/* Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 md:p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/*  */}
      <div className="relative bg-gray-50 py-2 w-full h-full rounded-xl grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="absolute right-0 top-0 z-50">
          <button
            className="lg:hidden flex items-center gap-1 bg-white shadow-small text-primary p-3 rounded-lg hover:bg-primary hover:text-white duration-500"
            onClick={() => setCourseSideBar(!courseSideBar)}
          >
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
        {/* Course Player Section */}
        <div className="col-span-4 w-full flex flex-col items-start justify-start px-4 py-6 bg-white rounded-2xl shadow-md border border-gray-100">
          {selectedLesson ? (
            <>
              {/* Video Player */}
              <div className="w-full max-w-[80rem] mx-auto aspect-video mb-6 relative rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={selectedLesson.videoUrl.replace("watch?v=", "embed/")}
                  title={selectedLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>

                {/* Overlay gradient for subtle effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Lesson Title & Description */}
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  {selectedLesson.title}
                </h2>

                <p className="text-gray-500 text-sm md:text-base mb-4 leading-relaxed">
                  {selectedModule?.description}
                </p>

                <div className="border-t border-gray-100 my-4"></div>

                {/* Notes Section */}
                <div className="flex flex-col bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                    <LuNotebookPen className="text-lg" />
                    <p className="text-base md:text-lg">Mentor’s Notes</p>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {selectedModule?.notes}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center  w-full bg-gray-50">
              {/*  */}
              <div
                // key={item.id}
                className="w-full bg-white shadow-md rounded-2xl overflow-hidden"
              >
                {/* Thumbnail + Info */}
                <div className="relative w-full h-64 md:h-80">
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
                    <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base">
                      {selectedCourse.category} • {selectedCourse.difficulty} •{" "}
                      {selectedCourse.duration}
                    </p>
                  </div>
                </div>

                {/* Overview */}
                <div className="p-2 md:p-4 text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">
                    Course Overview
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedCourse.overview.description}
                  </p>

                  {/* Objectives */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      🎯 Learning Objectives
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedCourse.overview.objectives.map(
                        (objective, index) => (
                          <li key={index}>{objective}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      🧠 Requirements
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedCourse.overview.requirements.map(
                        (req, index) => (
                          <li key={index}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* What You Will Learn */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      📘 What You’ll Learn
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedCourse.overview.whatYouWillLearn.map(
                        (learn, index) => (
                          <li key={index}>{learn}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-primary/10 p-6 md:p-8 text-center">
                  <h3 className="text-primary-dark font-semibold text-lg md:text-xl mb-3">
                    Select a lesson to get started 🎥
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                    Choose a module from the course outline to begin learning.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*  */}

        <div className="hidden lg:block">
          <CourseOutline
            displayDetails={displayDetails}
            course={selectedCourse}
          />
        </div>

        {/*  */}

        {courseSideBar && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setCourseSideBar(false)}
            ></div>

            <div className="ml-auto w-72 bg-white h-full shadow-lg p-5 relative animate-slideIn">
              {/* Course content outline */}
              <CourseOutline
                displayDetails={displayDetails}
                course={selectedCourse}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentCourses;
