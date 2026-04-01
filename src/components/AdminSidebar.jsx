import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  HardHat, 
  FileText, 
  Bell, 
  Settings, 
  MessageSquare,
  LogOut 
} from 'lucide-react';
import logo from '../assets/images/logo.png';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Student", icon: Users, path: "/admin/student" },
    { title: "Worker", icon: HardHat, path: "/admin/worker" },
    { title: "Financial Report", icon: FileText, path: "/admin/financial" },
    { title: "Notification Management", icon: Bell, path: "/admin/notifications" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
    { title: "Dispute / Feedback", icon: MessageSquare, path: "/admin/dispute" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };

  return (
    <div className="w-72 h-screen bg-white flex flex-col border-r border-gray-100">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src={logo} alt="GHRA" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-bold text-blue-900 tracking-tight">GHRA School</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 pt-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-semibold text-sm">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-8 border-t border-gray-50">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 text-red-500 hover:text-red-600 font-bold text-sm w-full transition-all hover:bg-red-50 rounded-xl"
        >
          <LogOut className="w-5 h-5 rotate-180" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
