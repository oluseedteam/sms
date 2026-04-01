import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, ChevronRight, Clock } from 'lucide-react';

const quickActions = [
  { label: 'New Message',             icon: '✉️' },
  { label: 'Message All Parents',     icon: '👨‍👩‍👧' },
  { label: 'Message Student',         icon: '👤' },
  { label: 'Send Class Announcement', icon: '📢' },
  { label: 'Schedule Parent Conference', icon: '📅' },
];

const templates = [
  { label: 'Homework reminder',    icon: '📚' },
  { label: 'Absence follow-up',    icon: '📋' },
  { label: 'Positive behavior note', icon: '⭐' },
  { label: 'Progress concern',     icon: '📊' },
  { label: 'Meeting invitation',   icon: '🤝' },
  { label: 'Weekly update',        icon: '📰' },
];

const scheduled = [
  { label: 'Weekly newsletter', sub: 'Friday at 4:00 PM' },
];

const TeacherMessagesRight = () => (
  <div className="space-y-6">
    {/* Quick Actions */}
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-blue-600" /> Quick Actions
      </h3>
      <div className="space-y-1.5">
        {quickActions.map((a, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 3 }}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
              i === 0
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100'
            }`}
          >
            <span>{a.icon}</span> {a.label}
          </motion.button>
        ))}
      </div>
    </div>

    {/* Message Templates */}
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800 text-sm">Message Templates</h3>
        <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">Manage Templates</span>
      </div>
      <div className="space-y-1">
        {templates.map((t, i) => (
          <button key={i} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all text-left">
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>
    </div>

    {/* Scheduled Messages */}
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
        <Clock className="w-4 h-4 text-blue-600" /> Scheduled Messages
      </h3>
      {scheduled.map((s, i) => (
        <div key={i} className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs font-bold text-gray-800">{s.label}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TeacherMessagesRight;
