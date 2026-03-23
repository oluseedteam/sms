import React from 'react'
import { Calendar } from 'lucide-react'

const Events = () => {
  const events = [
    { title: "Field Trip to Zoo", date: "Friday, Oct 27", icon: "🦁" },
    { title: "Book Fair", date: "Next Week", icon: "📚" },
    { title: "Sports Day", date: "November 5", icon: "🏃" },
  ]
  
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-[#85a6cf]" strokeWidth={2.5}/>
            <h3 className="font-bold text-xl text-[#0b3a72]">Upcoming Events</h3>
        </div>

        <div className="space-y-3.5">
            {events.map((ev, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 border border-transparent hover:border-blue-100">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-2xl drop-shadow-sm">
                        {ev.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-[14px] text-[#0b3a72] mb-0.5">{ev.title}</h4>
                        <p className="text-[11.5px] font-medium text-gray-500">{ev.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Events;