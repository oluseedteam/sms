import React from 'react';
import image_1 from '../../../assets/images/advantage_1.png';
import image_2 from '../../../assets/images/advantage_2.png';
import image_3 from '../../../assets/images/advantage_3.png';
import image_4 from '../../../assets/images/advantage_4.png';
import image_5 from '../../../assets/images/welcome_image_1.png';
import image_6 from '../../../assets/images/welcome_image_2.png';
import image_7 from '../../../assets/images/welcome_image_3.png';
import image_8 from '../../../assets/images/image_5.png';
import { motion } from "motion/react";

const images = [
  { id: 1, src: image_1, alt: 'Students in class activity 1' },
  { id: 2, src: image_2, alt: 'Students in class activity 2' },
  { id: 3, src: image_3, alt: 'Students in class activity 3' },
  { id: 4, src: image_4, alt: 'Students in class activity 4' },
  { id: 5, src: image_5, alt: 'Students in class activity 5' },
  { id: 6, src: image_6, alt: 'Students in class activity 6' },
  { id: 7, src: image_7, alt: 'Students in class activity 7' },
  { id: 8, src: image_8, alt: 'Students in class activity 7' },
]


const Snapshot = () => {
  return (
    <motion.section className="px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-2xl font-normal text-[#0B1034] sm:text-3xl">
          Student Life Snapshot
        </h1>

        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden bg-white shadow-sm ring-1 ring-slate-200"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-44 lg:h-100"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Snapshot
