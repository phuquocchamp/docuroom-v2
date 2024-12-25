import { GoBell } from "react-icons/go";
import { TbMessageFilled } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import UserProfile from "./UserProfile";

function Header() {
  return (
    <div className="flex items-center justify-between p-4 px-10 flex-wrap">
      {/* Welcome Text */}
      <div className="w-full sm:w-auto">
        <h1 className="text-xl font-semibold text-blue-600">Welcome back, Khanh Linh!</h1>
      </div>

      {/* Search Bar and Buttons */}
      <div className="flex items-center space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
        {/* Search Bar */}
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-indigo-600 w-full sm:w-96">
          <CiSearch className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-gray-700 w-full"
          />
        </div>

        {/* Notification and Message Buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-white rounded-full shadow text-gray-600 hover:bg-gray-200">
            <GoBell size={24} />
          </button>

          <button className="p-2 bg-white rounded-full shadow text-gray-600 hover:bg-gray-200">
            <TbMessageFilled size={24} />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
}

export default Header;
