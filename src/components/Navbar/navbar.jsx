import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ใช้ไอคอนจาก lucide-react
import { Link } from "react-router-dom";
const NavbarApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">TaskFlow</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/">
              <a className="text-gray-700 hover:text-blue-600 transition">
                Home
              </a>
            </Link>
            <Link to="/">
              <a className="text-gray-700 hover:text-blue-600 transition">
                about
              </a>
            </Link>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-2 shadow-lg">
          <Link to="/">
            <a className="text-gray-700 hover:text-blue-600 transition">Home</a>
          </Link>
          <Link to="/">
            <a className="text-gray-700 hover:text-blue-600 transition">
              about
            </a>
          </Link>

          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </a>
          <Link to="/login">
            <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarApp;
