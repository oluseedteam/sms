import React from "react";
import logo from "../../assets/images/logo.png";
import { motion } from "motion/react";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-4">
      
      {/* Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl md:h-[90vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 md:p-10 flex flex-col justify-center relative text-center md:text-left">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 md:mb-10 flex justify-center md:justify-start"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded flex items-center justify-center text-blue-700 font-bold overflow-hidden">
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-4xl font-semibold leading-snug"
          >
            Shaping Young Minds.
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-yellow-400"
          >
            Building Future
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-2xl md:text-4xl font-semibold"
          >
            Leaders.
          </motion.h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 py-10 md:py-0">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-[90%] md:max-w-md mx-auto"
          >
            
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-700 text-center md:text-left">
              Sign in to your account
            </h2>

            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
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
              <a href="#" className="text-sm text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Continue
            </motion.button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social buttons */}
            <div className="flex justify-center gap-4 mb-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition"
              >
                G
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition"
              >
                
              </motion.button>
            </div>

            {/* Sign up */}
            <p className="text-sm text-center">
              I don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline font-medium">
                Sign Up
              </span>
            </p>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}