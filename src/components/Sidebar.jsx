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
  Users,
  User,
  X
} from "lucide-react";


const Sidebar = ({ onClose }) => {
    const dashboardOptions = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/student"
        },
        {
            title: "My Classes",
            icon: BookOpen,
            path: "/student/my-classes"
        },
        {
            title: "Homework",
            icon: ClipboardList,
            path: "/student/homework"
        },
        {
            title: "All Students",
            icon: Users,
            path: "/student/students"
        },
        {
            title: "My Grades",
            icon: BarChart3,
            path: "/student/grade"
        },
        {
            title: "Attendance",
            icon: CalendarCheck,
            path: "/student/attendance"
        },
        {
            title: "Messages",
            icon: Mail,
            path: "/student/message"
        },
        {
            title: "Library",
            icon: Library,
            path: "/student/library"
        },
        {
            title: "My Profile",
            icon: User,
            path: "/student/profile"
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
                        end={item.path === '/dashboard'}
                        onClick={() => { if(onClose) onClose() }}
                        className={({ isActive }) =>
                            `block p-2 rounded-lg cursor-pointer transition-all duration-200 border-blue-600 ` +
                            (isActive
                                ? 'bg-blue-100 border-l-4'
                                : 'hover:bg-blue-50/50 hover:border-l-4 border-l-transparent')
                        }
                    >
                        {({ isActive }) => (
                            <div className={`flex items-center gap-3 px-2 lg:px-0 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className={`font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
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