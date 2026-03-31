import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';
import AttendaceRight from './AttendaceRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// Calendar data for October 2023
const calendarDays = [
  // Week 1
  { day: 1, status: null },
  { day: 2, status: 'present', time: '8:05 AM' },
  { day: 3, status: 'present', time: '8:10 AM' },
  { day: 4, status: 'present', time: '8:00 AM' },
  { day: 5, status: 'present', time: '8:15 AM' },
  { day: 6, status: 'present', time: '8:08 AM' },
  { day: 7, status: null },
  // Week 2
  { day: 8, status: null },
  { day: 9, status: 'absent' },
  { day: 10, status: 'present', time: '8:12 AM' },
  { day: 11, status: 'present', time: '8:03 AM' },
  { day: 12, status: 'late', time: '8:32 AM' },
  { day: 13, status: 'present', time: '8:07 AM' },
  { day: 14, status: null },
  // Week 3
  { day: 15, status: null },
  { day: 16, status: 'present', time: '8:09 AM' },
  { day: 17, status: 'absent' },
  { day: 18, status: 'present', time: '8:11 AM' },
  { day: 19, status: 'present', time: '8:14 AM' },
  { day: 20, status: 'present', time: '8:06 AM' },
  { day: 21, status: null },
  // Week 4
  { day: 22, status: null },
  { day: 23, status: 'present', time: '8:30 AM' },
  { day: 24, status: 'present', time: '8:33 AM' },
  { day: 25, status: 'present', time: '8:25 AM', today: true },
  { day: 26, status: null },
  { day: 27, status: null },
  { day: 28, status: null },
  // Week 5
  { day: 29, status: null },
  { day: 30, status: null },
  { day: 31, status: null },
];

const details = [
  {
    id: 1,
    date: 'Wednesday, October 25, 2023',
    status: 'Present',
    arrivalTime: '8:30 AM',
    allClasses: true,
    note: 'Check progress on today! 👏',
    color: 'green',
    emoji: '✅',
  },
  {
    id: 2,
    date: 'Tuesday, October 24, 2023',
    status: 'Present',
    arrivalTime: '8:33 AM',
    allClasses: true,
    color: 'green',
    emoji: '✅',
  },
  {
    id: 3,
    date: 'Monday, October 23, 2023',
    status: 'Present',
    arrivalTime: '8:30 AM',
    allClasses: true,
    color: 'green',
    emoji: '✅',
  },
  {
    id: 4,
    date: 'Tuesday, October 17, 2023',
    status: 'Absent – Excused',
    missedClasses: ['Math', 'English', 'Science', 'Social Studies'],
    parentNote: 'Doctor appointment (Dr. Richardson)',
    note: 'Hope you feel better! We missed you in class 😊',
    color: 'red',
    emoji: '😷',
  },
  {
    id: 5,
    date: 'Thursday, October 12, 2023',
    status: 'Late Arrival',
    arrivalTime: '8:32 AM',
    standardTime: '8:00 AM',
    reason: 'Heavy traffic delay',
    verifiedBy: 'Ms. Roberts',
    note: 'Remember to leave home earlier! 🚗',
    color: 'yellow',
    emoji: '⏰',
  },
  {
    id: 6,
    date: 'Monday, October 9, 2023',
    status: 'Absent – Excused',
    missedClasses: ['Math', 'English', 'Art', 'Music'],
    parentNote: "Teacher didn't specify reason",
    color: 'red',
    emoji: '😔',
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Present': return 'bg-green-50 text-green-700 border-green-100';
    case 'Absent – Excused': return 'bg-red-50 text-red-600 border-red-100';
    case 'Late Arrival': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
    default: return 'bg-gray-50 text-gray-600 border-gray-100';
  }
};

const getCellStyle = (day) => {
  if (!day.status) return 'bg-gray-50/50 text-gray-300 cursor-default';
  if (day.today) return 'bg-blue-100 border-2 border-blue-400 text-blue-800 font-black';
  switch (day.status) {
    case 'present': return 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer';
    case 'absent': return 'bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer';
    case 'late': return 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 cursor-pointer';
    default: return 'bg-gray-50 text-gray-300 cursor-default';
  }
};

const getCellIcon = (status) => {
  if (!status) return null;
  if (status === 'present') return <CheckCircle className="w-3 h-3 mx-auto text-green-500 mt-0.5" />;
  if (status === 'absent') return <XCircle className="w-3 h-3 mx-auto text-red-400 mt-0.5" />;
  if (status === 'late') return <Clock className="w-3 h-3 mx-auto text-yellow-500 mt-0.5" />;
  return null;
};

