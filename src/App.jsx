import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import NotFound from "../src/pages/NotFound";
//
import StudentLayout from "../src/layout/StudentLayout";
import StudentDashboard from "../src/pages/dashboards/StudentDashboard";
import StudentRequest from "../src/pages/student/StudentRequest";
import StudentProfile from "../src/pages/student/StudentProfile";
import StudentCourses from "../src/pages/student/StudentCourses";
import StudentQuizzes from "../src/pages/student/StudentQuizzes";

//

import MentorLayout from "../src/layout/MentorLayout";
import MentorDashboard from "../src/pages/dashboards/MentorDashboard";
import MentorRequest from "../src/pages/mentor/MentorRequest";
import MentorProfile from "../src/pages/mentor/MentorProfile";
import MentorCourses from "../src/pages/mentor/MentorCourses";
import MentorQuizzes from "../src/pages/mentor/MentorQuizzes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        {/* Other pages */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Student Dashboard Pages  */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="student-courses" element={<StudentCourses />} />
          <Route path="student-quizzes" element={<StudentQuizzes />} />
          <Route path="student-request" element={<StudentRequest />} />
          <Route path="student-profile" element={<StudentProfile />} />
        </Route>

        {/* Mentor Dashboard Pages */}
        <Route path="/mentor" element={<MentorLayout />}>
          <Route index element={<MentorDashboard />} />
          <Route path="mentor-courses" element={<MentorCourses />} />
          <Route path="mentor-quizzes" element={<MentorQuizzes />} />
          <Route path="mentor-request" element={<MentorRequest />} />
          <Route path="mentor-profile" element={<MentorProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
