import { FiSearch, FiBell } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import Badge from "@mui/material/Badge";
import CurrentDateTime from "../components/DateTime";

const Topbar = ({ toggleSideBar, isActive }) => {
  return (
    <header className="flex items-center justify-between bg-white  p-2 md:px-6">
      {/* Left Section - Menu & DateTime */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={toggleSideBar}
          className="hidden md:block p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <IoMenu className="text-2xl text-gray-600" />
        </button>

        <div className="hidden sm:block">
          <CurrentDateTime className="text-sm md:text-base" />
        </div>
      </div>

      {/* Middle Section - Search (hidden on small screens) */}
      {/* <div className="hidden md:flex items-center bg-gray-50 rounded-full px-3 py-1.5 w-72 border border-gray-200 focus-within:border-primary transition-colors">
        <FiSearch className="text-gray-500 mr-2 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-400"
        />
      </div> */}

      {/* Right Section - Icons & Profile */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Mobile Search Button (visible only on small screens) */}
        <button className="md:hidden p-1.5 rounded-full hover:bg-gray-100">
          <FiSearch className="text-xl text-gray-600" />
        </button>

        {/* Notification */}
        <button className="relative p-1.5 rounded-full hover:bg-gray-100">
          <Badge
            color="error"
            variant="dot"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                right: 4,
                top: 4,
                backgroundColor: "#ff5722",
              },
            }}
          >
            <FiBell className="text-xl text-gray-600" />
          </Badge>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-primary object-cover"
          />
          {/* <span className="hidden lg:inline text-sm font-medium text-gray-700">
            John Doe
          </span> */}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
