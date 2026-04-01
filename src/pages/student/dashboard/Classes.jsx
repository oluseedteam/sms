import React from 'react'

const Classes = () => {
    const classes = [
              { title: "Mathematics", time: "8:30 - 10:00", color: "bg-yellow-100 border-yellow-500" },
              { title: "English Language", time: "10:00 - 11:30", color: "bg-purple-100 border-purple-500" },
              { title: "Lunch Break", time: "11:30 - 12:30", color: "bg-blue-100 border-blue-500" },
              { title: "Science", time: "12:30 - 2:00", color: "bg-green-100 border-green-500" },
              { title: "Art & Craft", time: "2:00 - 3:30", color: "bg-pink-100 border-pink-500" },
            ]
  return (
    <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Today's Classes</h3>

          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.title}
                className={`p-4 rounded-lg border-l-4 transition-transform hover:scale-[1.02] cursor-pointer ${cls.color}`}
              >
                <p className="text-sm text-gray-600">{cls.time}</p>
                <h4 className="font-semibold">{cls.title}</h4>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Classes