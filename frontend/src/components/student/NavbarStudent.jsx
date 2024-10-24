// import React from 'react'

// function NavbarStudent() {
//   return (
//     <>
//       <div className="navbar bg-base-100 shadow-xl md:px-16">
//         <div className="flex-1">
//           <a className="btn btn-ghost text-2xl">TNP FTE</a>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal md:text-xl px-1">
//             <li><a>Students</a></li>
//             <li><a>Coordinators</a></li>
//             <li><a>Faculty</a></li>
//           </ul>
//         </div>
//         <div className="flex-none">
//           <button className="btn btn-ghost btn-circle mx-2">
//             <div className="indicator">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//               </svg>
//               <span className="badge badge-xs badge-primary indicator-item"></span>
//             </div>
//           </button>
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-md dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li>
//                 <a className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </a>
//               </li>
//               <li><a>Settings</a></li>
//               <li><a>Logout</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default NavbarStudent



import React from "react";
import { NavLink } from "react-router-dom";

function NavbarStudent() {
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
                activeClassName="underline"
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
                activeClassName="underline"
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
              to="/student_registration"
              activeClassName="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Student
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coordinator"
              activeClassName="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
               Coordinator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              activeClassName="underline"
              className={({ isActive }) => (isActive ? "underline-link" : "")}
            >
              Admin
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

export default NavbarStudent;
