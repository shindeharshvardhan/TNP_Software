import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./assets/Logo.png"

// Minimal Navbar Component (for login, register, set-password)
const MinimalNavbar = () => (
  <nav className="glassmorphism fixed top-0 w-full z-50">
    <div className="container mx-auto flex justify-between items-center py-1 px-6">
      {/* Logo / Brand */}
      <div className="flex items-center font-bold text-3xl text-gray-800">
        <img 
          src={Logo} 
          alt="Logo" 
          className="aspect-square w-14 mr-2" 
        />
        <NavLink to="/">T&P FTE</NavLink>
      </div>

      {/* Help Link */}
      <div>
        <NavLink to="/help" className="text-lg font-medium text-gray-600 hover:text-gray-900">
          Need Help?
        </NavLink>
      </div>
    </div>
  </nav>
);

export default MinimalNavbar;
