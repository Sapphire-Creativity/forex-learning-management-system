import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdSupportAgent } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiCurrencyLine } from "react-icons/ri";
import { useClerk } from "@clerk/clerk-react";

const SideBar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut(() => {
      navigate("/login");
    });
  };

  const navItems = [
    { path: "/student", label: "Dashboard", icon: IoIosHome },
    {
      path: "/student/student-courses",
      label: "Courses",
      icon: MdLibraryBooks,
    },
    { path: "/student/student-quizzes", label: "Quizzes", icon: MdQuiz },
    {
      path: "/student/student-request",
      label: "Request",
      icon: MdSupportAgent,
    },
    {
      path: "/student/student-chatroom",
      label: "Chart Room",
      icon: IoChatbubblesOutline,
    },
    { path: "/student/student-profile", label: "Profile", icon: CgProfile },
  ];

  return (
    <>
      <aside
        className={`shadow relative h-full p-2 md:p-5 flex flex-col justify-between bg-primary-dark transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } overflow-hidden`}
      >
        {/* Top: Logo + Navigation */}
        <div className="flex-1 overflow-hidden">
          {/* Enhanced Logo Section */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } mb-10 mt-2 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-primary/10 border border-gray-700/50`}
          >
            <div className="relative">
              <RiCurrencyLine className="text-2xl text-green-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h4 className="font-bold text-white text-lg tracking-tight truncate">
                  Sapph'reFx
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  Trading Academy
                </p>
              </div>
            )}
          </div>

          {/* Enhanced Profile Section */}
          <div className="relative flex flex-col items-center mb-4 group">
            <div className="relative p-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-glow">
              <div className="relative p-0.5 rounded-full bg-gray-900">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border-2 border-gray-700 flex-shrink-0 object-cover"
                />
                {/* Online Status Badge */}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>

            {/* User Info (visible when expanded) */}
            {!isCollapsed && (
              <div className="text-center mt-3 w-full">
                <h5 className="text-white font-semibold text-sm truncate">
                  John Trader
                </h5>
                <p className="text-green-400 text-xs flex items-center justify-center gap-1 truncate">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
                <p className="text-gray-400 text-xs mt-1 truncate">Student</p>
              </div>
            )}
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex flex-col gap-1 pr-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                    } text-sm py-3 rounded-xl transition-all duration-300 group relative overflow-hidden min-h-[48px] ${
                      isActive
                        ? "bg-gradient-to-r from-primary-dark-500/20 to-primary/20 text-secondary border-l-4 border-green-400 shadow-lg"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Animated background effect for active state */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
                      )}

                      <Icon
                        className={`relative z-10 transition-all duration-300 text-lg ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />

                      {!isCollapsed && (
                        <span className="relative z-10 font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      )}

                      {/* Hover effect line - Only show when expanded */}
                      {!isCollapsed && (
                        <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-green-400 to-blue-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-gray-700">
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 flex-shrink-0">
          {/* Progress Indicator */}
          {!isCollapsed && (
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-100/50">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Course Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          )}

          {/* Enhanced Logout Button */}
          <button
            onClick={toggleModal}
            className={`flex items-center text-gray-300 ${
              isCollapsed ? "justify-center px-2" : "gap-3 px-3"
            } py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group border border-transparent hover:border-red-500/30 min-h-[48px] relative`}
          >
            <FiLogOut
              className={`transition-all duration-300 text-lg group-hover:scale-110`}
            />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                Logout
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-gray-700">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Enhanced Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md transition-opacity"
          ></div>

          {/* Enhanced Modal Box */}
          <div className="relative bg-white flex flex-col rounded-2xl shadow-2xl border border-gray-700 p-6 w-[90%] max-w-sm z-10 animate-modal">
            {/* Modal Header */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiLogOut className="text-2xl text-red-400" />
              </div>
              <h4 className="text-lg font-semibold text-primary">
                Confirm Logout
              </h4>
              <p className="text-sm text-primary-dark mt-2">
                Are you sure you want to sign out of your dashboard?
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-700 text-sm hover:bg-primary-dark hover:text-white transition-all duration-300 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 flex-1 shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom styles for scrollbar and glow animation */}
      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(72, 187, 120, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(72, 187, 120, 0.8);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Custom scrollbar for navigation */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(72, 187, 120, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(72, 187, 120, 0.5);
        }

        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </>
  );
};

export default SideBar;
