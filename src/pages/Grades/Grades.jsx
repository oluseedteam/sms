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
  Calendar,
  User,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import GradesRight from './GradesRight';

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
  const subjects = [
    {
      title: "Mathematics",
      teacher: "Mrs. Anderson",
      grade: "B+",
      percentage: "89",
      color: "orange",
      scores: [
        { label: "Class Participation", grade: "A", stars: 4 },
        { label: "Homework", grade: "B+", stars: 3 },
        { label: "Tests", grade: "B", stars: 2 },
        { label: "Projects", grade: "A-", stars: 4 },
      ],
      comment: "Emma is working hard and showing improvement in problem-solving! I'm proud of her effort.",
      goldStars: 28,
      icon: <Calculator className="w-5 h-5 text-orange-500" />
    },
    {
      title: "English Language Arts",
      teacher: "Mr. Wilson",
      grade: "A-",
      percentage: "91",
      color: "purple",
      scores: [
        { label: "Reading", grade: "A", stars: 4 },
        { label: "Writing", grade: "A-", stars: 4 },
        { label: "Speaking & Listening", grade: "A", stars: 5 },
        { label: "Spelling", grade: "B+", stars: 3 },
      ],
      comment: "Emma's creative writing is wonderful! She loves reading and sharing stories with the class.",
      goldStars: 35,
      icon: <BookOpen className="w-5 h-5 text-purple-500" />
    },
    {
      title: "Science",
      teacher: "Ms. Parker",
      grade: "A",
      percentage: "93",
      color: "green",
      scores: [
        { label: "Knowledge", grade: "A", stars: 5 },
        { label: "Lab Work", grade: "A", stars: 4 },
        { label: "Science Fair Project", grade: "A+", stars: 5 },
      ],
      comment: "Emma asks great questions and loves experiments! Her curiosity is fantastic.",
      goldStars: 32,
      icon: <Microscope className="w-5 h-5 text-green-500" />
    },
    {
      title: "Social Studies",
      teacher: "Mr. David Kim",
      grade: "B+",
      percentage: "88",
      color: "blue",
      scores: [
        { label: "Community Helpers", grade: "A-", stars: 4 },
        { label: "Map Skills", grade: "B+", stars: 3 },
        { label: "Projects", grade: "B+", stars: 3 },
      ],
      comment: "Good understanding of community helpers and map skills. Emma works well in group projects.",
      goldStars: 25,
      icon: <Globe className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Art",
      teacher: "Mrs. Emily Chen",
      grade: "A",
      percentage: "95",
      color: "pink",
      scores: [
        { label: "Creativity", grade: "A", stars: 5 },
        { label: "Technique", grade: "A", stars: 4 },
        { label: "Effort", grade: "A", stars: 5 },
      ],
      comment: "Emma is very creative and tries new techniques! Her artwork is beautiful and expressive.",
      goldStars: 18,
      icon: <Palette className="w-5 h-5 text-pink-500" />
    },
    {
      title: "Physical Education",
      teacher: "Coach Mike Torres",
      grade: "A-",
      percentage: "92",
      color: "orange-600",
      scores: [
        { label: "Participation", grade: "A", stars: 4 },
        { label: "Teamwork", grade: "A", stars: 5 },
        { label: "Sportsmanship", grade: "A-", stars: 4 },
      ],
      comment: "Great teamwork and sportsmanship! Emma encourages her classmates and tries her best.",
      goldStars: 15,
      icon: <Dumbbell className="w-5 h-5 text-orange-600" />
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-6 sm:space-y-8 min-w-0"
      >
        
        {/* Overall Performance */}
        <motion.section variants={itemVariants} className="bg-yellow-400 rounded-[32px] p-5 sm:p-10 text-white shadow-xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
           
           <div className="relative space-y-6 sm:space-y-8">
              <div className="text-center">
                 <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] opacity-90 mb-2">⭐ Overall Performance ⭐</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Overall Grade", value: "Very Good", icon: "😊" },
                  { label: "Class Rank", value: "8 of 30", icon: "🏆" },
                  { label: "Gold Stars", value: "145", icon: "⭐" },
                  { label: "Attendance", value: "96%", icon: "✅" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md p-3 sm:p-5 rounded-2xl flex flex-col items-center text-center border border-white/10 group-hover:bg-white/30 transition-all shadow-sm">
                     <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</span>
                     <h3 className="text-xs sm:text-base xl:text-lg font-black tracking-tight leading-none">{stat.value}</h3>
                     <p className="text-[8px] sm:text-[10px] font-black uppercase opacity-70 mt-1.5 whitespace-nowrap">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/10 text-center text-[10px] sm:text-sm italic font-bold leading-relaxed shadow-inner">
                 "Emma is doing excellent work and is a joy to have in class! She participates enthusiastically and helps her classmates. Keep up the wonderful work!"
                 <p className="mt-2 not-italic opacity-80 text-[9px] sm:text-xs">— Miss Roberts, Class Teacher</p>
              </div>
           </div>
        </motion.section>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
           {subjects.map((item, idx) => (
             <div 
                key={idx} 
                className={`bg-white rounded-[32px] p-5 sm:p-7 shadow-sm border border-gray-100 border-l-8 
                  ${item.color === 'orange' ? 'border-l-orange-400' : 
                    item.color === 'purple' ? 'border-l-purple-400' : 
                    item.color === 'green' ? 'border-l-green-400' : 
                    item.color === 'blue' ? 'border-l-blue-400' : 
                    item.color === 'pink' ? 'border-l-pink-400' : 'border-l-orange-600'} 
                  group hover:shadow-xl transition-all duration-500 relative overflow-hidden`}
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-3 sm:p-4 rounded-2xl shadow-sm ${item.color === 'orange' ? 'bg-orange-50' : item.color === 'purple' ? 'bg-purple-50' : item.color === 'green' ? 'bg-green-50' : item.color === 'blue' ? 'bg-blue-50' : item.color === 'pink' ? 'bg-pink-50' : 'bg-orange-50'}`}>
                         {item.icon}
                      </div>
                      <div>
                         <h3 className="font-black text-xs sm:text-sm lg:text-base text-gray-800 uppercase tracking-tight leading-tight">{item.title}</h3>
                         <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 mt-0.5">🧑‍🏫 {item.teacher}</p>
                      </div>
                   </div>
                </div>

                <div className="text-center mb-6 py-2 bg-gray-50/50 rounded-3xl border border-gray-50 shadow-inner">
                   <h2 className={`text-4xl sm:text-5xl font-black ${item.color === 'orange' ? 'text-orange-500' : item.color === 'purple' ? 'text-purple-500' : item.color === 'green' ? 'text-green-500' : item.color === 'blue' ? 'text-blue-500' : item.color === 'pink' ? 'text-pink-500' : 'text-orange-600'}`}>{item.grade}</h2>
                   <div className="h-2 w-3/4 mx-auto bg-white rounded-full overflow-hidden mt-4 border border-gray-100 shadow-sm">
                      <div className={`h-full rounded-full ${item.color === 'orange' ? 'bg-orange-500' : item.color === 'purple' ? 'bg-purple-500' : item.color === 'green' ? 'bg-green-500' : item.color === 'blue' ? 'bg-blue-500' : item.color === 'pink' ? 'bg-pink-500' : 'bg-orange-600'}`} style={{ width: `${item.percentage}%` }}></div>
                   </div>
                   <p className="text-[9px] font-black mt-2 text-gray-400 uppercase tracking-widest">{item.percentage}/100</p>
                </div>

                <div className="space-y-4 mb-8 px-1">
                   {item.scores.map((score, sIdx) => (
                     <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold">
                           <span className="text-gray-400 uppercase tracking-tight">{score.label}</span>
                           <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-gray-900 font-black">{score.grade}</span>
                              <div className="flex gap-0.5">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${i < score.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-100 fill-gray-100'}`} />
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-100 relative group-hover:bg-white transition-all shadow-sm">
                   <p className="text-[11px] sm:text-xs text-gray-500 font-bold leading-relaxed italic line-clamp-3">
                     "{item.comment}"
                   </p>
                </div>

                <div className="text-center pt-2">
                   <span className="text-[9px] sm:text-[10px] font-black text-yellow-600 bg-yellow-50 px-4 py-1.5 rounded-full uppercase flex items-center justify-center gap-2 border border-yellow-100">
                      <Star className="w-3 h-3 fill-yellow-500" /> {item.goldStars} Gold Stars
                   </span>
                </div>
             </div>
           ))}
        </div>

        {/* Parent Signature */}
        <motion.section variants={itemVariants} className="bg-white rounded-[32px] p-5 sm:p-10 shadow-sm border border-gray-100 space-y-6 sm:space-y-8">
           <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl">👩‍👦</span>
              <h2 className="text-base sm:text-xl font-black text-gray-800 uppercase tracking-tight">Parent/Guardian Signature:</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase ml-1">Full Name</label>
                 <input type="text" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-100 rounded-2xl p-4 text-sm font-bold focus:ring-0 transition-all shadow-inner" placeholder="Type name here" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase ml-1">Date</label>
                 <input type="date" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-100 rounded-2xl p-4 text-sm font-bold focus:ring-0 transition-all shadow-inner" />
              </div>
           </div>

           <label className="flex items-center gap-3 cursor-pointer group p-4 bg-blue-50/50 rounded-2xl border border-blue-100 transition-colors hover:bg-blue-50">
              <input type="checkbox" className="w-5 h-5 rounded border-blue-200 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span className="text-[11px] sm:text-sm font-bold text-blue-900/70 group-hover:text-blue-700 transition-colors">I have reviewed this report card with my child</span>
           </label>

           <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-100 active:scale-[0.98]">
              Submit Signature
           </button>
        </motion.section>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center pt-8 px-4">
           <p className="text-xs sm:text-lg font-black text-green-600 tracking-tight leading-loose">
              Great job this term, Emma! Keep up the wonderful work! ✨🙌
           </p>
        </motion.div>
      </motion.div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full">
         <GradesRight />
      </div>
    </div>
  );
};

export default Grades;
