import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';
import Media from '../pages/media/Media';
import Login from '../pages/login/Login';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';




const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/media' element={<Media />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        // put other dashboard route here for anyone working on the other dashboard pages
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRoutes