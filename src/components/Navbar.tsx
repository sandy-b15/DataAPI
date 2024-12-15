import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LogOut, Database } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, setUser } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // // Don't show navbar on login/signup pages
  // if (['/login', '/signup'].includes(location.pathname)) {
  //   return null;
  // }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-indigo-600" />
            <Link to="/" className="ml-2 font-bold text-xl text-gray-800">
              DataAPI Platform
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/api-docs"
                  className="text-gray-600 hover:text-gray-900"
                >
                  API Docs
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
