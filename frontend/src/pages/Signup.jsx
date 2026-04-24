import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 font-medium">
            Join a community of high-performance learners
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="name"
              className="text-slate-700 font-bold mb-2 block"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
              placeholder="John Doe"
            />
          </div>

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
              Secure Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
          >
            Register Student Profile
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-emerald-600 font-bold hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
