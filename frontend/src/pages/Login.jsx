import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            Sign In
          </h2>
          <p className="text-slate-500 font-medium">
            Continue your professional development journey
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="text-slate-700 font-bold mb-2 block"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
              placeholder="fake@example.com"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="text-slate-700 font-bold mb-2 block"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded-lg cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <a
              href="#"
              className="text-emerald-600 hover:text-emerald-500"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
           <p className="text-center text-slate-500 text-sm mb-4">
             New to the platform? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Register Now</Link>
           </p>
           <div className="text-center">
              <Link
                to="/admin/login"
                className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
              >
                Admin Access Portal →
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
