import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, PlusCircle, Printer,
  Download, RefreshCw, Calendar, Clock, CheckCircle2, Loader2
} from 'lucide-react';
import TeacherCalendarRight from './TeacherCalendarRight';
import { getCalendarEvents } from '../../../services/calendarService';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const TeacherCalendar = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Month');
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // October 2023 for demo

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getCalendarEvents();
        setEvents(res.data || res);
      } catch (error) {
        console.error("Failed to fetch calendar events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Helper to generate calendar days
  const generateCalDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  };

  const calDays = generateCalDays();

  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(e => {
      const eDate = new Date(e.start_time);
      return eDate.getDate() === day && eDate.getMonth() === currentDate.getMonth() && eDate.getFullYear() === currentDate.getFullYear();
    });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Academic Calendar & Schedule</h1>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            <PlusCircle className="w-4 h-4" /> + Add Event
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <button className="p-2 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <button className="p-2 rounded-xl border border-gray-200 hover:border-blue-200 text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-2">{d}</div>
            ))}
            {calDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="min-h-[80px]" />;
              const dayEvents = getEventsForDay(day);
              const isToday = day === 25 && currentDate.getMonth() === 9; // Demo today
              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.02 }}
                  className={`min-h-[80px] rounded-2xl p-1.5 cursor-pointer border transition-all ${
                    isToday ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <p className={`text-[11px] font-bold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</p>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev, ei) => (
                      <div key={ei} className="text-[8px] font-bold px-1 py-0.5 rounded bg-blue-100 text-blue-700 truncate">
                        {new Date(ev.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[8px] text-gray-400 font-bold pl-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:w-72 w-full">
        <TeacherCalendarRight />
      </div>
    </div>
  );
};

export default TeacherCalendar;
