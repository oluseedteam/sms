import React from 'react';
import { Trophy, Target, Bell, MessageSquare, Star, TrendingUp } from 'lucide-react';

const AttendaceRight = () => {
  const badges = [
    { name: "Perfect Week", date: "Oct 20", icon: "🏆", color: "bg-yellow-100" },
    { name: "Never Late", date: "Oct 15", icon: "⏰", color: "bg-blue-100" },
    { name: "Full Month", date: "Sep 30", icon: "📅", color: "bg-green-100" },
    { name: "Top Attendee", date: "Oct 10", icon: "⭐", color: "bg-purple-100" },
  ];

  const reminders = [
    { text: "If you're sick, stay home and rest", icon: "🤒" },
    { text: "Ask your parent to call the school", icon: "📞" },
    { text: "Bring a note when you return", icon: "📝" },
    { text: "Try to schedule appointments after school", icon: "🗓️" },
  ];

  const upcomingAbsences = [{ label: "No planned absences 🎉" }];

  return (
    <div className="space-y-6">
      {/* Attendance Rewards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Attendance Rewards</h3>
        </div>

        {/* Progress toward next badge */}
        <div className="mb-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2">Next Badge Progress</p>
          <div className="h-2 bg-yellow-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] font-bold text-yellow-600">75% complete</span>
            <span className="text-[9px] font-bold text-yellow-600">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-[10px] font-bold text-yellow-700 mt-2 text-center">3 more days to earn 50% bonus!</p>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-gray-50 flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <span className={`text-2xl p-3 rounded-xl ${badge.color} mb-2 group-hover:scale-110 transition-transform`}>
                {badge.icon}
              </span>
              <p className="text-[10px] font-black text-gray-800 leading-tight uppercase tracking-tighter mb-1">
                {badge.name}
              </p>
              <p className="text-[9px] font-bold text-gray-400">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Goal */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Attendance Goal</h3>
        </div>

        {/* Circular Progress */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0fdf4" strokeWidth="12" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#22c55e" strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="10.05"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-green-600">96%</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-green-600 mt-2">You're doing great! Keep it up! 😊</p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">Goal: 95% attendance</p>
        </div>

        <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-center">
          <p className="text-[10px] font-bold text-green-700">Class average: 94%</p>
          <p className="text-[10px] font-black text-green-600 mt-0.5">You're above average 🌟</p>
        </div>
      </div>

      {/* Upcoming Absences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Upcoming Absences</h3>
        </div>
        {upcomingAbsences.map((item, idx) => (
          <p key={idx} className="text-[11px] font-bold text-gray-400 text-center py-2">
            {item.label}
          </p>
        ))}
        <button className="mt-3 w-full py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-100">
          Parent: Request Time Off
        </button>
      </div>

      {/* Important Reminders */}
      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Important Reminders</h3>
        </div>
        <div className="space-y-3 mb-5">
          {reminders.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="bg-white p-2 rounded-lg shadow-sm border border-orange-100 text-sm">{item.icon}</span>
              <p className="text-[11px] font-bold text-orange-900 leading-snug pt-1">{item.text}</p>
            </div>
          ))}
        </div>
        {/* Mascot */}
        <div className="text-center mt-2">
          <span className="text-5xl">🎒</span>
        </div>
      </div>
    </div>
  );
};

export default AttendaceRight;
