import React from 'react'
import rectangular from "../../../assets/images/rectangular_school_collage.png"

const Philosophy = () => {
  return (
     <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${rectangular})` }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-[#0C236C4D]"></div>
    
          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 pt-15">
            <h1 className="text-4xl md:text-6xl font-semibold">
              Our Philosophy
            </h1>
            <p className="mt-4 max-w-4xl mx-auto md:text-lg text-[#DFE0E5] md:text-2xl text-lg">
              Every child can learn, grow, and excel when given the right environment, the right guidance, and the right encouragement. We focus on understanding how each student learns and provide support that helps them reach their full potential.
            </p>
            
            
            </div>
        </section>
  )
}

export default Philosophy