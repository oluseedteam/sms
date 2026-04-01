import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Library, ChevronRight } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const schedule = [
  ['Math', 'Math', 'English', 'Math', 'Math'],
  ['English', 'English', 'Science', 'Science', 'English'],
  ['Science', 'Art', 'Social', 'PE', 'Art'],
];

const colorMap = {
  Math:    'bg-blue-200 text-blue-800',
  English: 'bg-purple-200 text-purple-800',
  Science: 'bg-green-200 text-green-800',
  Social:  'bg-yellow-200 text-yellow-800',
  Art:     'bg-orange-200 text-orange-800',
  PE:      'bg-indigo-200 text-indigo-800',
};

const planning = ['Curriculum Standards', 'Lesson Templates', 'Resource Library'];
const profDev   = [
  { label: 'Differentiated Instruction', date: 'November 10, 2023', color: 'border-l-green-500' },
  { label: 'Parent Communication Skills', date: 'November 15, 2023', color: 'border-l-blue-500' },
];
const resources = ['Textbooks', 'Worksheets', 'Videos', 'Activities'];

const TeacherMyClassesRight = () => (
  <div className="space-y-6">
    {/* Weekly Schedule */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-600" /> Weekly Schedule
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 mb-1">{d}</div>
        ))}
        {schedule.map((row, ri) =>
          row.map((subj, ci) => (
            <div key={`${ri}-${ci}`} className={`text-center text-[9px] font-bold px-1 py-1.5 rounded-lg leading-tight ${colorMap[subj]}`}>
              {subj.slice(0, 4)}
            </div>
          ))
        )}
      </div>
    </div>

    {/* Lesson Planning */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-600" /> Lesson Planning
      </h3>
      <div className="space-y-1">
        {planning.map((item, i) => (
          <button key={i} className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex justify-between items-center group transition-all">
            <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium">{item}</span>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>

    {/* Professional Development */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-blue-600" /> Professional Development
      </h3>
      <div className="space-y-3">
        {profDev.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 3 }}
            className={`p-3 rounded-2xl bg-gray-50 border-l-4 ${item.color} cursor-pointer`}
          >
            <p className="text-sm font-bold text-gray-800">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Class Resources */}
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Library className="w-4 h-4 text-blue-600" /> Class Resources
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {resources.map((r, i) => (
          <button key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:text-blue-600 text-sm font-medium text-gray-700 transition-all">
            <span className="text-base">{['📚','📝','🎬','🎯'][i]}</span> {r}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TeacherMyClassesRight;
