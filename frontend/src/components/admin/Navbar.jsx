import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar flex justify-between items-center pt-3 px-16 text-neutral-950 shadow">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-2xl">
          T&P FTE
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}
            >
              Coordinators
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/details"
              className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="btn btn-ghost avatar cursor-pointer hover:bg-transparent"
          >
            <div className="w-10 rounded-full transition-transform duration-200 hover:scale-110">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          {dropdownOpen && (
            <ul
              className="menu menu-sm absolute right-0 bg-white text-neutral-950 rounded-box z-[1000] mt-3 w-52 p-2 shadow"
              onMouseLeave={() => setDropdownOpen(false)} // Close dropdown on mouse leave
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
