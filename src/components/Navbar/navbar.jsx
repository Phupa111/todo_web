import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react"; // ใช้ไอคอนจาก lucide-react
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const NavbarApp = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">To-DO</div>

          {/* Desktop Menu */}
          {!isLoggedIn && (
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
          )}

          {/* CTA Button */}
          {!isLoggedIn ? (
            <div className="hidden md:block">
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                {isLoading ? (
                  <>
                    <LogOut
                      size={20}
                      className="animate-spin inline-block mr-2"
                    />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut size={20} className="inline-block mr-2" />
                    Logout
                  </>
                )}
              </button>
            </div>
          )}

          {/* Hamburger Icon */}
          {!isLoggedIn && (
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-2 shadow-lg">
          {!isLoggedIn && (
            <>
              <Link
                to="/"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </>
          )}

          {!isLoggedIn ? (
            <Link to="/login">
              <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarApp;
