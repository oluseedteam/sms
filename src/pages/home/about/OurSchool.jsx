import React from 'react'
import pathtoschool from "../../../assets/images/welcome_image_3.png";
import { motion } from "motion/react";

const OurSchool = () => {
  return (
    <motion.section className="bg-slate-50 py-16 px-4 md:px-8 lg:px-16 font-Dm-sans"
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Image Container */}
        <div className="relative group">
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src={pathtoschool}
              alt="School Administrator working"
              className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
            <span className="text-white text-xs font-bold uppercase tracking-wider">Education Excellence</span>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            About Our School
          </h2>

          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              We are a forward-thinking educational institution providing quality
              <span className="font-semibold text-slate-800"> Primary and Secondary education</span> in a safe, structured, and inspiring
              learning environment. Our goal is to develop students who are
              academically strong, morally grounded, and socially responsible.
            </p>

            <p>
              We believe education should shape both the mind and character. That
              is why our programs combine academic excellence, discipline,
              creativity, leadership development, and life skills.
            </p>

            <p>
              From early foundational learning to senior academic preparation,
              we guide every learner through a clear path of growth and achievement.
            </p>
          </div>


          <div className="pt-4">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors shadow-lg">
              Learn More
            </button>
          </div>
        </div>

      </div>
    </motion.section>
  )
}

export default OurSchool