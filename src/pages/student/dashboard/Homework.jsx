import { CalendarDays, ListTodo } from 'lucide-react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Homework = () => {
  const homework = [
    {
      head: "Mathematics",
      title: "Math Practice Sheet",
      btn: "Start",
      info: "Due Tomorrow",
      theme: { border: "border-orange-400", badgeBg: "bg-orange-400" },
      urgent: true,
      status: "To Do",
      statusTheme: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500" }
    },
    {
      head: "English",
      title: "Reading Log",
      btn: "Continue",
      info: "Due Friday",
      theme: { border: "border-purple-600", badgeBg: "bg-purple-600" },
      urgent: false,
      status: "In Progress",
      statusTheme: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-600" }
    },
    {
      head: "Science",
      title: "Science Project",
      btn: "Start",
      info: "Due Next Week",
      theme: { border: "border-green-500", badgeBg: "bg-green-500" },
      urgent: false,
      status: "To Do",
      statusTheme: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500" }
    },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-xl">
          <ListTodo className="w-5 h-5 text-blue-800" strokeWidth={2.5} />
        </div>
        <h3 className="font-black text-xl text-[#1e3a8a] uppercase tracking-tight">My Homework</h3>
      </div>

      <div className="space-y-4">
        {homework.map((hw, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: -5 }}
            className={`flex justify-between items-center p-5 rounded-2xl bg-slate-50 border-l-4 transition-all cursor-pointer hover:shadow-md hover:bg-white ${hw.theme.border}`}
          >
            <div className="flex flex-col items-start gap-2.5">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest ${hw.theme.badgeBg}`}>
                {hw.head}
              </span>
              <h4 className="font-black text-base text-[#1e3a8a] uppercase tracking-tight leading-tight">
                {hw.title}
              </h4>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 text-[10px] font-bold ${hw.urgent ? 'text-red-500' : 'text-gray-400'}`}>
                  <CalendarDays className="w-3.5 h-3.5 opacity-60" strokeWidth={2.5} />
                  {hw.info}
                </span>
                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight ${hw.statusTheme.bg} ${hw.statusTheme.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${hw.statusTheme.dot}`}></span>
                  {hw.status}
                </span>
              </div>
            </div>
            <button className="bg-[#0a5c9a] hover:bg-black transition-all text-white font-black px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest shadow-md active:scale-95">
              {hw.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Homework;