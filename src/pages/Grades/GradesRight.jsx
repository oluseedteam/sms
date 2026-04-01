import React from 'react';
import { Award, CheckCircle, Download, Mail, Printer, Target, Star } from 'lucide-react';

const GradesRight = () => {
  const summary = [
    { label: "Subjects Taking", value: "6" },
    { label: "Average Grade", value: "B+ (89%)", highlight: true },
    { label: "Perfect Attendance", value: "12 days" },
  ];

  const badges = [
    { name: "Math Master", date: "Oct 15", icon: "📐", color: "bg-orange-100" },
    { name: "Reading Star", date: "Oct 10", icon: "📚", color: "bg-purple-100" },
    { name: "Science Explorer", date: "Oct 20", icon: "🧪", color: "bg-green-100" },
    { name: "Perfect Week", date: "Oct 5", icon: "⭐", color: "bg-yellow-100" },
  ];

  const goals = [
    { text: "Continue improving math speed", icon: "🧮" },
    { text: "Read 15 books this term", icon: "📖" },
    { text: "Practice spelling words daily", icon: "✍️" },
  ];

  return (
    <div className="space-y-6">
      {/* Term Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight">Term Summary</h3>
        </div>
        <div className="space-y-4">
          {summary.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-bold uppercase">{item.label}</span>
              <span className={`font-black ${item.highlight ? 'text-blue-600' : 'text-gray-800'}`}>{item.value}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-dashed border-gray-100">
             <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-black text-yellow-700 uppercase tracking-tighter">Honor Roll - Yes!</span>
             </div>
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight">Badges Earned</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
           {badges.map((badge, idx) => (
             <div key={idx} className="p-3 rounded-xl border border-gray-50 flex flex-col items-center text-center group hover:shadow-md transition-all">
                <span className={`text-2xl p-3 rounded-xl ${badge.color} mb-2 group-hover:scale-110 transition-transform`}>{badge.icon}</span>
                <p className="text-[10px] font-black text-gray-800 leading-tight uppercase tracking-tighter mb-1">{badge.name}</p>
                <p className="text-[9px] font-bold text-gray-400">{badge.date}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-100 space-y-3">
         <button className="w-full flex items-center justify-center gap-3 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            <Download className="w-4 h-4" /> Download PDF
         </button>
         <button className="w-full flex items-center justify-center gap-3 py-3 bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
            <Mail className="w-4 h-4" /> Email parents
         </button>
         <button className="w-full flex items-center justify-center gap-3 py-3 bg-blue-800 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
            <Printer className="w-4 h-4" /> Print Report
         </button>
      </div>

      {/* Next Term Goals */}
      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
         <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-gray-800 uppercase tracking-tight">Next Term Goals</h3>
        </div>
        <div className="space-y-4">
           {goals.map((goal, idx) => (
             <div key={idx} className="flex items-start gap-3">
                <span className="bg-white p-2 rounded-lg shadow-sm border border-orange-100">{goal.icon}</span>
                <p className="text-[11px] font-bold text-orange-900 leading-snug">{goal.text}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default GradesRight;
