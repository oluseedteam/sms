import React from 'react';
import HeroSection from './HeroSection';
import Welcome from './Welcome';
import Advantage from './Advantage';
import Faq from '../../../components/Faq';
import Admission from './Admission';
import Snapshot from './Snapshot';
import News from './News';
import { motion } from "motion/react";


const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      className='overflow-hidden'
    >
      <HeroSection />
      <Welcome />
      <Advantage />
      <Faq />
      <Admission />
      <Snapshot />
      <News />
    </motion.div>
  )
}

export default Home
