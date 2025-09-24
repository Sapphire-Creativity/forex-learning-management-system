import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../../components/EmailVerification";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
   const { isSignedIn, user } = useUser();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add this useEffect to your Login component
  useEffect(() => {
    // Redirect already authenticated users
    if (isSignedIn && user) {
      const role = user.unsafeMetadata?.role;
      const onboarded = user.unsafeMetadata?.onboarded;

      if (role === "mentor") {
        navigate("/mentor", { replace: true });
      } else if (role === "student") {
        navigate(onboarded ? "/student" : "/onboarding", { replace: true });
      } else {
        navigate("/auth", { replace: true });
      }
    }
  }, [isSignedIn, user, navigate]);

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }

    setLoading(true);
    const toastId = toast.loading("⏳ Logging you in...");

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      console.log(result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        toast.update(toastId, {
          render: "🎉 Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/post-auth", { replace: true });
        }, 2000);
      } else {
        console.log("Unexpected login status:", result);
        toast.update(toastId, {
          render: "⚠️ Unexpected login status",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Sign in error: ", error);

      // 🔥 CRITICAL: Handle "session already exists" error
      if (error.errors?.[0]?.code === "session_exists") {
        try {
          // Try to set the existing session as active
          await setActive({ session: error.meta.sessionId });

          toast.update(toastId, {
            render: "🔁 Resumed existing session",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/post-auth", { replace: true });
          }, 1000);
        } catch (setActiveError) {
          console.error("Failed to set active session:", setActiveError);
          toast.update(toastId, {
            render: "❌ Session conflict - please try again",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        // Regular error handling
        toast.update(toastId, {
          render: error.errors?.[0]?.message || "❌ Login failed!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        const message =
          error.errors?.[0]?.message || "Login failed. Please try again.";
        setErrors({ general: message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      //
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        setMessage("Email verified successfully!");
        navigate("/post-auth");
      } else {
        setError("Unexpected verification state");
      }
    } catch (error) {
      console.error("Verification error: ", error.errors);
      setError(
        error.errors?.[0]?.longMessage ||
          "Invalid verification code. Please try again."
      );
    }
  };

  const resendCode = async () => {
    try {
      await signIn.prepareFirstFactor({
        strategy: "email_code",
      });
      setMessage("Verification code resent to your email.");
    } catch (error) {
      console.error("Resend error:", error);
      setError("Failed to resend code.");
    }
  };

  const handleGoogleSignIn = async () => {};

  return (
    <>
      <section className="min-h-screen flex items-center justify-center p-4">
        {!pendingVerification ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-2xl w-full max-w-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-2 text-primary"
                >
                  Sapph'reFX
                </motion.h1>
                <p className="text-gray-600">
                  Sign in to continue your journey
                </p>
              </div>

              {/* Role Selection */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3"
                >
                  <label className="block text-sm font-medium text-gray-600 mb-3">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({ ...formData, role: "student" })
                      }
                      className={`py-3 rounded-xl border-2 transition-all ${
                        formData.role === "student"
                          ? "border-primary"
                          : "border-gray-600 hover:border-primary"
                      }`}
                    >
                      <div className="text-2xl mb-1">🎓</div>
                      Student
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({ ...formData, role: "mentor" })
                      }
                      className={`py-3 rounded-xl border-2 transition-all ${
                        formData.role === "mentor"
                          ? "border-primary"
                          : "border-gray-600 hover:border-primary"
                      }`}
                    >
                      <div className="text-2xl mb-1">👨‍🏫</div>
                      Mentor
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              <form onSubmit={handleSubmit} className=" ">
                {/*  */}
                <div className="flex flex-col w-full relative mt-4">
                  <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border text-gray-500 rounded-xl p-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.email ? "border-red-500" : "border-gray-500"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col w-full relative mt-4">
                  <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border rounded-xl p-4 pl-10 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.password ? "border-red-500" : "border-gray-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <p className="text-primary-dark text-xs">Forgot Password?</p>

                {errors.general && (
                  <p className="mt-1 text-xs text-red-400">{errors.general}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full p-4 bg-primary   text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-700"
                >
                  Sign In
                </motion.button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-700"></div>
                <div className="px-3 text-gray-400">or</div>
                <div className="flex-1 border-t border-gray-700"></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 bg-white text-gray-800 font-medium rounded-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </motion.button>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="ml-2 text-primary font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          </motion.div>
        ) : (
          <EmailVerification
            code={code}
            resendCode={resendCode}
            setCode={setCode}
            error={error}
            message={message}
            handleVerification={handleVerification}
          />
        )}
      </section>
    </>
  );
};

export default Login;
