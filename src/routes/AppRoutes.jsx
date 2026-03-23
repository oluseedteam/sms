import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';
import Media from '../pages/media/Media';
import Login from '../pages/login/Login';




const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/media' element={<Media />}/>
      </Route>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default AppRoutes