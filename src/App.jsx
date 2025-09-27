import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import NotFound from "../src/pages/NotFound";
import SamplePage from "../src/pages/SamplePage";

// Student
import StudentLayout from "../src/layout/StudentLayout";
import StudentDashboard from "../src/pages/dashboards/StudentDashboard";
import StudentRequest from "../src/pages/student/StudentRequest";
import StudentProfile from "../src/pages/student/StudentProfile";
import StudentCourses from "../src/pages/student/StudentCourses";
import StudentQuizzes from "../src/pages/student/StudentQuizzes";
import StudentChatroom from "../src/pages/student/StudentChatroom";

// Mentor
import MentorLayout from "../src/layout/MentorLayout";
import MentorDashboard from "../src/pages/dashboards/MentorDashboard";
import MentorRequest from "../src/pages/mentor/MentorRequest";
import MentorProfile from "../src/pages/mentor/MentorProfile";
import MentorCourses from "../src/pages/mentor/MentorCourses";
import MentorQuizzes from "../src/pages/mentor/MentorQuizzes";
import MentorChatroom from "../src/pages/mentor/MentorChatRoom";

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
import EmailVerification from "./components/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔒 ProtectedRoute component
// 🔒 Fixed ProtectedRoute component
const ProtectedRoute = ({ children, role, requireAuth = true }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  // Show loading while Clerk is initializing
  // if (!isLoaded) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // If this route requires authentication but user is not signed in
  if (requireAuth && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // If this route should NOT be accessible to authenticated users (auth pages)
  if (!requireAuth && isSignedIn) {
    // Redirect to appropriate dashboard based on user's actual role
    const userRole = user?.unsafeMetadata?.role;
    if (userRole === "mentor") {
      return <Navigate to="/mentor" replace />;
    } else if (userRole === "student") {
      return <Navigate to="/student" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }

  // Role-based protection for authenticated users
  if (requireAuth && role && user?.unsafeMetadata?.role !== role) {
    // User is authenticated but doesn't have the required role
    const userRole = user?.unsafeMetadata?.role;

    // Redirect user to their actual dashboard
    if (userRole === "mentor") {
      return <Navigate to="/mentor" replace />;
    } else if (userRole === "student") {
      return <Navigate to="/student" replace />;
    } else {
      // User has no role assigned, send to role selection
      return <Navigate to="/auth" replace />;
    }
  }

  return children;
};

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="/sample" element={<SamplePage />} />

        {/* Auth routes - protected from authenticated users */}
        <Route
          path="login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="auth"
          element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          }
        />

        <Route path="verify-email" element={<EmailVerification />} />

        {/* Auth-related routes - require authentication */}
        <Route
          path="post-auth"
          element={
            <ProtectedRoute>
              <PostAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard - requires student role */}
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
          <Route path="student-chatroom" element={<StudentChatroom />} />
        </Route>

        {/* Mentor Dashboard - requires mentor role */}
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
          <Route path="mentor-chatroom" element={<MentorChatroom />} />
          <Route path="mentor-profile" element={<MentorProfile />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
