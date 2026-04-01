import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  HardHat, 
  FileText, 
  UserSquare2, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Student", value: "500", change: "+6%", up: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Workers", value: "7,000", change: "+6%", up: true, icon: HardHat, color: "text-green-600", bg: "bg-green-50" },
    { title: "Ex Student", value: "7", change: "+0%", up: true, icon: UserSquare2, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Total Admin", value: "7", change: "+0%", up: true, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const attendanceData = [
    { day: "SUNDAY",    val: 20 },
    { day: "MONDAY",    val: 120 },
    { day: "TUESDAY",   val: 30 },
    { day: "WEDNESDAY", val: 90 },
    { day: "THURSDAY",  val: 55 },
    { day: "FRIDAY",    val: 50 },
    { day: "SATURDAY",  val: 80 },
  ];

  const transactions = [
    { id: "152378", name: "Kutch Green", channel: "Card", amount: "₦30,000", status: "Completed" },
    { id: "135378", name: "Frida Ports",  channel: "POS",  amount: "₦30,000", status: "Processing" },
    { id: "135378", name: "Frida Ports",  channel: "POS",  amount: "₦30,000", status: "Processing" },
    { id: "135378", name: "Frida Ports",  channel: "POS",  amount: "₦30,000", status: "Processing" },
  ];

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
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${s.up ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'}`}>
                   {s.change} <span className="opacity-60 normal-case font-bold tracking-normal italic ml-1">Vs Last Month</span>
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
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xl font-black text-blue-900 italic tracking-tight underline decoration-blue-100 decoration-4 underline-offset-8">General Student Attendance</h2>
          <select className="bg-gray-50 border border-gray-200 text-[11px] font-black text-gray-600 rounded-xl px-5 py-3 outline-none hover:bg-white transition-all cursor-pointer shadow-sm uppercase tracking-wider">
            <option>Last 7 Days</option>
            <option>Last Month</option>
          </select>
        </div>

        <div className="relative h-[320px] flex items-end justify-between px-16 border-b border-gray-50 pb-4">
           {/* Grid lines (simulated) */}
           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-16 bg-gradient-to-t from-gray-50/20 to-transparent">
              {[130, 120, 100, 80, 60, 40, 20, 0].map(val => (
                <div key={val} className="flex items-center gap-6 text-[10px] font-black text-gray-300">
                   <span className="w-8 text-right leading-none translate-y-[-1px] tabular-nums">{val}</span>
                   <div className="flex-1 h-px bg-gray-100/30" />
                </div>
              ))}
           </div>

           {/* Bars */}
           {attendanceData.map((d, i) => (
             <div key={i} className="flex flex-col items-center justify-end h-full gap-4 group relative z-10 w-24">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.val / 130) * 85}%` }}
                  transition={{ duration: 1.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[48px] bg-blue-900 rounded-t-2xl shadow-2xl shadow-blue-900/40 hover:bg-blue-800 transition-all cursor-pointer relative"
                >
                   <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl pointer-events-none italic whitespace-nowrap hidden group-hover:block transition-all z-20">
                         {d.val} Students
                      </motion.div>
                   </AnimatePresence>
                </motion.div>
                <p className="text-[10px] font-black text-gray-400 group-hover:text-blue-900 transition-all uppercase tracking-widest italic">{d.day}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <h2 className="text-xl font-black text-blue-900 italic tracking-tighter underline decoration-blue-100 decoration-4 underline-offset-8">Recent Transactions</h2>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:w-80 group">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search by name" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-medium text-gray-700 outline-none focus:bg-white focus:border-blue-200 focus:shadow-xl transition-all"
                  />
               </div>
               <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all text-xs font-black text-blue-900 italic shadow-sm">
                 Filter <Filter className="w-3.5 h-3.5" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-6 px-4">Student ID</th>
                    <th className="pb-6 px-4">Student Name</th>
                    <th className="pb-6 px-4">Payment Channel</th>
                    <th className="pb-6 px-4">Amount</th>
                    <th className="pb-6 px-4">Status</th>
                    <th className="pb-6 px-4">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-xs">
                  {transactions.map((t, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="hover:bg-gray-50/70 transition-all group"
                    >
                       <td className="py-6 px-4 font-bold text-gray-800 tabular-nums">{t.id}</td>
                       <td className="py-6 px-4 font-bold text-gray-800 italic">{t.name}</td>
                       <td className="py-6 px-4 font-bold text-gray-800">{t.channel}</td>
                       <td className="py-6 px-4 font-black text-blue-900 italic">{t.amount}</td>
                       <td className="py-6 px-4">
                          <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-tight ${
                            t.status === 'Completed' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100/50' 
                              : 'bg-purple-100/60 text-purple-700 border border-purple-200/50'
                          }`}>
                            {t.status}
                          </span>
                       </td>
                       <td className="py-6 px-4">
                          <button className="p-2 text-gray-300 hover:text-blue-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 shadow-sm">
                             <MoreVertical className="w-4 h-4" />
                          </button>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="flex justify-center mt-12">
            <motion.button 
               whileHover={{ y: -3, boxShadow: '0 20px 40px -10px rgba(30,58,138,0.3)' }}
               whileTap={{ scale: 0.98 }}
               className="px-12 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 transition-all italic"
            >
               See More
            </motion.button>
         </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
