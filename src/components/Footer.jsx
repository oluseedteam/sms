import React from 'react';
import logo from '../assets/images/logo.png';
import { BsTwitterX, BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import { FaLocationDot, FaEnvelope, FaPhone } from 'react-icons/fa6';
import { motion } from "motion/react";

const socialLinks = [
  { icon: <BsTwitterX />, href: '#', label: 'Twitter/X' },
  { icon: <BsFacebook />, href: '#', label: 'Facebook' },
  { icon: <BsInstagram />, href: '#', label: 'Instagram' },
  { icon: <BsYoutube />, href: '#', label: 'YouTube' },
]

const quickLinks = ['Home', 'About Us', 'Contact Us', 'Media Room']
const legalLinks = ['Terms of Use', 'Privacy Policy']


const Footer = () => {
  return (
    <motion.footer className="bg-[#05060f] text-white font-Dm-sans mt-10 relative overflow-hidden"
    initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
    >

      {/* Subtle top blue accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#1875F0] to-transparent" />

      {/* Blue glow blob — decorative */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#1875F0]/10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="GHRA School logo" className="h-10 w-10" />
            <p className="text-[#8b8fa8] text-sm leading-relaxed max-w-xs">
              Shaping Young Minds. Building Future Leaders.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-[#8b8fa8] hover:bg-[#1875F0] hover:border-[#1875F0] hover:text-white transition-all duration-200 text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1875F0]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#8b8fa8] hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-[#1875F0] transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1875F0]">
              Legal Terms
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#8b8fa8] hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-[#1875F0] transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1875F0]">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-[#8b8fa8]">
                <FaLocationDot className="text-[#1875F0] mt-0.5 shrink-0" />
                <span>123 School Drive, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-[#1875F0] shrink-0" />
                <a
                  href="mailto:hello@GHRASchool.com"
                  className="text-[#8b8fa8] hover:text-white transition-colors duration-200"
                >
                  hello@GHRASchool.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaPhone className="text-[#1875F0] shrink-0" />
                <a
                  href="tel:+23481"
                  className="text-[#8b8fa8] hover:text-white transition-colors duration-200"
                >
                  +234 (0) 81*******
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/8" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-xs text-[#555870]">
          <p>&copy; 2025 GHRA School. All rights reserved.</p>
          <p className="text-center">
            Designed with care for future leaders.
          </p>
        </div>

      </div>
    </motion.footer>
  )
}

export default Footer
