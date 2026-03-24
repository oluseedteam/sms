import React from 'react';

const Welcome = () => {
    const info = [
        { label: 'Gold Stars This Week', value: '12', icon: '⭐' }, 
        { label: 'Books Read', value: '3', icon: '📚' },
        { label: 'Attendance', value: '95%', icon: '✅' }, 
        { label: 'Homework Done', value: '8 of 10', icon: '✏️' }
    ]

  return (
    <div className='bg-[#0b4b8a] text-white p-8 rounded-3xl shadow-sm'>
        <h2 className='text-3xl font-bold mb-2'>Welcome back, Emma!</h2>
        <p className='text-[15px] mb-8 opacity-90 flex items-center gap-2 font-medium'>
            📚 You have 3 homework assignments due this week
        </p>

        <div className='grid grid-cols-4 gap-5'>
            {info.map((item, index) => {
                return (
                    <div key={index} className='bg-[#2c65a6] p-5 rounded-2xl text-center flex flex-col items-center hover:bg-[#3d7cc2] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer shadow-sm border border-blue-400/20'>
                        <div className="text-3xl mb-4 drop-shadow-md">{item.icon}</div>
                        <span className='font-bold text-2xl mb-1.5'>
                            {item.value}
                        </span>
                        <span className='text-xs font-medium text-blue-100/80'>
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default Welcome;