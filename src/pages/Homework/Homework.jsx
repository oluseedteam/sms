import React, { useState } from 'react';
import { 
  ClipboardList, 
  Calendar, 
  ChevronRight, 
  FileText, 
  BookOpen, 
  FlaskConical, 
  Calculator, 
  CheckCircle,
  Clock,
  ExternalLink,
  Flame,
  Star,
  Info
} from 'lucide-react';
import HomeworkRight from './HomeworkRight';

import { useNavigate } from 'react-router-dom';

const Homework = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Homework');

  const handleStart = (id) => {
    if (id === 1) navigate('detail');
  };

  const homework = [
    {
      id: 1,
      title: "Math Practice Sheet - Addition Problems",
      subject: "Mathematics",
      teacher: "Mrs. Anderson",
      assigned: "Monday, Oct 23",
      due: "Tomorrow (Thursday, Oct 26)",
      description: "Complete pages 24-25 in your workbook. Show all your work! Remember to check your answers when you're done.",
      status: "To Do",
      color: "orange",
      attachment: "Worksheet.pdf",
      icon: <Calculator className="w-5 h-5 text-orange-500" />
    },
    {
      id: 2,
      title: "Reading Log - Chapter 3",
      subject: "English Language Arts",
      teacher: "Mr. Wilson",
      assigned: "Tuesday, Oct 24",
      due: "Friday, Oct 27",
      description: "Read Chapter 3 and answer the questions in your notebook. Think about the main characters and what they learned!",
      status: "In Progress",
      progress: 50,
      color: "purple",
      attachments: ["Chapter3.pdf", "Questions.pdf"],
      icon: <BookOpen className="w-5 h-5 text-purple-500" />
    },
    {
      id: 3,
      title: "Draw and Label Plant Parts",
      subject: "Science",
      teacher: "Ms. Parker",
      assigned: "Wednesday, Oct 25",
      due: "Next Tuesday, Oct 31 (6 days left)",
      description: "Draw a plant and label the roots, stem, leaves, and flower. Use colors to make your drawing beautiful! 🌱",
      materials: "Colored pencils, drawing paper",
      status: "To Do",
      color: "green",
      icon: <FlaskConical className="w-5 h-5 text-green-500" />
    },
    {
      id: 4,
      title: "Weekly Reading Log",
      subject: "English",
      teacher: "Mr. Wilson",
      status: "Completed",
      submitted: "Yesterday at 4:30 PM",
      feedback: "Great job, Emma! I love how you described your favorite part of the story. Keep up the excellent work!",
      grade: "Excellent",
      color: "green",
      stars: 3,
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      id: 5,
      title: "Practice Spelling Words - Week 8",
      subject: "English",
      teacher: "Mr. Wilson",
      assigned: "Monday, Oct 23",
      due: "Friday, Oct 27",
      description: "Practice writing each word 5 times. Have someone test you! Study hard for Friday's spelling quiz. 📝",
      words: ["astronaut", "dinosaur", "library", "principal", "science", "+ 5 more words"],
      status: "To Do",
      color: "blue",
      icon: <ClipboardList className="w-5 h-5 text-blue-500" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Completed': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0 scroll-smooth">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6 sm:space-y-8 min-w-0">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto pb-2 no-scrollbar ">
          {[
            { name: 'All Homework', count: 5 },
            { name: 'To Do', count: 3 },
            { name: 'In Progress', count: 2 },
            { name: 'Completed', count: 3 }
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 sm:px-6 py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-300 shadow-sm border whitespace-nowrap flex items-center gap-2
                ${activeTab === tab.name 
                  ? 'bg-blue-600 text-white border-blue-600 sm:scale-105 shadow-blue-200' 
                  : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeTab === tab.name ? 'bg-white' : tab.name === 'To Do' ? 'bg-orange-400' : tab.name === 'In Progress' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
              {tab.name} <span className="opacity-60 font-black text-[10px]">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Homework List */}
        <div className="space-y-6 pb-20">
          {homework.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${getStatusColor(item.status)}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Completed' ? 'bg-green-500' : item.status === 'In Progress' ? 'bg-blue-500' : 'bg-orange-500'} animate-pulse`}></div>
                  {item.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                <div className={`p-4 rounded-xl h-fit w-fit ${item.color === 'orange' ? 'bg-orange-50' : item.color === 'purple' ? 'bg-purple-50' : item.color === 'green' ? 'bg-green-50' : 'bg-blue-50'}`}>
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-xl font-black text-gray-800 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.color === 'orange' ? 'bg-orange-500 text-white' : item.color === 'purple' ? 'bg-purple-500 text-white' : item.color === 'green' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {item.subject}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-bold flex items-center gap-1">
                      🧑‍🏫 {item.teacher}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="font-bold">Assigned: <span className="text-gray-400 font-medium">{item.assigned || "---"}</span></span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
                   <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                   <span className="font-bold">Due: <span className="text-red-500">{item.due || item.submitted}</span></span>
                </div>
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed bg-blue-50/30 p-4 rounded-xl border-l-4 border-blue-200">
                  {item.description}
                </p>
              )}

              {item.progress && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[10px] font-black uppercase text-blue-600 tracking-wider">
                    <span>{item.progress}% Complete</span>
                    <span>Keep Going! 🚀</span>
                  </div>
                  <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden border border-blue-100">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              )}

              {item.materials && (
                <div className="mb-6 bg-orange-50/50 p-3 rounded-xl border border-orange-100 flex items-start gap-2">
                   <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                   <p className="text-[11px] sm:text-xs font-bold text-orange-700">
                     <span className="uppercase text-[9px] block mb-0.5 opacity-60">Materials needed:</span>
                     {item.materials}
                   </p>
                </div>
              )}

              {item.feedback && (
                <div className="mb-6 p-4 bg-yellow-50/50 rounded-xl border border-yellow-100 relative">
                   <p className="text-xs sm:text-sm italic font-bold text-yellow-800 mb-2 leading-relaxed">
                     "{item.feedback}"
                   </p>
                   <div className="flex gap-1">
                     {[...Array(item.stars)].map((_, i) => (
                       <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                     ))}
                   </div>
                   <div className="absolute -top-3 right-4 bg-white border border-yellow-100 px-3 py-1 rounded-full text-[10px] font-black text-yellow-600 uppercase shadow-sm">
                      Grade: {item.grade} 😎
                   </div>
                </div>
              )}

              {item.words && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.words.map((word, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase border border-blue-100 hover:scale-105 transition-transform cursor-default">
                      {word}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {item.attachment && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl text-[10px] font-black text-gray-600 uppercase">
                    <FileText className="w-3.5 h-3.5" /> {item.attachment}
                  </button>
                )}
                {item.attachments && item.attachments.map((at, idx) => (
                  <button key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl text-[10px] font-black text-gray-600 uppercase">
                    <FileText className="w-3.5 h-3.5" /> {at}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {item.status === 'Completed' ? (
                  <button className="w-full sm:w-auto px-10 py-3 bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-black transition-all transform active:scale-95 shadow-lg shadow-blue-100">
                    View Feedback
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStart(item.id)}
                    className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-blue-700 transition-all transform active:scale-95 shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    {item.status === 'In Progress' ? 'Continue Reading' : item.id === 5 ? 'Start Practice' : item.id === 3 ? 'Start Project' : 'Start Homework'}
                  </button>
                )}
                
                {item.status === 'In Progress' && (
                  <button className="w-full sm:w-auto px-10 py-3 bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-black transition-all">
                    Mark as Done
                  </button>
                )}
                
                {item.status !== 'Completed' && (
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-yellow-400 hover:bg-yellow-50 transition-all">
                    <Star className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Bottom Tip Bar */}
          <div className="bg-green-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-green-100 animate-pulse">
             <div className="bg-white/20 p-2 rounded-lg">
               <Flame className="w-5 h-5 text-yellow-300" />
             </div>
             <p className="text-xs sm:text-sm font-bold tracking-tight">
               Tip: Do a little homework every day instead of waiting until it's due! You've got this! 💪
             </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full">
        <HomeworkRight />
      </div>
    </div>
  );
};

export default Homework;
