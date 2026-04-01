import React from "react";
import image_1 from "../../../assets/images/welcome_image_1.png";
import image_2 from "../../../assets/images/welcome_image_2.png";
import image_3 from "../../../assets/images/welcome_image_3.png";
import image_4 from '../../../assets/images/image_1.jpg';
import { motion } from "motion/react";

const images = [image_1, image_2, image_3, image_4];

const Welcome = () => {
  return (
    <motion.section className="relative min-h-screen px-6 py-12 bg-gray-50"
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >
      {/* Text */}
      <div className="max-w-4xl mx-auto text-center md:text-left mb-8">
        <h1 className="font-medium text-3xl md:text-4xl mb-4 text-center">
          Welcome Message
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
          Welcome to our school, a community where each learner is valued, inspired,
          and prepared for tomorrow’s challenges. With a strong curriculum blending
          Nigerian and international standards, we nurture academic brilliance,
          critical thinking, creativity, and character development. Our goal is to
          produce confident, compassionate, and capable young people ready to succeed
          in higher education and in life.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={img}
              alt={`Welcome ${index + 1}`}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Welcome;