const Attendance = () => {
  const [currentMonth] = useState('October 2023');

  const stats = [
    { label: 'Days Present', value: '48', icon: '✅', sub: 'Great job coming to school!', color: 'green' },
    { label: 'Days Absent', value: '2', icon: '❌', sub: 'Both excused absences', color: 'red' },
    { label: 'Times Late', value: '1', icon: '⏰', sub: 'Try to be on time!', color: 'yellow' },
    { label: 'Attendance Rate', value: '96%', icon: '🏆', sub: '⭐⭐⭐ Excellent!', color: 'blue', highlight: true },
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-6 sm:space-y-8 min-w-0"
      >
        {/* Header Banner */}
        <motion.section
          variants={itemVariants}
          className="bg-green-500 rounded-[32px] p-5 sm:p-8 text-white shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative">
            <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] opacity-90 mb-6 text-center">
              📅 My Attendance Record
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/20 backdrop-blur-md p-3 sm:p-5 rounded-2xl flex flex-col items-center text-center border border-white/10 group-hover:bg-white/30 transition-all shadow-sm"
                >
                  <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</span>
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-none">{stat.value}</h3>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase opacity-70 mt-1.5 whitespace-nowrap">{stat.label}</p>
                  <p className="text-[8px] sm:text-[9px] font-bold opacity-60 mt-1 leading-tight">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Calendar */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-[32px] p-5 sm:p-8 shadow-sm border border-gray-100"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm sm:text-base">
                {currentMonth}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <span className="text-xs font-bold text-gray-600 px-2">October</span>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-5">
            {[
              { label: 'Present', color: 'bg-green-400' },
              { label: 'Absent', color: 'bg-red-400' },
              { label: 'Late', color: 'bg-yellow-400' },
              { label: 'Today', color: 'bg-blue-400' },
              { label: 'Weekend', color: 'bg-gray-200' },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-[10px] font-bold text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-[9px] sm:text-[10px] font-black text-gray-400 uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-1 sm:p-2 text-center transition-all duration-200 min-h-[48px] sm:min-h-[56px] flex flex-col items-center justify-start pt-1.5 ${getCellStyle(day)}`}
              >
                <span className="text-[10px] sm:text-xs font-black">{day.day || ''}</span>
                {getCellIcon(day.status)}
                {day.time && (
                  <span className="text-[7px] sm:text-[8px] font-bold opacity-60 mt-0.5 leading-tight">{day.time}</span>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Attendance Details List */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm sm:text-base">
              My Attendance Details
            </h3>
          </div>

          <div className="space-y-4">
            {details.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden
                  ${item.color === 'green' ? 'border-l-4 border-l-green-400' : item.color === 'red' ? 'border-l-4 border-l-red-400' : 'border-l-4 border-l-yellow-400'}`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${getStatusStyle(item.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`} />
                    {item.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className={`text-2xl p-3 rounded-xl h-fit ${item.color === 'green' ? 'bg-green-50' : item.color === 'red' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-sm sm:text-base uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                      {item.date}
                    </h4>
                    {item.arrivalTime && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-500">
                          Arrival Time: <span className="text-gray-700">{item.arrivalTime}</span>
                          {item.standardTime && (
                            <span className="text-gray-400"> (Standard: {item.standardTime})</span>
                          )}
                        </span>
                      </div>
                    )}
                    {item.allClasses && (
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[11px] font-bold text-green-600">All classes attended ✔</span>
                      </div>
                    )}
                    {item.missedClasses && (
                      <div className="mt-2">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-wider mb-1.5">Classes missed:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.missedClasses.map((cls, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-black rounded border border-red-100 uppercase">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {item.reason && (
                  <div className="mb-3 bg-yellow-50/50 p-3 rounded-xl border border-yellow-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] font-black text-yellow-600 uppercase mb-0.5">Reason:</p>
                      <p className="text-[11px] font-bold text-yellow-800">{item.reason}</p>
                      {item.verifiedBy && (
                        <p className="text-[10px] font-bold text-yellow-600 mt-0.5">Verified by: {item.verifiedBy}</p>
                      )}
                    </div>
                  </div>
                )}

                {item.parentNote && (
                  <div className="mb-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-blue-700">
                      <span className="text-[9px] font-black uppercase text-blue-500 block mb-0.5">Parent Note:</span>
                      {item.parentNote}
                    </p>
                  </div>
                )}

                {item.note && (
                  <p className="text-[11px] font-bold text-gray-400 italic mt-2">
                    💬 {item.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Export Button */}
        <motion.section variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-100 active:scale-[0.98]">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </motion.section>

        {/* Footer Tip */}
        <motion.div
          variants={itemVariants}
          className="bg-green-600 text-white p-4 sm:p-6 rounded-2xl flex items-center gap-3 shadow-lg shadow-green-100"
        >
          <div className="bg-white/20 p-2 rounded-lg">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Flame className="w-5 h-5 text-yellow-300" />
            </motion.div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold">
              Coming to school every day helps you learn and grow! 🌟🎒
            </p>
            <p className="text-[10px] sm:text-xs font-black opacity-80 mt-0.5">You're doing an amazing job, Emma!</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full">
        <AttendaceRight />
      </div>
    </div>
  );
};

export default Attendance;
