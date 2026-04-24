import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await adminLogin(email, password);
    setIsLoading(false);
    if (success) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            Admin Portal
          </h2>
          <p className="text-slate-500 font-medium">
            Access system management & analytics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="text-slate-700 font-bold mb-2 block">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@lms.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
            />
          </div>
          <div className="form-group">
            <label className="text-slate-700 font-bold mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-200"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Sign In as Admin"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Not an administrator?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-bold hover:underline"
            >
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
