import { useClerk } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoursesCarousel from "../../components/CoursesCarousel";
import { IoIosArrowForward } from "react-icons/io";
import LineChart from "../../components/LineChart";
import { IoClose } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PieChart } from "react-minimal-pie-chart";
import SidebarModule from "../../components/SideBarModule";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //
  // Upcoming Event
  const forexCourses = [
    { category: "Foundations", progress: 75 },
    { category: "Technical Analysis", progress: 60 },
    { category: "Trading Strategies", progress: 45 },
    { category: "Risk & Money Management", progress: 30 },
  ];

  const overallProgress =
    forexCourses.reduce((sum, course) => sum + course.progress, 0) /
    forexCourses.length;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 h-screen overflow-y-auto scrollbar-hide">
        {/* section 1 */}
        <div className="col-span-4 h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-primary text-xl md:text-3xl font-bold font-raleway">
                Welcome back, John!
              </h2>
              <p className="text-[.65rem] md:text-sm text-neutral-800 my-1">
                Continue your Forex trading journey. You're making great
                progress!
              </p>
            </div>

            <div>
              <button
                className="lg:hidden flex items-center gap-1 bg-white shadow-small text-primary p-3 rounded-lg hover:bg-primary hover:text-white duration-500"
                onClick={() => setIsSidebarOpen(true)}
              >
                <IoIosArrowForward className="text-lg" />
              </button>
            </div>
          </div>

          {/* Courses */}
          <CoursesCarousel />
          {/*  */}
          <div className="mt-6 scrollbar-hide">
            <LineChart />
          </div>
        </div>

        {/* section 2 */}
        <div className="hidden lg:block col-span-1 bg-primary/1 p-4 rounded-xl">
          <div>
            <div className="w-40 h-40 my-4 mx-auto">
              <CircularProgressbar
                value={overallProgress}
                text={`${Math.round(overallProgress)}%`}
                styles={buildStyles({
                  pathColor: "#0066FF",
                  textColor: "#1f2937",
                  trailColor: "#e5e7eb",
                  strokeLinecap: "round",
                })}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Completed courses: {Math.round(overallProgress)}%
            </p>
          </div>
          <SidebarModule />
        </div>
      </div>

      {/*  */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar content */}
          <div className="ml-auto w-72 bg-white h-full shadow-lg p-5 relative animate-slideIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoClose size={24} />
            </button>

            {/*  */}
            <div>
              <div className="w-40 h-40 my-4 mx-auto">
                <CircularProgressbar
                  value={overallProgress}
                  text={`${Math.round(overallProgress)}%`}
                  styles={buildStyles({
                    pathColor: "#0066FF",
                    textColor: "#1f2937",
                    trailColor: "#e5e7eb",
                    strokeLinecap: "round",
                  })}
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Completed courses: {Math.round(overallProgress)}%
              </p>
            </div>

            {/*  */}
            <SidebarModule />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
