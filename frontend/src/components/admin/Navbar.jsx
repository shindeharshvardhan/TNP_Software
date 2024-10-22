import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar pt-3 pl-16 pr-16 text-neutral-950">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-2xl">
          T&P FTE
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <NavLink
              to="/"
              activeclassname="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              activeclassname="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Coordinators
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/details"
              activeclassname="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle mx-2">
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
        {/* <NavLink
          className="btn rounded-full text-lg text-slate-100 bg-neutral-950"
          to="/login"
        >
          Sign up / Log in
        </NavLink> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar hover:bg-transparent"
          >
            <div className="w-14 rounded-full transition-transform duration-200 hover:scale-110">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-neutral-950 rounded-box z-[100] mt-3 w-52 p-2 shadow"
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
