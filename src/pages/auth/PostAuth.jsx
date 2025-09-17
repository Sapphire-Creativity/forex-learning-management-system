import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostAuth = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 10;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const role = user?.unsafeMetadata?.role;
    const onboarded = user?.unsafeMetadata?.onboarded;

    if (role === "mentor") {
      navigate("/mentor");
    } else if (role === "student") {
      if (!onboarded) {
        navigate("/onboarding");
      } else {
        navigate("/student");
      }
    } else {
      navigate("/auth");
    }
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 text-lg font-medium">
        Redirecting... {progress}%
      </p>
    </div>
  );
};

export default PostAuth;
