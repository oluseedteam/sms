import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'


const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Header />
        <main className='font-Dm-sans' >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout