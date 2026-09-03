import React from "react";
import backgroundImage from "../../../assets/images/image_1_com.jpg";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiAward, FiUsers, FiBookOpen, FiActivity } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa6";

const stats = [
  { icon: <FiAward className="text-amber-400 text-xl" />, value: "100%", label: "Exam Success Rate" },
  { icon: <FiUsers className="text-blue-400 text-xl" />, value: "15 : 1", label: "Student-to-Teacher Ratio" },
  { icon: <FiActivity className="text-emerald-400 text-xl" />, value: "30+", label: "Clubs & Sports Programs" },
  { icon: <FiBookOpen className="text-purple-400 text-xl" />, value: "15+", label: "Years of Educational Excellence" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden">
      {/* Background Image with fallback styling */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Multi-layered modern dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/85 via-[#0C1B33]/80 to-[#070F20]/95 backdrop-blur-[1px]" />

      {/* Subtle decorative glow accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/15 blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto flex flex-col items-center">
        
        {/* Academic Session Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md mb-6 shadow-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-300">
            Admissions Open 2025/2026 Academic Session
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] font-heading"
        >
          Empowering Young Minds. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Building Future Leaders.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
        >
          Delivering holistic education from Crèche to Senior Secondary with a world-class blend of Nigerian and International curricula, character formation, and 21st-century skills.
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/35 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Apply for Admission</span>
            <FiArrowRight className="text-lg" />
          </Link>


          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full border border-white/25 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FiCompass className="text-amber-400" />
            <span>Discover Our School</span>
          </Link>
        </motion.div>
      </div>

      {/* Floating Key Metrics / Statistics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 max-w-6xl mx-auto w-full mt-12"
      >
        <div className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-2">
                  {item.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

