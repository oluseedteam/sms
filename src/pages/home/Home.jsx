import React from 'react'
import HeroSection from './HeroSection'
import Welcome from './Welcome'
import Advantage from './Advantage'
import Faq from '../../components/Faq'
import Admission from './Admission'
import Snapshot from './Snapshot'
import News from './News'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Welcome/>
      <Advantage/>
      <Faq/>
      <Admission/>
      <Snapshot/>
      <News/>
    </div>
  )
}

export default Home