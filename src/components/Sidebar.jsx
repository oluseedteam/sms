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
  User,
  X
} from "lucide-react";


const Sidebar = ({ onClose }) => {
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
    <div className='w-64 h-full bg-white shadow-md p-5 flex flex-col overflow-y-auto'>
        {/* Logo */}
        <div className='w-full flex justify-between items-center mb-5 shrink-0'>
            <div className='flex items-center gap-3'>
              <img src={logo} alt="" className='h-12 w-12 object-contain'/>
              <h1 className="text-lg font-bold text-blue-600">GHRA School</h1>
            </div>
            {onClose && (
              <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            )}
        </div>
        <nav className='space-y-2 lg:space-y-4 flex-1'>
            {dashboardOptions.map((item, index) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        onClick={() => { if(onClose) onClose() }}
                        className={({ isActive }) =>
                            `block p-2 rounded-lg cursor-pointer transition-colors border-blue-600 ` +
                            (isActive
                                ? 'bg-blue-100 border-l-4'
                                : 'hover:bg-blue-100 hover:border-l-4')
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex items-center gap-3 text-gray-700 px-2 lg:px-0">
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
        <div className="mt-8 bg-yellow-400 text-white p-4 rounded-xl text-center shrink-0">
            <p className="text-sm">Achievement Points</p>
            <h2 className="text-2xl font-bold">245</h2>
        </div>
    </div>
  )
}

export default Sidebar