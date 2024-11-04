import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Navbar() {
  return (
    <nav className="glassmorphism fixed top-0 w-full z-50">
      <div className="mx-auto px-6 py-1 flex justify-between items-center h-16">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {/* Dropdown for mobile */}
          <ul className="absolute mt-2 bg-white shadow-lg rounded-lg w-48 text-lg">
            <li>
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  isActive
                    ? "underline-link font-semibold text-black"
                    : "text-gray-700"
                }
              >
                Follow Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/companies"
                className={({ isActive }) =>
                  isActive
                    ? "underline-link font-semibold text-black"
                    : "text-gray-700"
                }
              >
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cdashboard"
                className={({ isActive }) =>
                  isActive
                    ? "underline-link font-semibold text-black"
                    : "text-gray-700"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center font-bold text-3xl text-gray-800">
          <img src={Logo} alt="Logo" className="aspect-square w-14 mr-2" />
          <NavLink to="/">T&P FTE</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8">
          <NavLink
            to="/cdashboard"
            className={({ isActive }) =>
              isActive
                ? "underline-link font-semibold text-black"
                : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? "underline-link font-semibold text-black"
                : "text-gray-700"
            }
          >
            Follow Up
          </NavLink>
          <NavLink
            to="/details"
            className={({ isActive }) =>
              isActive
                ? "underline-link font-semibold text-black"
                : "text-gray-700"
            }
          >
            Student Details
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive
                ? "underline-link font-semibold text-black"
                : "text-gray-700"
            }
          >
            Companies
          </NavLink>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <button className="relative focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
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
          {/* </div> */}
        </button>
        <NavLink
          className="btn rounded-full text-lg text-slate-100 bg-neutral-950"
          to="/coordinator_login"
        >
          Sign up / Log in
        </NavLink>

        {/* Adding Admin login icon */} 
        <NavLink to="/admin/login" className="btn btn-ghost btn-circle mx-2">
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
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
        </NavLink>
      </div>
    </div>
    </nav>
  );
}

export default Navbar;
