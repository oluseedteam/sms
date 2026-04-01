import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, PlusCircle, Printer,
  Download, RefreshCw, Calendar, Clock, CheckCircle2
} from 'lucide-react';
import TeacherCalendarRight from './TeacherCalendarRight';

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// October 2023 starts on Sunday
const calEvents = {
  2:  [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }],
  3:  [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }, { s:'Art',      t:'2:00', c:'bg-orange-200 text-orange-800' }],
  4:  [{ s:'English', t:'10:00',c:'bg-purple-200 text-purple-800' }, { s:'Social', t:'1:30', c:'bg-yellow-200 text-yellow-800' }],
  5:  [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Math HW', t:'Due', c:'bg-red-200 text-red-800' }],
  6:  [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }, { s:'Art',      t:'2:00', c:'bg-orange-200 text-orange-800' }],
  9:  [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }],
  10: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }],
  11: [{ s:'English', t:'10:00',c:'bg-purple-200 text-purple-800' }, { s:'Reading', t:'Due', c:'bg-red-200 text-red-800' }],
  12: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Social',  t:'1:30', c:'bg-yellow-200 text-yellow-800' }],
  13: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Art',     t:'2:00', c:'bg-orange-200 text-orange-800' }],
  16: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }],
  17: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }],
  18: [{ s:'English', t:'10:00',c:'bg-purple-200 text-purple-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }],
  19: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }],
  20: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }, { s:'Art',     t:'2:00', c:'bg-orange-200 text-orange-800' }],
  23: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }],
  24: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }, { s:'Project', t:'Due', c:'bg-red-200 text-red-800' }],
  25: [{ s:'English', t:'10:00',c:'bg-purple-200 text-purple-800' }, { s:'Conf.',  t:'2:30', c:'bg-pink-200 text-pink-800' }],
  26: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Social',  t:'1:30', c:'bg-yellow-200 text-yellow-800' }],
  27: [{ s:'All Day', t:'Field Trip', c:'bg-red-200 text-red-800' }, { s:'Math Test', t:'', c:'bg-blue-300 text-blue-900' }],
  30: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'English', t:'10:00', c:'bg-purple-200 text-purple-800' }],
  31: [{ s:'Math',    t:'8:30', c:'bg-blue-200 text-blue-800' }, { s:'Science', t:'12:30', c:'bg-green-200 text-green-800' }, { s:'Art',     t:'2:00', c:'bg-orange-200 text-orange-800' }, { s:'Project', t:'Due', c:'bg-red-200 text-red-800' }],
};

// Oct 1 2023 is a Sunday → offset 0
const calDays = [
  null, null, null, null, null, null, null,
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, null, null, null, null,
];

const viewTabs = ['Month', 'Week', 'Day', 'Agenda'];
const filterTabs = ['All Events', 'Classes', 'Assignments', 'School Events', 'Personal'];

const TeacherCalendar = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Month');
  const [activeFilter, setActiveFilter] = useState('All Events');
  
  const handleViewChange = (v) => {
    if (v === 'Week') {
      navigate('/teacher/calendar-second');
    } else {
      setActiveView(v);
    }
  };

  const summary = [
    { value: '23 classes',       sub: 'This month' },
    { value: '12 assignments',   sub: 'Due dates' },
    { value: '5 events',         sub: 'School events' },
    { value: 'Oct 30',           sub: 'Busiest day (6 events)' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Academic Calendar & Schedule</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-2xl text-xs hover:bg-blue-100 transition-all border border-blue-100">
              📅 Today
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <PlusCircle className="w-4 h-4" /> + Add Event
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex bg-white rounded-2xl border border-gray-100 shadow-sm p-1">
            {viewTabs.map(v => (
              <button key={v} onClick={() => handleViewChange(v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === v ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>
                {v}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterTabs.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${activeFilter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <button className="p-2 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">October 2023</h2>
            <button className="p-2 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-2">{d}</div>
            ))}
            {calDays.map((day, i) => {
              if (!day) return <div key={i} className="min-h-[80px]" />;
              const events = calEvents[day] || [];
              const isToday = day === 25;
              const isWeekend = i % 7 === 0 || i % 7 === 6;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`min-h-[80px] rounded-2xl p-1.5 cursor-pointer border transition-all ${
                    isToday ? 'ring-2 ring-blue-500 bg-blue-50' : isWeekend ? 'bg-gray-50 opacity-60' : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <p className={`text-[11px] font-bold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</p>
                  <div className="space-y-0.5">
                    {events.slice(0, 3).map((ev, ei) => (
                      <div key={ei} className={`text-[8px] font-bold px-1 py-0.5 rounded ${ev.c} truncate`}>
                        {ev.t && ev.t !== 'Due' && ev.t !== 'Field Trip' ? ev.t + ' ' : ''}{ev.s}
                      </div>
                    ))}
                    {events.length > 3 && (
                      <div className="text-[8px] text-gray-400 font-bold pl-1">+{events.length - 3} more</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100">
            {[
              { label: 'Print Month',    icon: Printer },
              { label: 'Export Calendar',icon: Download },
              { label: 'Subscribe to Feed', icon: RefreshCw },
              { label: '🔄 Sync with Google', icon: null },
            ].map((btn, i) => (
              <button key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all">
                {btn.icon && <btn.icon className="w-3.5 h-3.5" />}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {summary.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-base font-black text-gray-800">{s.value}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-72 w-full">
        <TeacherCalendarRight />
      </div>
    </div>
  );
};

export default TeacherCalendar;
