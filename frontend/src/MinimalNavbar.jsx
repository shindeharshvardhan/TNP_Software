import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Minimal Navbar Component (for login, register, set-password)
const MinimalNavbar = () => (
  <div
    id="glass-navbar"
    className="navbar pt-3 pl-16 pr-16 text-neutral-950 bg-white"
  >
    <div className="navbar-start font-semibold">
      <NavLink to="/" className="btn btn-ghost text-3xl">
        T&P FTE
      </NavLink>
    </div>

    <div className="navbar-end">
      <NavLink to="/help" className="btn btn-ghost text-lg">
        Need Help?
      </NavLink>
    </div>
  </div>
);

export default MinimalNavbar;