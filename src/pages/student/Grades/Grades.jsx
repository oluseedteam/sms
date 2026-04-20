import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Star, 
  Percent,
  BookOpen,
  Calculator,
  Microscope,
  Globe,
  Palette,
  Dumbbell,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import GradesRight from './GradesRight';
import apiFetch from '../../../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Grades = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await apiFetch('/my/results');
        setResults(res.data || res);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Grouping results by subject
  const groupedResults = results.reduce((acc, curr) => {
    const subjectName = curr.subject?.name || 'General';
    if (!acc[subjectName]) acc[subjectName] = [];
    acc[subjectName].push(curr);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-6 sm:space-y-8 min-w-0"
      >
        <motion.section variants={itemVariants} className="bg-yellow-400 rounded-[32px] p-5 sm:p-10 text-white shadow-xl relative overflow-hidden group">
           <div className="relative space-y-6">
              <div className="text-center">
                 <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] opacity-90 mb-2">⭐ My Grade Report ⭐</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center">
                    <Trophy className="w-6 h-6 mb-2" />
                    <h3 className="text-xl font-black">{results.length}</h3>
                    <p className="text-[10px] font-black uppercase opacity-70">Assessments</p>
                 </div>
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center">
                    <Star className="w-6 h-6 mb-2" />
                    <h3 className="text-xl font-black">
                       {results.length > 0 ? (results.reduce((s, r) => s + r.score, 0) / results.length).toFixed(1) : 'N/A'}
                    </h3>
                    <p className="text-[10px] font-black uppercase opacity-70">Avg Score</p>
                 </div>
              </div>
           </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {Object.keys(groupedResults).map((subject, idx) => (
             <div key={idx} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all border-l-8 border-l-blue-400">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-3 bg-blue-50 rounded-2xl">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                   </div>
                   <h3 className="font-black text-gray-800 uppercase tracking-tight">{subject}</h3>
                </div>
                <div className="space-y-3">
                   {groupedResults[subject].map((r, i) => (
                     <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div>
                           <p className="text-xs font-bold text-gray-700">{r.assessment_name || 'Assignment'}</p>
                           <p className="text-[9px] text-gray-400 uppercase">{new Date(r.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-blue-600">{r.score}</p>
                           <p className="text-[8px] font-bold text-gray-400">SCORE</p>
                        </div>
                     </div>
                   ))}
                </div>
                {groupedResults[subject][0]?.remarks && (
                   <div className="mt-4 p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 italic">
                      "{groupedResults[subject][0].remarks}"
                   </div>
                )}
             </div>
           ))}
           {results.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 italic">
                 No grade records found.
              </div>
           )}
        </div>
      </motion.div>

      <div className="lg:w-80 w-full">
         <GradesRight />
      </div>
    </div>
  );
};

export default Grades;
