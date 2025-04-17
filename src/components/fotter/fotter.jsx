import React, { useState } from "react";
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          {/* Logo / Brand */}
          <div className="flex flex-row">
            <h1 className="text-xl font-bold text-white pr-4">Conatact</h1>
            <div className="text-xl font-bold text-blue-400">
              {" "}
              soravit.stws@gmail.com
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
