import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';
import Media from '../pages/media/Media';




const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/media' element={<Media />}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes