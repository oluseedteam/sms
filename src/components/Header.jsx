import { Mail, Star, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div className="flex justify-between items-center w-full md:w-auto">
        <h2 className="text-xl md:text-2xl font-bold text-blue-600">
          Good Morning, Emma ☀️
        </h2>
        {onMenuClick && (
          <button 
            onClick={onMenuClick} 
            className="md:hidden p-2 text-blue-600 bg-white shadow-sm rounded-lg hover:bg-gray-50 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto flex-nowrap hide-scrollbar">
        <span className="text-xs md:text-sm flex items-center whitespace-nowrap text-blue-600 bg-white md:bg-gray-200 p-2 px-3 md:px-2 rounded-full shadow-sm md:shadow-none shrink-0">
          <Star className="h-4 w-4 text-blue-700 mr-2 md:mr-3"/> Wednesday, October 25, 2023
        </span>
        <div className="shrink-0">
          <Mail className="text-blue-700 h-9 w-9 md:h-10 md:w-10 p-1.5 md:p-1 bg-white md:bg-transparent rounded-full shadow-sm md:shadow-none cursor-pointer hover:bg-gray-50 md:hover:bg-transparent"/>
        </div>

        <div className="flex items-center gap-2 bg-white md:bg-transparent p-1 px-2 md:p-0 rounded-full shadow-sm md:shadow-none shrink-0 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
          />
          
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight">Emma Johnson</p>
            <p className="text-xs text-gray-500">Grade 4B</p>
          </div>
        </div>
      </div>
    </div>
  );
}