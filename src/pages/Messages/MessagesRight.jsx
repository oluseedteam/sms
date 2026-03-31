import React from 'react';
import { Zap, Bell, Users, ShieldCheck } from 'lucide-react';

const MessagesRight = () => {
  const quickActions = [
    { label: '✉️ Message My Teacher', color: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' },
    { label: '❓ Ask a Question', color: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' },
    { label: '⚠️ Report a Problem', color: 'bg-white text-red-500 border border-red-100 hover:bg-red-50' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Picture Day – Next Friday!',
      sub: 'Remember to wear your uniform',
      time: '3 days ago',
      emoji: '📸',
      color: 'bg-blue-50 border-blue-100',
    },
    {
      id: 2,
      title: 'Book Fair Coming Soon!',
      sub: 'October 30 – November 3',
      time: '1 week ago',
      emoji: '📚',
      color: 'bg-purple-50 border-purple-100',
    },
  ];

  const teachers = [
    { name: 'Mrs. Anderson', subject: 'Math', emoji: '👩‍🏫', online: true },
    { name: 'Mr. Wilson', subject: 'English', emoji: '👨‍🏫', online: false },
    { name: 'Ms. Parker', subject: 'Science', emoji: '👩‍🔬', online: true },
  ];

  const safetyTips = [
    'Never share personal information',
    'Tell a teacher or parent if something makes you uncomfortable',
    'Be kind in all your messages',
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Zap className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Quick Actions</h3>
        </div>
        <div className="space-y-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm ${action.color}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Recent Announcements</h3>
        </div>
        <div className="space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${item.color} group hover:shadow-md transition-all`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight leading-tight">{item.title}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5">{item.sub}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] font-bold text-gray-400">{item.time}</span>
                    <button className="text-[9px] font-black text-blue-600 hover:underline uppercase">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Teachers */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">My Teachers</h3>
        </div>
        <div className="space-y-3">
          {teachers.map((teacher, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-lg border border-blue-100">
                    {teacher.emoji}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${teacher.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{teacher.name}</p>
                  <p className="text-[9px] font-bold text-gray-400">{teacher.subject}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm shadow-blue-100">
                Message
              </button>
            </div>
          ))}
        </div>
        <p className="text-[9px] font-bold text-yellow-600 bg-yellow-50 border border-yellow-100 rounded-lg p-2 mt-4 text-center">
          🔒 Your parents can see these messages!
        </p>
      </div>

      {/* Online Safety Reminder */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Online Safety Reminder</h3>
        </div>
        <div className="space-y-3">
          {safetyTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-500 font-black text-sm mt-0.5">✓</span>
              <p className="text-[11px] font-bold text-green-900 leading-snug">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesRight;
