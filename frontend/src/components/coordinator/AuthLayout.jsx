import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen flex">
      {/* Left side (Content like Login/Register form) */}
      <div className="w-2/5 flex flex-col items-center justify-center p-8 text-neutral-900">
        {children}
      </div>

      {/* Right side (Background image) */}
      <div
        className="w-3/5 h-full bg-cover bg-right bg-no-repeat"
        id="bg-tnp"
      ></div>
    </div>
  );
}

export default AuthLayout;
