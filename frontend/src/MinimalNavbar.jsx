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
      </div>
    </div>
  </nav>
);

export default MinimalNavbar;
