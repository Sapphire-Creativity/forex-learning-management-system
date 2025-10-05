import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PostAuth = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoaded || progress < 100) return;

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      // ✅ Force latest user data
      await user.reload();

      const emailVerified =
        user?.primaryEmailAddress?.verification?.status === "verified";

      if (!emailVerified) {
        navigate("/verify-email", { replace: true });
        return;
      }

      const role = user?.unsafeMetadata?.role;
      const onboarded = user?.unsafeMetadata?.onboarded;

      console.log("🧭 role:", role, "| onboarded:", onboarded);

      if (role === "mentor") {
        navigate("/mentor", { replace: true });
      } else if (role === "student") {
        if (onboarded === undefined || onboarded === false) {
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/student", { replace: true });
        }
      } else {
        navigate("/auth", { replace: true });
      }
    };

    const timer = setTimeout(handleRedirect, 600);
    return () => clearTimeout(timer);
  }, [isLoaded, progress, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-primary to-primary-dark text-white">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Sapph'reFX
      </motion.h1>

      <motion.div
        className="flex items-center justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 0.6 },
          rotate: { repeat: Infinity, duration: 1, ease: "linear" },
        }}
      >
        <Loader2 size={50} className="text-white" />
      </motion.div>

      <div className="w-64 bg-white/20 rounded-full h-2 mb-4 overflow-hidden shadow-lg">
        <motion.div
          className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </div>

      <motion.p
        className="text-white/90 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Loading... {progress}%
      </motion.p>
    </div>
  );
};

export default PostAuth;
