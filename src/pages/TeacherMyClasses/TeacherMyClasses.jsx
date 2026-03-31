import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, MapPin, Calendar, Users, CheckCircle2,
  TrendingUp, AlertCircle, ChevronRight, MoreVertical,
  Calculator, Microscope, Globe, Palette, Goal, Activity
} from 'lucide-react';
import TeacherMyClassesRight from './TeacherMyClassesRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const classes = [
  {
    id: 1, title: 'Mathematics', grade: 'Grade 4B',
    time: 'Mon, Tue, Thu, Fri • 8:30–10:00 AM', location: 'Room 4B', students: 28,
    unit: 'Addition and Subtraction up to 1000', week: 'Week 5 of 8',
    avg: '87%', hw: '94%',
    upcoming: 'Test on Friday',
    attention: '3 assignments pending grading',
    attentionType: 'warn',
    accent: 'border-l-blue-500', iconBg: 'bg-blue-50',
    icon: <Calculator className="w-6 h-6 text-blue-500" />,
    actions: ['Lesson Plans', 'Student Progress'],
  },
  {
    id: 2, title: 'English Language Arts', grade: 'Grade 4B',
    time: 'Mon, Wed, Fri • 10:00–11:30 AM', location: 'Room 4B', students: 28,
    unit: 'Creative Story Writing', week: 'Week 3 of 6',
    avg: '91%', hw: '96%',
    upcoming: 'Reading presentations next Wednesday',
    attention: '5 reading logs to review',
    attentionType: 'warn',
    accent: 'border-l-purple-500', iconBg: 'bg-purple-50',
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    actions: ['Lesson Plans', 'Student Progress'],
  },
  {
    id: 3, title: 'Science', grade: 'Grade 4B',
    time: 'Tue, Thu • 12:30–2:00 PM', location: 'Science Lab A', students: 28,
    unit: 'Plants and Animals', week: 'Week 5 of 8',
    avg: '93%', hw: '100%',
    upcoming: 'Science fair project due next Tuesday',
    attention: 'Seeds, soil, containers (order submitted)',
    attentionType: 'ok',
    accent: 'border-l-green-500', iconBg: 'bg-green-50',
    icon: <Microscope className="w-6 h-6 text-green-500" />,
    actions: ['Lab Plans', 'Student Progress'],
  },
  {
    id: 4, title: 'Social Studies', grade: 'Grade 4B',
    time: 'Wed, Thu • 1:30–3:00 PM', location: 'Room 4B', students: 28,
    unit: 'Our Community Helpers', week: 'Week 4 of 7',
    avg: '88%', hw: '92%',
    upcoming: 'Fire station visit – November 5',
    attention: 'Police officer visit next week',
    attentionType: 'info',
    accent: 'border-l-yellow-500', iconBg: 'bg-yellow-50',
    icon: <Globe className="w-6 h-6 text-yellow-500" />,
    actions: ['Lesson Plans', 'Student Progress'],
  },
  {
    id: 5, title: 'Art', grade: 'Grade 4B',
    time: 'Tue, Fri • 2:00–3:30 PM', location: 'Art Room', students: 28,
    unit: 'Watercolor Landscapes', week: 'Week 2 of 4',
    avg: '100%', hw: '85%',
    upcoming: 'Art show – December 15',
    attention: 'Watercolor paper (in stock) • Brushes order pending',
    attentionType: 'warn',
    accent: 'border-l-orange-500', iconBg: 'bg-orange-50',
    icon: <Palette className="w-6 h-6 text-orange-500" />,
    actions: ['Project Plans', 'Student Gallery'],
  },
  {
    id: 6, title: 'Physical Education', grade: 'Grade 4B',
    time: 'Mon, Wed, Fri • 2:45–3:30 PM', location: 'Gymnasium', students: 28,
    unit: 'Team Sports & Cooperation', week: 'Week 3 of 6',
    avg: '98%', hw: 'A+',
    upcoming: 'Sports Day prep – November 5',
    attention: 'All equipment checked and ready',
    attentionType: 'ok',
    accent: 'border-l-indigo-500', iconBg: 'bg-indigo-50',
    icon: <Goal className="w-6 h-6 text-indigo-500" />,
    actions: ['Activity Plans', 'Skills Assessment'],
  },
];

const attentionStyles = {
  warn: 'bg-orange-50 text-orange-600 ring-orange-100',
  ok:   'bg-green-50  text-green-600  ring-green-100',
  info: 'bg-blue-50   text-blue-600   ring-blue-100',
};

const TeacherMyClasses = () => {
  const [activeFilter, setActiveFilter] = useState('All Classes');

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      {/* Main content */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Classes</h1>
            <p className="text-sm text-gray-500 mt-1">2023-2024 Academic Year • Term 2</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All Classes', 'Current Day', 'Planning', 'Resources'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Class Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {classes.map(cls => (
            <motion.div
              key={cls.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 border-l-4 ${cls.accent} hover:shadow-xl transition-all group`}
            >
              {/* Card top */}
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${cls.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {cls.icon}
                </div>
                <button className="text-gray-300 hover:text-gray-500"><MoreVertical className="w-5 h-5" /></button>
              </div>

              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{cls.title}</h3>
              <p className="text-xs text-gray-400 font-medium mb-4">{cls.grade}</p>

              {/* Meta */}
              <div className="space-y-1.5 mb-5">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.students} students
                </div>
              </div>

              {/* Current unit */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                <div className="flex justify-between text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">
                  <span>Current Unit</span>
                  <span>{cls.week}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 mb-3 line-clamp-1">{cls.unit}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Class Average</p>
                    <p className="text-base font-bold text-gray-800">{cls.avg}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">HW Completion</p>
                    <p className="text-base font-bold text-gray-800">{cls.hw}</p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-2 mb-6">
                <div className="bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100 p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>Upcoming: {cls.upcoming}</span>
                </div>
                <div className={`ring-1 ring-inset ${attentionStyles[cls.attentionType]} p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold`}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{cls.attention}</span>
                </div>
              </div>

              {/* Buttons */}
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mb-2 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Take Attendance
              </button>
              <div className="grid grid-cols-2 gap-2">
                {cls.actions.map((a, i) => (
                  <button key={i} className="text-blue-600 border border-blue-100 font-bold py-2.5 rounded-2xl hover:bg-blue-50 text-xs transition-all">
                    {a}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-80 w-full">
        <TeacherMyClassesRight />
      </div>
    </div>
  );
};

export default TeacherMyClasses;
