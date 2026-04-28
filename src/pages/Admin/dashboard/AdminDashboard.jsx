import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  HardHat, 
  FileText, 
  UserSquare2, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowDownRight,
  Loader2,
  BookOpen,
  Award,
  Briefcase
} from 'lucide-react';
import { getDashboardSummary } from '../../../services/dashboardService';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getDashboardSummary();
        setData(res.summary);
      } catch (error) {
        console.error("Failed to fetch dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { title: "Total Students", value: data?.total_students || "0", change: "+0%", up: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Teachers", value: data?.total_teachers || "0", change: "+0%", up: true, icon: HardHat, color: "text-green-600", bg: "bg-green-50" },
    { title: "Total Workers", value: data?.total_workers || "0", change: "+0%", up: true, icon: Briefcase, color: "text-teal-600", bg: "bg-teal-50" },
    { title: "Total Prefects", value: data?.total_prefects || "0", change: "+0%", up: true, icon: Award, color: "text-yellow-600", bg: "bg-yellow-50" },
    { title: "Total Classes", value: data?.total_classes || "0", change: "+0%", up: true, icon: UserSquare2, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Total Subjects", value: data?.total_subjects || "0", change: "+0%", up: true, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const attendanceData = data?.attendance_history || [
    { day: "MO", val: 0 },
    { day: "TU", val: 0 },
    { day: "WE", val: 0 },
    { day: "TH", val: 0 },
    { day: "FR", val: 0 },
  ];

  const maxVal = Math.max(...attendanceData.map(d => d.val), 10);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all group"
          >
            <p className="text-sm font-bold text-gray-500 mb-4">{s.title}</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black text-blue-900 tracking-tight mb-2">{s.value}</h3>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${s.up ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-500'}`}>
                   {s.change} <span className="opacity-60 normal-case font-bold tracking-normal italic ml-1">Live Update</span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${s.bg} ${s.color} transition-all group-hover:scale-110 shadow-sm shadow-blue-900/5`}>
                <s.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] p-4 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 md:mb-12 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-black text-blue-900 italic tracking-tight underline decoration-blue-100 decoration-4 underline-offset-8">General Student Attendance</h2>
          <div className="text-[10px] md:text-[11px] font-black text-gray-600 bg-gray-50 rounded-xl px-4 md:px-5 py-2 md:py-3 uppercase tracking-wider">
            Last 7 Days
          </div>
        </div>

        <div className="relative h-[250px] md:h-[320px] flex items-end justify-between px-2 md:px-16 border-b border-gray-50 pb-4 overflow-x-auto gap-4">
           {/* Grid lines (simulated) */}
           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2 md:pr-16 bg-gradient-to-t from-gray-50/20 to-transparent">
              {[100, 80, 60, 40, 20, 0].map(val => (
                <div key={val} className="flex items-center gap-2 md:gap-6 text-[10px] font-black text-gray-300">
                   <span className="w-6 md:w-8 text-right leading-none translate-y-[-1px] tabular-nums">{val}%</span>
                   <div className="flex-1 h-px bg-gray-100/30" />
                </div>
              ))}
           </div>

           {/* Bars */}
           {attendanceData.map((d, i) => (
             <div key={i} className="flex flex-col items-center justify-end h-full gap-2 md:gap-4 group relative z-10 flex-1 min-w-[40px] md:min-w-[60px] max-w-[80px]">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.val / maxVal) * 85 || 0}%` }}
                  transition={{ duration: 1.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-blue-900 rounded-t-xl md:rounded-t-2xl shadow-2xl shadow-blue-900/40 hover:bg-blue-800 transition-all cursor-pointer relative"
                >
                   <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl pointer-events-none italic whitespace-nowrap hidden md:group-hover:block transition-all z-20">
                         {d.val} Records
                      </motion.div>
                   </AnimatePresence>
                </motion.div>
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 group-hover:text-blue-900 transition-all uppercase tracking-widest italic">{d.day.slice(0,3)}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
