import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut(() => {
      navigate("/login");
    });
  };
  return (
    <div>
      Student Dashboard
      <button onClick={handleSignOut} className="btn btn-primary">
        sign out
      </button>
    </div>
  );
};

export default StudentDashboard;
