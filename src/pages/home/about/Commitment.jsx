import React from 'react';
import studentinclass from "../../../assets/images/advantage_3.png";
import classroom from "../../../assets/images/advantage_3.png"
import outdor from "../../../assets/images/outdoor_play_and_writing.png";
import { motion } from "motion/react";

const Commitment = () => {
  return (
    <motion.section className="max-w-[1400px] mx-auto px-6 py-12 lg:py-20"
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

        {/* LEFT: Image Collage - Forced to be large and prominent */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Top Image: Large classroom shot */}
          <div className="w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src={studentinclass}
              alt="Students in a blue classroom"
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Bottom Row: Split images */}
          <div className="grid grid-cols-2 gap-4 h-[350px]">
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src={outdor}
                alt="Children playing on slide"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src={classroom}
                alt="Student reading a book"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-16 py-4">

          {/* Commitment to Parents */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-semibold text-slate-800 tracking-tight">
              Our Commitment to Parents
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              We believe education works best as a partnership between school and home.
              We keep parents informed through continuous progress reports, open
              communication channels, and scheduled engagement meetings.
              Parents are not observers — <span className="text-slate-800 font-medium">they are partners.</span>
            </p>
          </div>

          {/* Commitment to Students */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-semibold text-slate-800 tracking-tight">
              Our Commitment to Students
            </h2>
            <p className="text-xl text-slate-500">
              We provide a safe and supportive environment where students can:
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Ask questions freely",
                "Express creativity",
                "Build confidence",
                "Develop leadership",
                "Learn responsibility",
                "Achieve their best"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-lg text-slate-600">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-4 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </motion.section>
  )
}

export default Commitment