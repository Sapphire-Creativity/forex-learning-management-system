import React, { useState, useEffect } from "react";
import moment from "moment";

export default function CurrentDateTime() {
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-end w-full px-3 py-1">
      <span className="text-[10px] font-medium text-gray-600 tracking-wide">
        {dateTime.format("dddd, MMMM Do YYYY — h:mm:ss A")}
      </span>
    </div>
  );
}
