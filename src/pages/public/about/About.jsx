import React from 'react';
import Philosophy from './Philosophy';
import OurSchool from './OurSchool';
import Vision from './Vision';
import Commitment from './Commitment';
import Faq from '../../../components/Faq';
import Snapshot from '../home/Snapshot';
import { motion } from "motion/react";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      className='overflow-hidden font-Dm-sans'
    >
      <Philosophy />
      <OurSchool />
      <Vision />
      <Commitment />
      <Faq />
      <Snapshot />
    </motion.div>
  )
}

export default About
