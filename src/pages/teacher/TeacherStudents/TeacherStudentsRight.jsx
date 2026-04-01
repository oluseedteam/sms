import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, MessageSquare, FileText, Users, ChevronRight } from 'lucide-react';

const overview = [
  { label: 'Total Students',     value: '28',      highlight: false },
  { label: 'Present Today',      value: '27 (96%)', highlight: true,  color: 'text-green-600' },
  { label: 'Average Grade',      value: 'B+ (89%)', highlight: false },
  { label: 'Perfect Attendance', value: '12',       highlight: false },
  { label: 'Honor Roll',         value: '18',       highlight: false },
];

const attention = [
  { label: 'Late Submissions',       names: 'David M., Jessica L., Ryan T.', color: 'bg-orange-50 border-orange-200 text-orange-700', count: 3 },
  { label: 'Attendance Concerns',    names: 'David M., Ashley K.',           color: 'bg-red-50 border-red-200 text-red-700',    count: 2 },
  { label: 'Parent Meeting Requests',names: "Emma's parents, Lucas's parents", color: 'bg-blue-50 border-blue-200 text-blue-700', count: 2 },
  { label: 'Health Alerts',          names: 'Emma J. – Peanut allergy reminder', color: 'bg-yellow-50 border-yellow-200 text-yellow-700', count: 1 },
];

const communications = [
  { name: "Jennifer Johnson (Emma's mom)", msg: 'Thank you for the science project feedback…', time: '2 hours ago' },
  { name: "Robert Chen (Michael's dad)",   msg: 'Michael really enjoyed the field trip…',     time: 'Yesterday' },
  { name: "Maria Martinez (David's mom)",  msg: "Re: David's homework completion…",            time: '2 days ago' },
];

const reports = [
  { label: 'Generate Report Cards',   icon: FileText,      color: 'text-blue-600' },
  { label: 'Attendance Report',       icon: Users,         color: 'text-green-600' },
  { label: 'Grade Report',            icon: FileText,      color: 'text-purple-600' },
  { label: 'Emergency Contact List',  icon: AlertTriangle, color: 'text-red-600' },
  { label: 'Seating Chart',           icon: Users,         color: 'text-gray-600' },
];

const TeacherStudentsRight = () => (
  <div className="space-y-6">
    {/* Class Overview */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-blue-600" /> Class Overview
      </h3>
      <div className="space-y-2.5">
        {overview.map((o, i) => (
          <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-600">{o.label}</span>
            <span className={`font-bold text-sm ${o.color ?? 'text-gray-900'}`}>{o.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Attention Needed */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-orange-500" /> Attention Needed
      </h3>
      <div className="space-y-3">
        {attention.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 2 }}
            className={`p-3 rounded-2xl border ${a.color} cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold">{a.label}</p>
                <p className="text-[10px] mt-0.5 opacity-80 leading-tight">{a.names}</p>
              </div>
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-sm">
                {a.count}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Recent Communications */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-blue-600" /> Recent Communications
      </h3>
      <div className="space-y-3">
        {communications.map((c, i) => (
          <div key={i} className="p-3 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer">
            <p className="text-xs font-bold text-gray-800">{c.name}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{c.msg}</p>
            <p className="text-[10px] text-gray-400 mt-1">{c.time}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Reports */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-blue-600" /> Quick Reports
      </h3>
      <div className="space-y-1">
        {reports.map((r, i) => (
          <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all">
            <span className={`flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:${r.color}`}>
              <r.icon className={`w-4 h-4 ${r.color}`} /> {r.label}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TeacherStudentsRight;
