import React from "react";
import { Outlet } from "react-router-dom";

const MentorLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MentorLayout;
