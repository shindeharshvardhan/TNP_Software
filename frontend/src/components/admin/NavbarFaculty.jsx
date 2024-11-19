import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavbarFaculty() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-neutral-950 hover:text-blue-500"
        >
          T&P FTE
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/faculty-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faculty-dashboard/assigncompanies"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Assign Coordinators
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faculty-dashboard/companylist"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Company Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faculty-dashboard/past"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Past year Company
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/details"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-700 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400 focus:outline-none"
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarFaculty;
