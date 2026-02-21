import React from 'react'
import Philosophy from './Philosophy'
import OurSchool from './OurSchool'
import Vision from './Vision'
import Commitment from './Commitment'
import Faq from '../../../components/Faq'
import Snapshot from '../Snapshot'

const About = () => {
  return (
    <div>
        <Philosophy />
        <OurSchool />
        <Vision />
        <Commitment />
        <Faq />
        <Snapshot />
    </div>
  )
}

export default About