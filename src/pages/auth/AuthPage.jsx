import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../../components/EmailVerification";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

const AuthPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }

    if (!isLoaded) {
      return;
    }

    console.log("initialized!");

    setLoading(true);
    const toastId = toast.loading("⏳ Creating account...");
    try {
      await signUp.create({
        firstName: formData.firstname,
        lastName: formData.lastname,
        emailAddress: formData.email,
        password: formData.password,
        unsafeMetadata: {
          role: formData.role,
          onboarded: false,
        },
      });

      console.log("process 1 executed");

      // request email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.update(toastId, {
        render: "🎉 Sign up successful 🎉 Please check your email to verify!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        setPendingVerification(true);
      }, 2000);

      //
      console.log("process 2 executed");
    } catch (error) {
      console.log("sign up error: ", error.errors);
      toast.update(toastId, {
        render:
          error.errors?.[0]?.message || "Something went wrong during signup.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      const message =
        error?.errors?.[0]?.message || "Something went wrong during signup.";

      toast.error(message);

      setErrors({ general: message }); // ✅ set general error
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // 🔥 Force Clerk to sync metadata before redirecting
        await signUp.reload();

        setMessage("Email verified successfully!");
        navigate("/post-auth", { replace: true });
      }
    } catch (error) {
      console.error("Verification error: ", error.errors);
      setError(
        error.errors?.[0]?.longMessage ||
          "Invalid verification code. Please try again."
      );
    }
  };

  const resendSignUpCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setMessage("Verification code resent to your email.");
    } catch (error) {
      console.error("Resend error:", error);
      setError("Failed to resend code.");
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google sign in initiated");
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/post-auth",
        redirectUrlComplete: "/post-auth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

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
                  Create your account to get started
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
                    I want to join as a:
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

                <div className="flex flex-col w-full relative">
                  {/* Icon */}
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

                  {/* Input */}
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-4 pl-10 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your First Name"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col w-full relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    required
                    onChange={handleChange}
                    className="w-full border rounded-xl p-4 pl-10 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your Last Name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full relative mt-4">
                  <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    required
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

                {/* Password */}
                <div className="flex flex-col w-full relative mt-4">
                  <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border rounded-xl p-4 pl-10 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.password ? "border-red-500" : "border-gray-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col w-full relative mt-4"
                  >
                    <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full border pl-10 text-sm ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-500"
                      } rounded-xl p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/*  */}
                {errors.general && (
                  <p className="text-red-500 text-xs mt-1">{errors.general}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full p-4 bg-primary   text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-700"
                  // className={`w-full flex items-center justify-center p-2 rounded text-white ${
                  //   loading
                  //     ? "bg-gray-400 cursor-not-allowed"
                  //     : "bg-blue-600 hover:bg-blue-700"
                  // }`}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign Up"
                  )}
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

              <div className="text-center ">
                <p className="text-gray-600 text-sm">
                  Already have an account?
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="ml-2 text-primary font-medium"
                  >
                    Sign In
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
            setCode={setCode}
            handleVerification={handleSignUpVerification} // ✅ renamed
            resendCode={resendSignUpCode}
            message={message}
            error={error}
          />
        )}
      </section>
    </>
  );
};

export default AuthPage;
