import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  BookMarked,
  CalendarCheck,
  Mail,
  Calendar,
  Library,
  User,
  X
} from "lucide-react";

const TeacherSidebar = ({ onClose }) => {
  const navItems = [
    { title: "Dashboard",   icon: LayoutDashboard, path: "/teacher-dashboard" },
    { title: "My Classes",  icon: BookOpen,        path: "/teacher-dashboard/my-classes" },
    { title: "Students",    icon: Users,           path: "/teacher-dashboard/students" },
    { title: "Assignments", icon: ClipboardList,   path: "/teacher-dashboard/assignments" },
    { title: "Gradebook",   icon: BookMarked,      path: "/teacher-dashboard/gradebook" },
    { title: "Attendance",  icon: CalendarCheck,   path: "/teacher-dashboard/attendance" },
    { title: "Messages",    icon: Mail,            path: "/teacher-dashboard/messages" },
    { title: "Calendar",    icon: Calendar,        path: "/teacher-dashboard/calendar" },
    { title: "Resources",   icon: Library,         path: "/teacher-dashboard/resources" },
    { title: "Profile",     icon: User,            path: "/teacher-dashboard/profile" },
  ];

  return (
    <div className='w-64 h-full bg-white shadow-md p-5 flex flex-col overflow-y-auto'>
      {/* Logo Section */}
      <div className='w-full flex flex-col items-center mb-8 shrink-0 relative'>
        {onClose && (
          <button onClick={onClose} className="absolute -right-1 -top-1 md:hidden text-gray-500 hover:text-gray-700 bg-gray-100 p-1.5 rounded-xl z-10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 mb-3 shadow-sm'>
          <img src={logo} alt="Sunshine Elementary" className='w-full h-full object-contain' />
        </div>
        <h1 className="text-sm font-black text-blue-800 uppercase tracking-tight text-center leading-tight">
          Sunshine Elementary
        </h1>
        <div className="w-12 h-0.5 bg-blue-50 mt-4 rounded-full opacity-50" />
      </div>

      <nav className='space-y-1 flex-1'>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === '/teacher-dashboard'}
              onClick={() => { if (onClose) onClose(); }}
              className={({ isActive }) =>
                `block p-2 rounded-lg cursor-pointer transition-all duration-200 border-blue-600 ` +
                (isActive
                  ? 'bg-blue-100 border-l-4'
                  : 'hover:bg-blue-50/50 hover:border-l-4 border-l-transparent')
              }
            >
              {({ isActive }) => (
                <div className={`flex items-center gap-3 px-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
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

      {/* Quick Actions Box */}
      <div className="mt-8 bg-linear-to-b from-blue-700 to-blue-900 text-white p-5 rounded-3xl shadow-lg shadow-blue-200">
        <p className="text-xs font-bold text-center mb-4 uppercase tracking-widest opacity-90">Quick Actions</p>
        <div className="space-y-2.5">
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/20 transition-all rounded-2xl border border-white/10 text-xs font-bold ring-white/5 ring-1">
            <span className="text-blue-200">✓</span> Take Attendance
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/20 transition-all rounded-2xl border border-white/10 text-xs font-bold ring-white/5 ring-1">
            <span>📝</span> Grade Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;