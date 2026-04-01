import React from 'react';
import { Star, Trophy, Calendar, BookOpen } from 'lucide-react';

const MyClassRight = () => {
  const schedule = [
    { day: "Monday", classes: [{ name: "Math", color: "bg-orange-100 text-orange-600" }, { name: "English", color: "bg-purple-100 text-purple-600" }, { name: "PE", color: "bg-blue-100 text-blue-600" }] },
    { day: "Tuesday", classes: [{ name: "Math", color: "bg-orange-100 text-orange-600" }, { name: "Science", color: "bg-green-100 text-green-600" }, { name: "Art", color: "bg-pink-100 text-pink-600" }] },
    { day: "Wednesday", classes: [{ name: "English", color: "bg-purple-100 text-purple-600" }, { name: "Social", color: "bg-blue-100 text-blue-600" }, { name: "PE", color: "bg-blue-100 text-blue-600" }] },
    { day: "Thursday", classes: [{ name: "Math", color: "bg-orange-100 text-orange-600" }, { name: "Science", color: "bg-green-100 text-green-600" }, { name: "Social", color: "bg-blue-100 text-blue-600" }] },
    { day: "Friday", classes: [{ name: "Math", color: "bg-orange-100 text-orange-600" }, { name: "English", color: "bg-purple-100 text-purple-600" }, { name: "Art", color: "bg-pink-100 text-pink-600" }, { name: "PE", color: "bg-blue-100 text-blue-600" }] },
  ];

  const rewards = [
    { subject: "Science", score: 12, color: "bg-yellow-400" },
    { subject: "English", score: 10, color: "bg-orange-400" },
    { subject: "Art", score: 9, color: "bg-red-400" },
    { subject: "Math", score: 8, color: "bg-blue-400" },
    { subject: "PE", score: 8, color: "bg-green-400" },
    { subject: "Social Studies", score: 7, color: "bg-purple-400" },
  ];

  return (
    <div className="space-y-6">
      {/* My Favorite Subject */}
      <div className="bg-green-500 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <h3 className="text-sm font-semibold mb-4 flex items-center justify-center gap-2">
          ⭐ My Favorite Subject ⭐
        </h3>
        <div className="bg-white/20 p-4 rounded-xl inline-block mb-4 backdrop-blur-sm">
           <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-1">Science</h2>
        <p className="text-xs text-green-100">Most Gold Stars Earned!</p>
      </div>

      {/* My Class Schedule */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-800">My Class Schedule</h3>
        </div>
        
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-xs font-bold text-gray-500">{item.day}</span>
              <div className="flex flex-wrap gap-2">
                {item.classes.map((cls, cIdx) => (
                  <span key={cIdx} className={`${cls.color} text-[10px] px-2 py-1 rounded-md font-bold`}>
                    {cls.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Rewards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-gray-800">Class Rewards</h3>
        </div>
        
        <div className="space-y-4">
          {rewards.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700">{item.subject}</span>
                <span className="text-gray-900 border-b border-gray-200">⭐ {item.score}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full`} 
                  style={{ width: `${(item.score / 15) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClassRight;
