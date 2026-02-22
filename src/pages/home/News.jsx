import React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import image_1 from '../../assets/images/advantage_1.png';
import image_2 from '../../assets/images/advantage_2.png';
import image_3 from '../../assets/images/advantage_3.png';
import { motion } from "motion/react";

const data = [
  {
    id: 1,
    image: image_1,
    title: 'GHRA School',
    date: '13 Jan',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, sapiente nostrum.',
    href: '/news/1',
  },
  {
    id: 2,
    image: image_2,
    title: 'Annual Science Fair',
    date: '20 Jan',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, sapiente nostrum.wdgbadg agbdgargrbrbtr',
    href: '/news/2',
  },
  {
    id: 3,
    image: image_3,
    title: 'New Academic Session',
    date: '05 Feb',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, sapiente nostrum.',
    href: '/news/3',
  },
]

const NewsCard = ({ image, title, date, desc, href }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#3657C3] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">

    {/* Image */}
    <div className="h-60 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col gap-3 p-5">

      {/* Date + Title row */}
      <div className="flex items-center justify-between gap-3">
        <span className="shrink-0 rounded-full border border-[#3657C3]/20 bg-[#3657C3]/10 px-3 py-0.5 text-xs font-bold text-[#3657C3]">
          {date}
        </span>
        <h3 className="text-right text-[16px] font-bold leading-snug text-gray-800">
          {title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100" />

      {/* Description */}
      <p className="flex-1 text-[14px] leading-relaxed text-gray-500">{desc}</p>

      {/* Read More */}
      <a
        href={href}
        className="mt-1 inline-flex w-fit items-center gap-1.5 text-[16px] font-bold text-[#3657C3] transition-all duration-200 hover:gap-3"
      >
        Read More
        <FiArrowUpRight className="text-base transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

    </div>
  </div>
)

const News = () => {
  return (
    <motion.section className="px-6 "
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
    >

      {/* Badge */}
      <div className="mb-8 grid justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#3657C3]/30 bg-[#3657C3]/10 px-4 py-1.5 text-[16px] font-semibold text-[#3657C3]">
          <FaDotCircle className="text-xs" />
          <span>Stay Connected</span>
        </div>
      </div>

      <h1 className='font-Dm-sans mt-5 font-normal text-[#0B1034] text-3xl md:text-4xl text-center mb-5'>Latest News Release</h1>

      {/* Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>

      <div className='place-self-center mt-10'>
        <button className='bg-[#3657C3] text-white text-sm px-10 py-2 font-bold cursor-pointer hover:bg-blue-700 rounded-full'>Read More</button>
      </div>

    </motion.section>
  )
}

export default News
