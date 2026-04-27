import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAuth } from "../../../hooks/useAuth";
import apiFetch from "../../../services/api";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { staggerChildren: 0.1, duration: 0.6, ease: "easeOut" }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

const Welcome = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await apiFetch('/dashboard/summary');
        setSummary(res.summary);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  const info = [
      { label: 'Average Score', value: summary ? `${summary.average_score_percent}%` : '...', icon: '⭐' }, 
      { label: 'Tracked Subjects', value: summary ? summary.subjects_tracked : '...', icon: '📚' },
      { label: 'Attendance', value: summary ? `${summary.attendance_rate}%` : '...', icon: '✅' }, 
      { label: 'Enrolled Classes', value: summary ? summary.my_classes : '...', icon: '🏫' }
  ];

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='bg-[#0b4b8a] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-white/5 relative overflow-hidden'
    >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        
        <motion.div variants={itemVariants} className="relative">
            <h2 className='text-2xl sm:text-3xl font-black mb-2 uppercase tracking-tight'>
              Welcome back, {user?.full_name || "Student"}! 👋
            </h2>
            <p className='text-xs sm:text-[15px] mb-8 opacity-90 flex items-center gap-2 font-bold'>
                📚 You have new homework assignments due this week
            </p>
        </motion.div>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 relative'>
            {info.map((item, index) => {
                return (
                    <motion.div 
                        key={index} 
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02, backgroundColor: "#3d7cc2" }}
                        className='bg-[#2c65a6] p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center cursor-pointer shadow-md border border-white/10 transition-colors'
                    >
                        <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 drop-shadow-lg">{item.icon}</div>
                        <span className='font-black text-xl sm:text-2xl mb-1'>
                            {item.value}
                        </span>
                        <span className='text-[10px] font-black uppercase text-blue-100/60 tracking-wider'>
                            {item.label}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    </motion.div>
  )
}

export default Welcome;