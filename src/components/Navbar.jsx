import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  const handleNavClick = () => setIsMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "opacity-100 text-sm font-semibold"
      : "opacity-60 hover:opacity-100 transition-opacity duration-200 text-sm";

  return (
    <motion.header className="fixed top-0 left-0 w-full z-50 font-Dm-sans transition-colors duration-300"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
    >
      <nav
        className={`flex items-center justify-between px-6 py-3 rounded-full mx-5 my-5 md:mx-10 lg:mx-12 border transition-all duration-300
          ${scrolled
            ? "bg-white/90 border-white/30 text-black shadow-md"
            : "bg-[#FFFFFF14] border-[#FFFFFF33] text-white"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="GHRA logo" className="h-7 md:h-10 w-auto" />
        </div>

        {/* Mobile Hamburger — only shows when menu is CLOSED */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-2xl md:hidden hover:text-blue-400 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <FiMenu />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
          <NavLink to="/media" className={navLinkClass}>Media Room</NavLink>
        </ul>

        {/* Desktop Login */}
        <button className="hidden md:block text-white bg-[#1875F0] text-sm px-6 md:px-12 py-3 rounded-full font-bold hover:bg-blue-700">
          Login
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`md:hidden fixed inset-0 ${scrolled ? "bg-gray-800/95" : "bg-black/90"
            } backdrop-blur-sm flex flex-col justify-center items-center text-white z-50`}
        >
          {/* X button inside the overlay — always visible */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-7 right-8 text-3xl text-white hover:text-blue-400 focus:outline-none transition-colors duration-200"
            aria-label="Close navigation menu"
          >
            <FiX />
          </button>

          {/* Nav Links */}
          <ul className="flex flex-col gap-6 text-center mb-8">
            <NavLink to="/" className={navLinkClass} onClick={handleNavClick}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={handleNavClick}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={handleNavClick}>Contact Us</NavLink>
            <NavLink to="/media" className={navLinkClass} onClick={handleNavClick}>Media Room</NavLink>
          </ul>

          {/* Login */}
          <button className="w-40 bg-[#1875F0] py-3 rounded-full font-bold hover:bg-blue-700 text-white">
            Login
          </button>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;