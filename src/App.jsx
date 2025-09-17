import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import NotFound from "../src/pages/NotFound";

// Student
import StudentLayout from "../src/layout/StudentLayout";
import StudentDashboard from "../src/pages/dashboards/StudentDashboard";
import StudentRequest from "../src/pages/student/StudentRequest";
import StudentProfile from "../src/pages/student/StudentProfile";
import StudentCourses from "../src/pages/student/StudentCourses";
import StudentQuizzes from "../src/pages/student/StudentQuizzes";

// Mentor
import MentorLayout from "../src/layout/MentorLayout";
import MentorDashboard from "../src/pages/dashboards/MentorDashboard";
import MentorRequest from "../src/pages/mentor/MentorRequest";
import MentorProfile from "../src/pages/mentor/MentorProfile";
import MentorCourses from "../src/pages/mentor/MentorCourses";
import MentorQuizzes from "../src/pages/mentor/MentorQuizzes";

import Navbar from "./components/Navbar";
import OnboardingPage from "./pages/Onboarding";
import AuthPage from "./pages/auth/AuthPage";
import PostAuth from "./pages/auth/PostAuth";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";

// 🔒 ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;

  // role-based guard
  if (role && user?.unsafeMetadata?.role !== role) {
    return <AuthPage />; // fallback if wrong role
  }

  return children;
};

const App = () => {
  return (
    <>
      {/* Optional: global navbar */}
      {/* <Navbar /> */}

      <Routes>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="auth" element={<AuthPage />} />

        {/* Auth-related routes */}
        <Route
          path="post-auth"
          element={
            <>
              <SignedIn>
                <PostAuth />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }
        />
        <Route
          path="onboarding"
          element={
            <>
              <SignedIn>
                <OnboardingPage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="student-courses" element={<StudentCourses />} />
          <Route path="student-quizzes" element={<StudentQuizzes />} />
          <Route path="student-request" element={<StudentRequest />} />
          <Route path="student-profile" element={<StudentProfile />} />
        </Route>

        {/* Mentor Dashboard */}
        <Route
          path="/mentor"
          element={
            <ProtectedRoute role="mentor">
              <MentorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MentorDashboard />} />
          <Route path="mentor-courses" element={<MentorCourses />} />
          <Route path="mentor-quizzes" element={<MentorQuizzes />} />
          <Route path="mentor-request" element={<MentorRequest />} />
          <Route path="mentor-profile" element={<MentorProfile />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
