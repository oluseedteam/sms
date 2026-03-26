import React, { useState, useEffect } from "react";
// import logo from "../../assets/images/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200">
      
      {/* Container */}
      <div className="w-[90%] max-w-6xl h-[90vh] bg-white rounded-xl shadow-lg flex overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center relative">
          
          {/* Logo */}
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              {/* Replace with: <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl" /> */}
              <span className="text-blue-700 font-extrabold text-xl">S</span>
            </div>
          </div>

          {/* Text */}
          <h1 className="text-4xl font-semibold leading-snug">
            Shaping Young Minds.
          </h1>
          <h1 className="text-4xl font-bold text-yellow-400">
            Building Future
          </h1>
          <h1 className="text-4xl font-semibold">
            Leaders.
          </h1>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-sm">

            <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
            <p className="text-sm text-slate-400 mb-8">
              Enter your credentials to access your account.
            </p>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-medium">Email / School ID</label>
              <input
                type="text"
                placeholder="Type a valid email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.05] border border-white/[0.08] text-white placeholder-slate-500 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-red-500">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
              Continue
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-1" />
            </div>

            {/* Social buttons */}
            <div className="flex justify-center gap-4 mb-4">
              <button className="p-2 border rounded-lg hover:bg-gray-100">
                G
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-100">
                
              </button>
            </div>

            {/* Sign up */}
            <p className="text-sm text-center">
              I don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer">
                Sign Up
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}