import React from 'react';
import playground from "../../../assets/images/welcome_image_1.png";
import classroom from "../../../assets/images/advantage_3.png";
import outdor from "../../../assets/images/outdoor_play_and_writing.png";
import { motion } from "motion/react";




const Vision = () => {
  return (
    <motion.div className="max-w-6xl mx-auto p-6 md:p-12 bg-white text-slate-800 font-Dm-sans"
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >

      {/* Top Section: Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Vision Card */}
        <div className="relative overflow-hidden rounded-2xl h-80 flex items-center bg-blue-900">
          <img
            src={playground}
            alt="Playground"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative p-8 text-white bg-black/20 backdrop-blur-sm w-full h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-sm leading-relaxed">
              To be a leading Primary and Secondary school recognized for academic excellence,
              strong values, and the consistent development of confident, capable future leaders.
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="relative overflow-hidden rounded-2xl h-80 flex items-center bg-blue-900">
          <img
            src={playground}
            alt="Students"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative p-8 text-white bg-black/20 backdrop-blur-sm w-full h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <ul className="space-y-2 list-disc list-inside text-sm opacity-95">
              <li>To deliver high-quality, well-structured education</li>
              <li>To build disciplined and responsible learners</li>
              <li>To develop critical thinking and problem-solving skills</li>
              <li>To nurture leadership and creativity</li>
              <li>To prepare students for higher education and lifelong success</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Core Values & Images */}
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left Column: Text Content */}
        <div className="space-y-12">
          {/* Core Values */}
          <section>
            <h2 className="text-3xl font-bold text-blue-950 mb-6 border-b-2 border-blue-100 pb-2">Our Core Values</h2>
            <div className="space-y-3">
              <p><span className="font-bold">Excellence —</span> We pursue high standards in teaching and learning</p>
              <p><span className="font-bold">Integrity —</span> We promote honesty and accountability</p>
              <p><span className="font-bold">Discipline —</span> We build self-control and responsibility</p>
              <p><span className="font-bold">Respect —</span> We value every learner and community member</p>
              <p><span className="font-bold">Growth —</span> We encourage continuous improvement</p>
              <p><span className="font-bold">Service —</span> We teach contribution to society</p>
            </div>
          </section>

          {/* Educational Approach */}
          <section>
            <h2 className="text-3xl font-bold text-blue-950 mb-6 border-b-2 border-blue-100 pb-2">Our Educational Approach</h2>
            <p className="mb-4 text-slate-600 italic">Our teaching model combines:</p>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
              <li>Structured curriculum delivery</li>
              <li>Interactive classroom engagement</li>
              <li>Practical and project-based learning</li>
              <li>Continuous assessment and feedback</li>
              <li>Technology-supported instruction</li>
              <li>Individual student support</li>
            </ul>
            <p className="mt-6 font-medium text-slate-800">
              We maintain small-to-moderate class sizes to ensure attention and quality instruction.
            </p>
          </section>
        </div>

        {/* Right Column: Stacked Images */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <img
              src={classroom}
              alt="Classroom activity"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <img
              src={outdor}
              alt="Outdoor play and writing"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default Vision
