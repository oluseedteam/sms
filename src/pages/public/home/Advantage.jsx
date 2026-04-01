import React from 'react';
import advantage_1 from '../../../assets/images/advantage_1.png';
import advantage_2 from '../../../assets/images/advantage_2.png';
import advantage_3 from '../../../assets/images/welcome_image_2.png';
import advantage_4 from '../../../assets/images/welcome_image_3.png';
import advantage_5 from '../../../assets/images/advantage_3.png';
import advantage_6 from '../../../assets/images/advantage_4.png';
import { motion } from "motion/react";

const data = [
  {
    id: 1,
    image: advantage_1,
    title: 'Strong academic results & structured curriculum',
  },
  {
    id: 2,
    image: advantage_2,
    title: 'Dedicated & qualified teachers',
  },
  {
    id: 3,
    image: advantage_3,
    title: 'Safe & disciplined learning environment',
  },
  {
    id: 4,
    image: advantage_4,
    title: 'Modern teaching methods & technology support',
  },
  {
    id: 5,
    image: advantage_5,
    title: 'Balanced focus on academics, character, & skills',
  },
  {
    id: 6,
    image: advantage_6,
    title: 'Rich extracurricular and leadership programs',
  },
]

const Advantage = () => {
  const rows = []
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2))
  }

  return (
    <motion.section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-2xl font-medium text-gray-800 sm:text-3xl lg:text-4xl">Our School Advantage</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">What Makes Us Different</p>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col overflow-hidden md:flex-row md:items-stretch">
              <div className="flex-1 p-4 text-center sm:p-6">
                <img
                  src={row[0].image}
                  alt={row[0].title}
                  className="h-52 w-full rounded-lg object-cover sm:h-64 lg:h-72"
                />
                <p className="mt-4 text-[16px] font-medium text-[#0B1034]">{row[0].title}</p>
              </div>

              <div className="mx-4 h-px bg-[#013F88] md:mx-0 md:h-auto md:w-0.5 md:self-stretch" />

              {row[1] && (
                <div className="flex-1 p-4 text-center sm:p-6">
                  <img
                    src={row[1].image}
                    alt={row[1].title}
                    className="h-52 w-full rounded-lg object-cover sm:h-64 lg:h-72"
                  />
                  <p className="mt-4 text-[17px] font-medium text-[#0B1034]">{row[1].title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Advantage
