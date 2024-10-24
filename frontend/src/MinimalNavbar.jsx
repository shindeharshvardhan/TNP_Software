import React from "react";
import { NavLink } from "react-router-dom";

// Minimal Navbar Component (for login, register, set-password)
const MinimalNavbar = () => (
  <nav className="glassmorphism">
    <div className="container mx-auto flex justify-between items-center py-2 px-6">
      {/* Logo / Brand */}
      <div className="font-bold text-3xl text-gray-800">
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
