import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import Contact from '../pages/home/Contact';


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes