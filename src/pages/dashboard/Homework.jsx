import React from 'react';
import { CalendarDays, ListTodo } from 'lucide-react';

const Homework = () => {
  const homework = [
    {
      head: "Mathematics",
      title: "Math Practice Sheet",
      btn: "Start",
      info: "Due Tomorrow",
      theme: {
        border: "border-orange-400",
        badgeBg: "bg-orange-400",
      },
      urgent: true,
      status: "To Do",
      statusTheme: {
        bg: "bg-orange-50",
        text: "text-orange-500",
        dot: "bg-gray-300"
      }
    },
    {
      head: "English",
      title: "Reading Log",
      btn: "Continue",
      info: "Due Friday",
      theme: {
        border: "border-purple-600",
        badgeBg: "bg-purple-600",
      },
      urgent: false,
      status: "In Progress",
      statusTheme: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        dot: "bg-blue-600"
      }
    },
    {
      head: "Science",
      title: "Science Project",
      btn: "Start",
      info: "Due Next Week",
      theme: {
        border: "border-green-500",
        badgeBg: "bg-green-500",
      },
      urgent: false,
      status: "To Do",
      statusTheme: {
        bg: "bg-orange-50",
        text: "text-orange-500",
        dot: "bg-gray-300"
      }
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-1.5 rounded-md">
          <ListTodo className="w-5 h-5 text-blue-800" strokeWidth={2.5} />
        </div>
        <h3 className="font-bold text-xl text-[#1e3a8a]">My Homework</h3>
      </div>

      <div className="space-y-4">
        {homework.map((hw, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-5 rounded-xl bg-slate-50 border-l-4 transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1 cursor-pointer ${hw.theme.border}`}
          >
            {/* Left Content */}
            <div className="flex flex-col items-start gap-2.5">
              {/* Subject Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${hw.theme.badgeBg}`}>
                {hw.head}
              </span>

              {/* Title */}
              <h4 className="font-bold text-[17px] text-[#1e3a8a]">
                {hw.title}
              </h4>

              {/* Bottom Row */}
              <div className="flex items-center gap-3 mt-0.5">
                <span className={`flex items-center gap-1.5 text-xs font-semibold ${hw.urgent ? 'text-[#e11d48]' : 'text-gray-500'}`}>
                  <CalendarDays className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                  {hw.info}
                </span>

                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wide ${hw.statusTheme.bg} ${hw.statusTheme.text}`}>
                  {/* Status Dot */}
                  <span className={`w-2 h-2 rounded-full shadow-sm drop-shadow-sm shadow-black/20 ${hw.statusTheme.dot}`}></span>
                  {hw.status}
                </span>
              </div>
            </div>

            {/* Right Button */}
            <button className="bg-[#0a5c9a] hover:bg-blue-800 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-sm">
              {hw.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homework;