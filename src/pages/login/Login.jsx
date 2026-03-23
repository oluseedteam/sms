import React from "react";
import logo from "../../assets/images/logo.png";


export default function Login() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200">
      
      {/* Container */}
      <div className="w-[90%] max-w-6xl h-[90vh] bg-white rounded-xl shadow-lg flex overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center relative">
          
          {/* Logo */}
          <div className="mb-10">
            <div className="w-20 h-20 bg-white rounded flex items-center justify-center text-blue-700 font-bold">
              <img src={logo} alt="" className="w-full h-full object-cover" />
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

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          
          <div className="bg-white p-8 rounded-xl shadow-md w-[80%] max-w-md">
            
            <h2 className="text-lg font-semibold mb-2 text-blue-700">
              Sign in to your account
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Please make sure all details provided are correct
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
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Type your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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