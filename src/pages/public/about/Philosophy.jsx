import React from 'react';
import rectangular from "../../../assets/images/rectangular_school_collage.png";
import { motion } from "motion/react";

const Philosophy = () => {
  return (
     <motion.section
          className="relative min-h-screen  flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${rectangular})` }}
          initial={{opacity: 0, y:100}}
          transition={{duration: 1.5}}
          whileInView={{opacity: 1, y:0}}
          viewport={{once: false}}
        >
          {/* Overlay for readability */}
          <div className="absolute blur-2xl inset-0 bg-[#0C236C4D] scale-110"></div>
    
          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 pt-15">
            <h1 className="text-4xl md:text-6xl font-semibold">
              Our Philosophy
            </h1>
            <p className="mt-4 max-w-4xl mx-auto md:text-lg text-[#DFE0E5] md:text-2xl text-lg">
              Every child can learn, grow, and excel when given the right environment, the right guidance, and the right encouragement. We focus on understanding how each student learns and provide support that helps them reach their full potential.
            </p>
            
            
            </div>
        </motion.section>
  )
}

export default Philosophy