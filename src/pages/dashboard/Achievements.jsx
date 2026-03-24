import React from 'react'

const Achievements = () => {
    const achievements = [
        { title: "Math\nMaster", icon: "🧮", bg: "bg-[#fad6ca]" },
        { title: "Perfect\nAttendance", icon: "✅", bg: "bg-[#c4e8ce]" },
        { title: "Reading\nChampion", icon: "📖", bg: "bg-[#e2d5ed]" }
    ]

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl drop-shadow-sm">⭐</span>
                <h3 className="font-bold text-xl text-[#0b3a72]">My Achievements</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {achievements.map((ach, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 border border-transparent hover:border-gray-100">
                        <div className={`w-[46px] h-[46px] rounded-full ${ach.bg} flex items-center justify-center text-xl mb-3 shadow-inner`}>
                            {ach.icon}
                        </div>
                        <p className="text-[11px] font-bold text-[#0b3a72] text-center whitespace-pre-line leading-tight">
                            {ach.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Achievements;