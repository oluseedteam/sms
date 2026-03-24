import React from 'react'
import Welcome from './Welcome'
import Classes from './Classes'
import Homework from './Homework'
import StarStudent from './StarStudent'
import Events from './Events'
import Achievements from './Achievements'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      <div className='lg:col-span-8 space-y-6'>
        <Welcome/>
        <Classes />
        <Homework />
      </div>
      <div className='lg:col-span-4 space-y-6'>
        <StarStudent />
        <Events />
        <Achievements />
      </div>
    </div>
  )
}

export default Dashboard