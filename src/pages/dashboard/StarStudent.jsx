import { motion } from 'motion/react';

const StarStudent = () => {
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-[#ffc107] to-[#ff9800] p-6 rounded-3xl shadow-lg text-white text-center flex flex-col items-center justify-center relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <motion.p 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-black mb-5 flex items-center gap-2 tracking-widest drop-shadow-md uppercase"
            >
                ⭐ Star Student ⭐
            </motion.p>
            
            <div className="relative mb-6">
                <motion.div 
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                  className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm shadow-xl border border-white/30"
                >
                    <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt="Star Student"
                        className="w-[84px] h-[84px] object-cover rounded-xl shadow-inner"
                    />
                </motion.div>
                
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -left-6 top-0 text-yellow-200 text-2xl drop-shadow-lg"
                >
                  ★
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute -right-6 bottom-4 text-orange-100 text-xl drop-shadow-lg"
                >
                  ★
                </motion.div>
            </div>
            
            <motion.h4 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-black text-xl drop-shadow-lg uppercase tracking-tight"
            >
              Michael Chen
            </motion.h4>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1 italic">Week 8 Winner</p>
        </motion.div>
    )
}

export default StarStudent;