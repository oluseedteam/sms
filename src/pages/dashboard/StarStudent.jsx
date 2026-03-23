import React from 'react'

const StarStudent = () => {
    return (
        <div className="bg-gradient-to-b from-[#ffc107] to-[#ff9800] p-6 rounded-3xl shadow-sm text-white text-center flex flex-col items-center justify-center">
            <p className="text-sm font-bold mb-5 flex items-center gap-2 tracking-wide drop-shadow-sm">
                ⭐ Star Student of the Week ⭐
            </p>
            <div className="relative mb-4">
                <div className="bg-[#4b5563] p-1.5 rounded-sm shadow-md">
                    <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt="Star Student"
                        className="w-[84px] h-[84px] object-cover rounded-sm"
                    />
                </div>
                {/* Decorative background star elements simulating the image bg */}
                <div className="absolute -left-3 top-2 text-yellow-200 text-xl opacity-80">★</div>
                <div className="absolute -right-3 bottom-4 text-orange-200 text-lg opacity-80">★</div>
            </div>
            <h4 className="font-bold text-lg drop-shadow-sm">Michael Chen</h4>
        </div>
    )
}

export default StarStudent;