import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./assets/Logo.png";

// Minimal Navbar Component (for login, register, set-password)
const MinimalNavbar = ({ fontColor = "text-neutral-950" , isLogo=true, titleweight="bold"}) => (
  <nav className="glassmorphism fixed top-0 w-full z-50">
    <div className="container mx-auto flex justify-between items-center py-1 px-6">
      {/* Logo / Brand */}
      <div className={`flex items-center font-${titleweight} text-3xl ${fontColor}`}>
        {isLogo && <img 
          src={Logo} 
          alt="Logo" 
          className="aspect-square w-14 mr-2 drop-shadow-xl" 
        />}
        <NavLink to="/">T&P FTE</NavLink>
      </div>

      {/* Help Link */}
      <div>
        <NavLink 
          to="/help" 
          className={`text-lg font-medium hover:text-gray-900 ${fontColor}`}
        >
          Need Help?
        </NavLink>
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

export default MinimalNavbar;
