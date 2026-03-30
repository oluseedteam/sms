import React from 'react'
  import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';
import Media from '../pages/media/Media';
import Login from '../pages/login/Login';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import MyClassPage from '../pages/Classes/MyClassPage';
import HomeworkPage from '../pages/Homework/HomeworkPage';
import GradesPage from '../pages/Grades/GradesPage';
import HomeworkDetail from '../pages/Homework/HomeworkDetail';
import Homework from '../pages/Homework/Homework';




const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/media' element={<Media />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='my-classes' element={<MyClassPage />} />
        <Route path='grade' element={<GradesPage />} />
        <Route path='homework' element={<HomeworkPage />}>
           <Route index element={<Homework />} />
           <Route path='detail' element={<HomeworkDetail />} />
        </Route>
        // put other dashboard route here for anyone working on the other dashboard pages
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRoutes