import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";

const StudentLayout = () => {
  const [isActive, setIsActive] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideBar = () => {
    if (!isSmallScreen) {
      setIsActive(!isActive);
    }
  };
  return (
    <div className="flex h-screen bg-color overflow-hidden scrollbar-hide">
      {/* Sidebar */}
      <div
      // className={`h-full bg-white shadow transition-all duration-300 ${
      //   isSmallScreen ? "w-20" : isActive ? "w-40" : "w-20"
      // } flex-shrink-0`}
      >
        <SideBar isCollapsed={isSmallScreen || !isActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden scrollbar-hide">
        {/* Topbar */}
        <div className="bg-white shadow-small z-10 flex-shrink-0">
          <Topbar isActive={isActive} toggleSideBar={toggleSideBar} />
        </div>

        {/* Page Content */}
        <div  className="scrollbar-hide flex-1 overflow-y-auto bg-white  p-3 md:p-6 rounded-lg border border-primary-dark/10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
