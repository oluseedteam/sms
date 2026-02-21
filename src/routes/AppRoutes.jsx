import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes