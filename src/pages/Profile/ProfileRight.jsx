import React from 'react';
import { Trophy, BarChart2, Heart, Image, Download } from 'lucide-react';

const ProfileRight = () => {
  const badges = [
    { name: 'Math Master', icon: '📐', color: 'bg-orange-100 text-orange-700' },
    { name: 'Reading Champion', icon: '📚', color: 'bg-purple-100 text-purple-700' },
    { name: 'Perfect Attendance', icon: '✅', color: 'bg-green-100 text-green-700' },
    { name: 'Science Explorer', icon: '🧪', color: 'bg-blue-100 text-blue-700' },
    { name: 'Helping Hand', icon: '🤝', color: 'bg-yellow-100 text-yellow-700' },
  ];

  const monthStats = [
    { label: 'Books Read', value: '3 books', color: 'bg-purple-400', percent: 60 },
    { label: 'Homework Completed', value: '12 of 13', color: 'bg-green-400', percent: 92 },
    { label: 'Gold Stars Earned', value: '28 stars', color: 'bg-yellow-400', percent: 75 },
    { label: 'Perfect Days', value: '18 days', color: 'bg-blue-400', percent: 85 },
  ];

  const favoriteThings = [
    { label: 'Favorite Food', value: 'Pizza 🍕', emoji: '🍽️' },
    { label: 'Favorite Sport', value: 'Soccer ⚽', emoji: '🏃' },
    { label: 'Favorite Color', value: 'Purple 💜', emoji: '🎨' },
    { label: 'Reading Level', value: 'Grade 5', emoji: '📖' },
    { label: 'Art Style', value: 'Watercolors', emoji: '🖌️' },
  ];

  const photos = ['📸', '🏫', '🎨', '⚽', '🎒', '🌟'];

  const downloads = [
    { label: 'Student ID Card', icon: '🪪' },
    { label: 'Emergency Card', icon: '🚨' },
    { label: 'Bus Pass', icon: '🚌' },
  ];

  return (
    <div className="space-y-6">
      {/* My Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">My Achievements</h3>
        </div>

        {/* Stars summary */}
        <div className="bg-yellow-400 rounded-2xl p-4 text-white text-center mb-4 shadow-lg shadow-yellow-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
          <div className="relative">
            <div className="text-3xl mb-1">⭐</div>
            <h2 className="text-4xl font-black">245</h2>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1">Total Gold Stars</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-center mb-4">
          <p className="text-2xl font-black text-blue-600">12 🏅</p>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">Badges Earned</p>
        </div>

        {/* Badge list */}
        <div className="space-y-2 mb-4">
          {badges.map((badge, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-2.5 rounded-xl ${badge.color} group hover:scale-[1.02] transition-transform`}>
              <span className="text-base">{badge.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-tight">{badge.name}</span>
            </div>
          ))}
        </div>

        <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-100">
          View All Achievements
        </button>
      </div>

      {/* This Month's Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">This Month's Stats</h3>
        </div>
        <div className="space-y-4">
          {monthStats.map((stat, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-gray-500 uppercase tracking-tight text-[10px]">{stat.label}</span>
                <span className="font-black text-gray-800 text-[11px]">{stat.value}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} rounded-full transition-all duration-700`} style={{ width: `${stat.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Favorite Things */}
      <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Heart className="w-5 h-5 text-pink-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">My Favorite Things</h3>
        </div>
        <div className="space-y-3">
          {favoriteThings.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.emoji}</span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">{item.label}</span>
              </div>
              <span className="text-[11px] font-black text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Image className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Photo Gallery</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((ph, idx) => (
            <div
              key={idx}
              className="aspect-square bg-linear-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100 hover:scale-105 transition-transform cursor-pointer"
            >
              {ph}
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 bg-gray-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
          View All Photos
        </button>
      </div>

      {/* Download My Info */}
      <div className="bg-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-100 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Download className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white uppercase tracking-tight text-sm">Download My Info</h3>
        </div>
        {downloads.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all
              ${idx === 0 ? 'bg-white text-blue-600 hover:bg-black hover:text-white' : 'bg-blue-700 text-white hover:bg-black'}`}
          >
            <div className="flex items-center gap-2">
              <span>{item.icon}</span>
              {item.label}
            </div>
            <Download className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileRight;
