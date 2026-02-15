import React from "react";
import backgroundImage from "../../assets/images/image_1.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#0C236C4D]"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 pt-15">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Shaping Young Minds. <span className="text-[#FEDD00]"> Building Future</span> Leaders.
        </h1>
        <p className="mt-4 max-w-xl mx-auto md:text-lg text-[#DFE0E5]">
          Delivering excellence from Primary to Secondary with a balanced blend of local and international curricula, character growth, and life-ready skills.
        </p>
        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button className="bg-white font-bold rounded-full px-8 sm:px-10 py-3 text-[#3657C3] cursor-pointer w-full sm:w-auto text-center">
              Enroll Today
            </button>
            <button className="bg-[#DFE0E5]/40 font-bold rounded-full px-8 sm:px-10 py-3 cursor-pointer w-full sm:w-auto text-center">
              Book a Tour
            </button>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;
