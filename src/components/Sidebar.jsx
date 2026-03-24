import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  CalendarCheck,
  Mail,
  Library,
  User
} from "lucide-react";


const Sidebar = () => {
    const dashboardOptions = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },
        {
            title: "My Classes",
            icon: BookOpen,
            path: "/class"
        },
        {
            title: "Homework",
            icon: ClipboardList,
            path: "/homework"
        },
        {
            title: "My Grades",
            icon: BarChart3,
            path: "/grade"
        },
        {
            title: "Attendance",
            icon: CalendarCheck,
            path: "/attendance"
        },
        {
            title: "Messages",
            icon: Mail,
            path: "/message"
        },
        {
            title: "Library",
            icon: Library,
            path: "/library"
        },
        {
            title: "My Profile",
            icon: User,
            path: "/profile"
        }
    ]
  return (
    <div className='w-55 bg-white shadow-md p-5'>
        {/* Logo */}
        <div className='w-30 flex justify-between items-center p-1 mb-5'>
            <img src={logo} alt="" className='h-15 w-15 '/>
            <h1 className="text-xl font-bold text-blue-600 mb-8 h-5">GHRA School</h1>
        </div>
        <nav className='space-y-4'>
            {dashboardOptions.map((item, index) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `block p-2 rounded-lg cursor-pointer transition-colors border-blue-600 ` +
                            (isActive
                                ? 'bg-blue-100 border-l-4'
                                : 'hover:bg-blue-100 hover:border-l-4')
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex items-center gap-3 text-gray-700">
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-blue-400'}`} />
                                <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-blue-400'}`}>
                                    {item.title}
                                </span>
                            </div>
                        )}
                    </NavLink>
                );
            })}
        </nav>
        <div className="mt-10 bg-yellow-400 text-white p-4 rounded-xl text-center">
            <p className="text-sm">Achievement Points</p>
            <h2 className="text-2xl font-bold">245</h2>
        </div>
    </div>
  )
}

export default Sidebar