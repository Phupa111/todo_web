import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Organize Your Life with <span className="text-yellow-300">To-Do</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          The easiest and most powerful way to manage your tasks, stay
          productive, and get things done — anytime, anywhere.
        </p>
        <Link to="/login">
          {" "}
          <button className="bg-yellow-300 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-300">
            Get Started
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why TaskFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-2">Simple Interface</h3>
              <p>
                Easily add, edit, and track tasks with a beautiful and clean UI.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-2">Cross-Device Sync</h3>
              <p>
                Access your tasks on mobile, tablet, or desktop without missing
                a beat.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-2">Stay Motivated</h3>
              <p>
                Daily reminders and streak tracking keep you on top of your
                goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
