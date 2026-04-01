import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2, AlertTriangle, Clock, Trophy,
  ChevronLeft, ChevronRight, List, LayoutGrid,
  Save, Send
} from 'lucide-react';
import TeacherAttendanceRight from './TeacherAttendanceRight';

const allStudents = [
  { id: 1, name: 'Emma Johnson',  status: 'present', time: '8:26 AM' },
  { id: 2, name: 'Michael Chen',  status: 'present', time: '8:32 AM' },
  { id: 3, name: 'Sarah Williams',status: 'absent',  time: null, excused: true },
  { id: 4, name: 'David Martinez',status: 'late',    time: '8:55 AM' },
  { id: 5, name: 'Olivia Brown',  status: 'present', time: '8:28 AM' },
  { id: 6, name: 'Lucas Kim',     status: 'present', time: '8:40 AM' },
  { id: 7, name: 'Sophia Taylor', status: 'present', time: '5:30 AM' },
  { id: 8, name: 'Ethan Wilson',  status: 'present', time: '8:47 AM' },
];

const statusConfig = {
  present: { label: 'Present', icon: CheckCircle2, ring: 'ring-green-400', bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-400' },
  absent:  { label: 'Absent',  icon: AlertTriangle, ring: 'ring-red-400',   bg: 'bg-red-50',    text: 'text-red-500',    dot: 'bg-red-400' },
  late:    { label: 'Late',    icon: Clock,          ring: 'ring-orange-400',bg: 'bg-orange-50', text: 'text-orange-500', dot: 'bg-orange-400' },
};

const calDays = [
  null, null, null, null, null, null, null,
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, null, null, null, null,
];

const calPct = { 2:'96%',3:'96%',4:'96%',5:'88%',6:'96%',9:'96%',10:'96%',11:'96%',12:'96%',13:'96%',16:'96%',17:'96%',18:'100%',19:'96%',20:'96%',23:'96%',24:'96%',25:'96%' };

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(allStudents);
  const [view, setView] = useState('grid');

  const toggle = (id, nextStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s));
  };

  const presentCount  = students.filter(s => s.status === 'present').length;
  const lateCount     = students.filter(s => s.status === 'late').length;

  const stats = [
    { label: 'Present Today',     value: `${presentCount}/${students.length}`, sub: '96% attendance rate', icon: CheckCircle2, bg: 'bg-green-50', iconColor: 'text-green-500' },
    { label: 'Absences This Week',value: '3',   sub: '2 excused, 1 unexcused', icon: AlertTriangle, bg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: 'On-Time Arrival',   value: `${presentCount}/${students.length}`,  sub: '93% punctuality', icon: Clock, bg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Class Average',     value: '95.8%', sub: 'Excellent standing', icon: Trophy, bg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Attendance Tracking – Grade 4B</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">📅 Wednesday, October 25, 2023</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <CheckCircle2 className="w-4 h-4" /> Take Attendance
            </button>
            <button 
              onClick={() => navigate('/teacher/attendance-second')}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white"
            >
              View Reports
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white">
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
            >
              <div className={`w-10 h-10 rounded-2xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
              <p className="text-2xl font-black text-gray-800">{s.value}</p>
              <p className="text-xs font-bold text-gray-600 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-800">Today's Attendance – October 25, 2023</h2>
            <div className="flex gap-2">
              <button onClick={() => setView('grid')} className={`p-2 rounded-xl border ${view === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-500'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-xl border ${view === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-500'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 font-bold rounded-2xl text-xs hover:bg-green-100 transition-all">
              <CheckCircle2 className="w-4 h-4" /> Mark All Present
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 font-bold rounded-2xl text-xs hover:bg-red-100 transition-all">
              Record Absences
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-600 font-bold rounded-2xl text-xs hover:bg-orange-100 transition-all">
              Record Late Arrivals
            </button>
          </div>

          {view === 'grid' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {students.map(s => {
                const sc = statusConfig[s.status];
                const Icon = sc.icon;
                const statuses = ['present', 'absent', 'late'];
                const next = statuses[(statuses.indexOf(s.status) + 1) % 3];
                return (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -2 }}
                    onClick={() => toggle(s.id, next)}
                    className={`flex flex-col items-center p-4 rounded-3xl border-2 cursor-pointer transition-all ${sc.ring} ring-2 ${sc.bg}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gray-100 to-gray-50 shadow-sm flex items-center justify-center font-bold text-gray-600 text-sm mb-3">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="text-xs font-bold text-gray-800 text-center leading-tight">{s.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-500 text-center leading-tight truncate max-w-full">{s.name.split(' ').slice(1).join(' ')}</p>
                    <div className={`flex items-center gap-1 mt-2 ${sc.text}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">{sc.label}</span>
                    </div>
                    {s.time && <p className="text-[9px] text-gray-400 mt-0.5">{s.time}</p>}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* List view */}
          {view === 'list' && (
            <div className="space-y-2">
              {students.map(s => {
                const sc = statusConfig[s.status];
                const Icon = sc.icon;
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="flex-1 text-sm font-bold text-gray-800">{s.name}</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${sc.bg} ${sc.text}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">{sc.label}</span>
                      {s.time && <span className="text-[10px] opacity-70">{s.time}</span>}
                    </div>
                    <div className="flex gap-1.5">
                      {['present', 'absent', 'late'].map(st => (
                        <button
                          key={st}
                          onClick={() => toggle(s.id, st)}
                          className={`w-2 h-2 rounded-full transition-all ${s.status === st ? statusConfig[st].dot : 'bg-gray-200 hover:bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-500">Students marked: {presentCount + lateCount}/{students.length} • Draft saved at 8:47 AM</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all">
              <Save className="w-4 h-4" /> Save Attendance
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 shadow-lg shadow-green-100 transition-all">
              <Send className="w-4 h-4" /> Submit to Office
            </button>
          </div>
        </div>

        {/* Monthly calendar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-800">October 2023 Attendance</h2>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-blue-600 px-2">October</span>
              <button className="p-1.5 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold">Today</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
            ))}
            {calDays.map((day, i) => {
              if (!day) return <div key={i} />;
              const pct = calPct[day];
              const isToday = day === 25;
              const isWeekend = i % 7 === 0 || i % 7 === 6;
              return (
                <div
                  key={i}
                  className={`rounded-xl p-1.5 text-center cursor-pointer transition-all ${
                    isToday ? 'ring-2 ring-blue-500 shadow-lg' :
                    isWeekend ? 'opacity-40' : 'hover:bg-gray-50'
                  } ${pct ? 'bg-green-50' : 'bg-white'}`}
                >
                  <p className={`text-xs font-bold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</p>
                  {pct && <p className="text-[8px] text-green-600 font-bold">{pct}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-72 w-full">
        <TeacherAttendanceRight />
      </div>
    </div>
  );
};

export default TeacherAttendance;
