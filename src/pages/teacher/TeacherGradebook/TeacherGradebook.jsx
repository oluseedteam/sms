import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download, Printer, Mail, PlusCircle, SlidersHorizontal,
  BarChart2, TrendingUp, ChevronDown, Save, Send, RotateCcw, History
} from 'lucide-react';
import TeacherGradebookRight from './TeacherGradebookRight';

const students = [
  { name: 'Emma Johnson',   p1: '18/20', t1: '94/100', p2: '19/20', proj: '47/50', p3: '20/20', hw: '95%', tests: '92%', part: '90%', final: '95%', color: 'bg-green-50' },
  { name: 'Michael Chen',   p1: '19/20', t1: '92/100', p2: '17/20', proj: '48/50', p3: '19/20', hw: '92%', tests: '92%', part: '96%', final: '90%', color: 'bg-white' },
  { name: 'Sarah Williams', p1: '17/20', t1: '88/100', p2: '18/20', proj: '43/50', p3: '18/20', hw: '88%', tests: '88%', part: '86%', final: '92%', color: 'bg-white' },
  { name: 'David Kim',      p1: '16/20', t1: '82/100', p2: '--',    proj: '42/50', p3: '15/20', hw: '77%', tests: '82%', part: '84%', final: '85%', color: 'bg-yellow-50', missing: true },
  { name: 'Lisa Martinez',  p1: '20/20', t1: '96/100', p2: '20/20', proj: '49/50', p3: '20/20', hw: '100%',tests: '96%', part: '98%', final: '98%', color: 'bg-green-50' },
  { name: 'James Wilson',   p1: '16/20', t1: '78/100', p2: '15/20', proj: '38/50', p3: '--',    hw: '75%', tests: '78%', part: '76%', final: '80%', color: 'bg-red-50', low: true },
];

const headers = [
  { label: 'Practice 1', sub: 'Oct 10 • 20 pts' },
  { label: 'Test 1',     sub: 'Oct 12 • 100 pts' },
  { label: 'Practice 2', sub: 'Oct 15 • 20 pts' },
  { label: 'Project',    sub: 'Oct 19 • 50 pts' },
  { label: 'Practice 3', sub: 'Oct 23 • 20 pts' },
  { label: '40% Homework',   sub: '' },
  { label: '30% Tests',      sub: '' },
  { label: '20% Projects',   sub: '' },
  { label: '10% Participation', sub: '' },
];

const getScoreColor = (score) => {
  if (!score || score === '--') return 'bg-gray-100 text-gray-400';
  const pct = score.includes('/') 
    ? (parseInt(score) / parseInt(score.split('/')[1])) * 100 
    : parseInt(score);
  if (pct >= 90) return 'bg-green-100 text-green-700';
  if (pct >= 80) return 'bg-blue-100 text-blue-700';
  if (pct >= 70) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const TeacherGradebook = () => {
  const [subject, setSubject] = useState('Mathematics');

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gradebook – Grade 4B</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Mathematics</span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white">
              <Download className="w-3.5 h-3.5" /> Download Gradebook
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white">
              <Printer className="w-3.5 h-3.5" /> Print Reports
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <Mail className="w-3.5 h-3.5" /> Email Progress
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-wrap gap-2 items-center">
          <div className="relative">
            <input placeholder="Search students..." className="text-xs border border-gray-200 rounded-xl px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="relative">
            <input placeholder="Filter by grade..." className="text-xs border border-gray-200 rounded-xl px-3 py-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="flex gap-2 ml-auto flex-wrap">
            {[
              { label: '+ Add Assignment', icon: PlusCircle, style: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
              { label: '↔ Scale Grades',  icon: SlidersHorizontal, style: 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-blue-200' },
              { label: '📊 Statistics',   icon: BarChart2,   style: 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-blue-200' },
              { label: 'All Students ▾',  icon: null,        style: 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-blue-200' },
              { label: '+ Add Filter',    icon: null,        style: 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-blue-200' },
            ].map((btn, i) => (
              <button key={i} className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${btn.style}`}>
                {btn.icon && <btn.icon className="w-3.5 h-3.5" />}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grades table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-xs font-bold text-gray-500 w-36">Student Name</th>
                {headers.map((h, i) => (
                  <th key={i} className="p-3 text-center">
                    <p className="text-[10px] font-bold text-gray-700">{h.label}</p>
                    {h.sub && <p className="text-[9px] text-gray-400">{h.sub}</p>}
                    {i < 5 && (
                      <div className={`h-0.5 mt-1 rounded-full ${['bg-blue-400','bg-blue-400','bg-blue-400','bg-blue-400','bg-blue-400'][i]}`} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`border-b border-gray-50 ${s.color} hover:bg-blue-50/30 transition-colors`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-gray-800">{s.name}</span>
                    </div>
                  </td>
                  {[s.p1, s.t1, s.p2, s.proj, s.p3, s.hw, s.tests, s.part, s.final].map((val, j) => (
                    <td key={j} className="p-2 text-center">
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${getScoreColor(val)}`}>
                        {val}
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-wrap justify-between items-center gap-2">
          <span className="text-xs text-gray-500">🖫 Last saved: October 25, 2023 at 2:45 PM</span>
          <div className="flex gap-2">
            {[
              { label: 'Save Changes',   style: 'bg-green-500 text-white hover:bg-green-600', icon: Save },
              { label: 'Publish Grades', style: 'bg-blue-600 text-white hover:bg-blue-700',   icon: Send },
              { label: 'Undo Last',      style: 'bg-orange-500 text-white hover:bg-orange-600', icon: RotateCcw },
              { label: 'View History',   style: 'bg-white border border-gray-200 text-gray-700 hover:border-blue-200', icon: History },
            ].map((btn, i) => (
              <button key={i} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${btn.style}`}>
                <btn.icon className="w-3.5 h-3.5" /> {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-72 w-full">
        <TeacherGradebookRight />
      </div>
    </div>
  );
};

export default TeacherGradebook;
