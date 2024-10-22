import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div id="glass-navbar" className="navbar pt-3 pl-16 pr-16 text-neutral-950">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg"
          >
            <li>
              <NavLink
                to="/students"
                activeclassname="underline"
                className={({ isActive }) =>
                  isActive
                    ? "underline decoration-black text-underline-offset-4"
                    : ""
                }
              >
                Follow Up
              </NavLink>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2 text-lg">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to="/companies"
                activeclassname="underline"
                className={({ isActive }) =>
                  isActive
                    ? "underline decoration-black text-underline-offset-4"
                    : ""
                }
              >
                Item 3
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-2xl">
          T&P FTE
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <NavLink
              to="/events"
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
              Follow Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/details"
              activeclassname="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Student Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/companies"
              activeclassname="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Companies
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
        <NavLink
          className="btn rounded-full text-lg text-slate-100 bg-neutral-950"
          to="/login"
        >
          Sign up / Log in
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
