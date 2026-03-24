import { Mail, Star } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-blue-600">
        Good Morning, Emma ☀️
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm flex text-blue-600 bg-gray-200 p-2 rounded-full">
          <Star className="h-5 w-5 text-blue-700 rounded-full mr-3"/> Wednesday, October 25, 2023
        </span>
        <div>
            <Mail className=" text-blue-700 h-10 w-10 p-1 rounded-full"/>
          </div>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          
          <div>
            <p className="text-sm font-semibold">Emma Johnson</p>
            <p className="text-xs text-gray-500">Grade 4B</p>
          </div>
        </div>
      </div>
    </div>
  );
}