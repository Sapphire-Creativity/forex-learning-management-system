import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SidebarModule = () => {
  const [showEvents, setShowEvents] = useState(true);
  const [showTasks, setShowTasks] = useState(true);

  // Mock Data
  const events = [
    {
      id: 1,
      title: "🎥 Live Mentor Session",
      date: "Tomorrow • 3 PM",
      action: "Join Live",
    },
    {
      id: 2,
      title: "📘 Class: Technical Analysis",
      date: "Oct 2 • 11 AM",
      action: "View Lesson",
    },
    {
      id: 3,
      title: "📊 Market Recap Webinar",
      date: "Oct 5 • 7 PM",
      action: "Register",
    },
  ];

  const tasks = [
    { id: 1, title: "📝 Assignment: Foundation of Forex", due: "Due in 1 day" },
    { id: 2, title: "📝 Assignment: Technical Analysis", due: "Due in 5 days" },
    { id: 3, title: "📄 Assignment: Trading Journal", due: "Due Sep 30" },
    { id: 4, title: "📝 Quiz: Risk Management", due: "Due Oct 1" },
    { id: 5, title: "📘 Read Chapter 4 - Indicators", due: "Due Oct 3" },
  ];

  return (
    <div
      className="
        w-full 
        h-[calc(100vh-5rem)]  
        bg-white 
        rounded-2xl 
        shadow-md 
        flex 
        flex-col 
        gap-6 
        overflow-y-auto 
         mt-10
         scrollbar-hide
      "
    >
      {/* Events Section */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowEvents(!showEvents)}
        >
          <h3 className="text-base font-medium text-primary flex items-center gap-2">
            📅 Upcoming Events
          </h3>
          {showEvents ? (
            <ChevronUp className="w-4 h-4 text-primary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary" />
          )}
        </div>

        <AnimatePresence>
          {showEvents && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex flex-col gap-3"
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1 hover:shadow-sm transition"
                >
                  <p className="font-medium text-gray-800 text-sm">
                    {event.title}
                  </p>
                  <p className="text-[0.65rem] md:text-xs text-gray-500">
                    {event.date}
                  </p>
                  <button className="mt-1 px-3 py-1 text-xs md:text-sm bg-primary text-white rounded-full self-start hover:bg-primary/90 transition">
                    {event.action}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tasks Section */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowTasks(!showTasks)}
        >
          <h3 className="text-base font-medium text-primary flex items-center gap-2">
            📝 Upcoming Tasks
          </h3>
          {showTasks ? (
            <ChevronUp className="w-4 h-4 text-primary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary" />
          )}
        </div>

        <AnimatePresence>
          {showTasks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex flex-col gap-3"
            >
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-xl p-3 flex items-center justify-between hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {task.title}
                    </p>
                    <p className="text-[0.65rem] md:text-xs text-gray-500">
                      {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarModule;
