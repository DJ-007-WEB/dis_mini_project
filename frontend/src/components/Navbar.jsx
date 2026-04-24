import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin, user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[100] bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-xl">L</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                LearnHub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className={`text-sm font-bold uppercase tracking-wider transition-all ${
                isActive("/courses")
                  ? "text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                {!isAdmin ? (
                  <Link
                    to="/dashboard"
                    className={`text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive("/dashboard")
                        ? "text-emerald-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    My Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className={`text-sm font-bold uppercase tracking-wider transition-all ${
                        isActive("/admin/dashboard")
                          ? "text-emerald-400"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Admin Panel
                    </Link>
                    <Link
                      to="/reports"
                      className={`text-sm font-bold uppercase tracking-wider transition-all ${
                        isActive("/reports")
                          ? "text-emerald-400"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Analytics
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                  <span className="text-xs font-medium text-slate-500">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500 transition-all border border-slate-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/admin/login"
                  className="text-slate-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Admin
                </Link>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-bold text-sm transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
