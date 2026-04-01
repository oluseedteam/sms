import React from 'react';
import { motion } from 'motion/react';
import { BarChart2, AlertCircle, ChevronRight, FileText } from 'lucide-react';

const gradeStats = [
  { label: 'Class Average', value: '87%', big: true },
  { label: 'Highest',       value: '96%', big: true },
  { label: 'Lowest',        value: '72%', big: true },
  { label: 'Median',        value: '89%', big: true },
];

const distribution = [
  { grade: 'A', count: 12, pct: 43, color: 'bg-green-500' },
  { grade: 'B', count: 10, pct: 36, color: 'bg-blue-500' },
  { grade: 'C', count: 4,  pct: 14, color: 'bg-yellow-400' },
  { grade: 'D', count: 1,  pct: 4,  color: 'bg-orange-400' },
  { grade: 'F', count: 0,  pct: 0,  color: 'bg-red-400' },
];

const actionItems = [
  { label: 'Students below 75%', count: 3, color: 'bg-red-50 border-red-200 text-red-600' },
  { label: 'Missing assignments', count: 8, color: 'bg-orange-50 border-orange-200 text-orange-600' },
  { label: 'Parent conferences',  count: 2, color: 'bg-blue-50 border-blue-200 text-blue-600' },
];

const weights = [
  { label: 'Homework',      pct: 40, color: 'bg-blue-500' },
  { label: 'Tests',         pct: 30, color: 'bg-purple-500' },
  { label: 'Projects',      pct: 20, color: 'bg-green-500' },
  { label: 'Participation', pct: 10, color: 'bg-orange-400' },
];

const TeacherGradebookRight = () => (
  <div className="space-y-6">
    {/* Grade statistics */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <BarChart2 className="w-4 h-4 text-blue-600" /> Grade Statistics
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {gradeStats.map((s, i) => (
          <div key={i} className="bg-gray-50 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-gray-800">{s.value}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grade distribution bar chart */}
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Grade Distribution</h4>
      <div className="flex items-end gap-2 h-20 mb-2">
        {distribution.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-gray-500">{d.count}</span>
            <motion.div
              className={`w-full rounded-t-lg ${d.color}`}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(d.pct * 0.6, 4)}px` }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {distribution.map((d, i) => (
          <div key={i} className="flex-1 text-center text-xs font-bold text-gray-400">{d.grade}</div>
        ))}
      </div>

      <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-3 flex items-center gap-2">
        <span className="text-green-600 text-xs font-bold">📈 Class Trend: Improving</span>
      </div>
    </div>

    {/* Action Items */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4 text-orange-500" /> Action Items
      </h3>
      <div className="space-y-2 mb-4">
        {actionItems.map((a, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-2xl border ${a.color}`}>
            <span className="text-xs font-bold">{a.label}</span>
            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-[10px] shadow-sm">{a.count}</span>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-3">
        <p className="text-[10px] font-bold text-yellow-600">⏰ Grade Entry Deadline</p>
        <p className="text-xs font-bold text-gray-700 mt-0.5">October 28, 2023</p>
      </div>
    </div>

    {/* Category Weights */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4">Category Weights</h3>
      <div className="space-y-3">
        {weights.map((w, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-bold mb-1 text-gray-700">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${w.color}`} />
                {w.label}
              </div>
              <span>{w.pct}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${w.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${w.pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Report Cards */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-blue-600" /> Report Cards
      </h3>
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all text-sm">
          Generate Report Cards
        </button>
        <button className="w-full border border-gray-200 text-gray-700 font-bold py-3 rounded-2xl hover:border-blue-200 hover:text-blue-600 transition-all text-sm">
          Preview Sample
        </button>
      </div>
    </div>
  </div>
);

export default TeacherGradebookRight;
