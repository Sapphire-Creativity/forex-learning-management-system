import React, { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

const CourseOutline = ({ displayDetails, course }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = (index) => {
    setShowDetails(showDetails === index ? null : index);
  };

  // Safety check - if no course or modules, show fallback UI
  if (!course || !course.modules || course.modules.length === 0) {
    return (
      <div className="col-span-1">
        <h3 className="text-primary-dark text-base md:text-xl font-bold mb-2">
          Course Outline
        </h3>
        <div className="bg-primary/10 rounded-md p-4 text-center">
          <p className="text-primary text-sm">No course content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1">
      <h3 className="text-primary-dark text-base md:text-xl font-bold mb-2">
        Course Outline
      </h3>

      <div className="flex flex-col gap-2 cursor-pointer">
        {course.modules.map((module, index) => (
          <div key={index} className="color-primary flex flex-col gap-1">
            {/* Preview */}
            <div
              onClick={() => handleToggle(index)}
              className="bg-primary/10 rounded-md p-2 flex justify-between hover:bg-primary/20 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-primary text-[0.65rem] md:text-xs font-medium">
                  {module.moduleTitle}
                </h3>
                <p className="text-[0.65rem] mt-1 text-gray-600">
                  {module.totalVideos} videos
                </p>
              </div>

              {showDetails === index ? (
                <CiCircleChevUp size={24} className="text-primary flex-shrink-0" />
              ) : (
                <CiCircleChevDown size={24} className="text-primary flex-shrink-0" />
              )}
            </div>

            {/* Details */}
            {showDetails === index && (
              <div className="bg-primary/5 rounded-md p-2">
                <div className="flex flex-col gap-1">
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson, lessonIndex) => (
                      <div
                        onClick={() => displayDetails(module.moduleTitle, lesson.title)}
                        key={lessonIndex}
                        className="flex items-center gap-2 text-[0.65rem] md:text-xs hover:text-primary duration-300 cursor-pointer p-2 rounded hover:bg-primary/10"
                      >
                        <span className="font-medium text-primary min-w-[20px]">
                          {lessonIndex + 1}:
                        </span>
                        <p className="flex-1">{lesson.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-[0.65rem] p-2">
                      No lessons available
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;