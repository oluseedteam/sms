import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  Calculator,
  BookOpen,
  Microscope,
  Globe,
  Palette,
  Goal
} from 'lucide-react';
import { motion } from 'motion/react';
import MyClassRight from './MyClassRight';

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

const MyClasses = () => {
  const [activeTab, setActiveTab] = useState('All Subjects');

  const classes = [
    {
      id: 1,
      title: "Mathematics",
      teacher: "Mrs. Sarah Anderson",
      room: "Room 4B",
      schedule: "Mon, Tue, Thu, Fri - 8:30 AM",
      topic: "Addition and Subtraction up to 1000",
      progress: 38,
      stars: 8,
      color: "blue",
      icon: <Calculator className="w-6 h-6 text-orange-500" />
    },
    {
      id: 2,
      title: "English Language Arts",
      teacher: "Mr. James Wilson",
      room: "Room 4B",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      topic: "Creative Story Writing",
      progress: 33,
      stars: 10,
      color: "purple",
      icon: <BookOpen className="w-6 h-6 text-purple-500" />
    },
    {
      id: 3,
      title: "Science",
      teacher: "Ms. Linda Parker",
      room: "Science Lab A",
      schedule: "Tue, Thu - 12:30 PM",
      topic: "Plants and Animals",
      progress: 50,
      stars: 12,
      color: "green",
      icon: <Microscope className="w-6 h-6 text-green-500" />
    },
    {
      id: 4,
      title: "Social Studies",
      teacher: "Mr. David Kim",
      room: "Room 4B",
      schedule: "Wed, Thu - 1:30 PM",
      topic: "Our Community Helpers",
      progress: 40,
      stars: 7,
      color: "indigo",
      icon: <Globe className="w-6 h-6 text-blue-500" />
    },
    {
      id: 5,
      title: "Art",
      teacher: "Mrs. Emily Chen",
      room: "Art Room",
      schedule: "Tue, Fri - 2:00 PM",
      topic: "Watercolor Painting Techniques",
      progress: 50,
      stars: 9,
      color: "pink",
      icon: <Palette className="w-6 h-6 text-pink-500" />
    },
    {
      id: 6,
      title: "Physical Education",
      teacher: "Coach Mike Torres",
      room: "Gymnasium",
      schedule: "Mon, Wed, Fri - 2:45 PM",
      topic: "Team Sports and Cooperation",
      progress: 50,
      stars: 8,
      color: "orange",
      icon: <Goal className="w-6 h-6 text-black" />
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Classes 🍿</h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm whitespace-nowrap">
                Grade 4B - Miss Roberts' Class 👩‍🏫
              </span>
            </div>
          </div>
        </div>

        {/* Filters/Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {['All Subjects', 'My Favorites ⭐', "Today's Classes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-300 shadow-sm border whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-blue-600 text-white border-blue-600 sm:scale-105 shadow-blue-200' 
                  : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 pb-8"
        >
          {classes.map((cls) => (
            <motion.div 
              key={cls.id} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 border-l-4 
                ${cls.color === 'blue' ? 'border-l-blue-500' : 
                  cls.color === 'purple' ? 'border-l-purple-500' : 
                  cls.color === 'green' ? 'border-l-green-500' : 
                  cls.color === 'pink' ? 'border-l-pink-500' : 
                  cls.color === 'orange' ? 'border-l-orange-500' : 'border-l-indigo-500'} 
                hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-3 sm:p-4 rounded-xl ${cls.color === 'blue' ? 'bg-blue-50' : 
                    cls.color === 'purple' ? 'bg-purple-50' : 
                    cls.color === 'green' ? 'bg-green-50' : 
                    cls.color === 'pink' ? 'bg-pink-50' : 
                    cls.color === 'orange' ? 'bg-orange-50' : 'bg-indigo-50'} group-hover:scale-110 transition-transform`}>
                    {cls.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">{cls.title}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">🧑‍🏫 {cls.teacher}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 leading-none">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{cls.room}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 leading-none">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{cls.schedule}</span>
                </div>
                
                <div className={`p-2.5 sm:p-3 rounded-xl border border-dashed transition-colors duration-300
                    ${cls.color === 'blue' ? 'bg-blue-50/50 border-blue-200' : 
                      cls.color === 'purple' ? 'bg-purple-50/50 border-purple-200' : 
                      cls.color === 'green' ? 'bg-green-50/50 border-green-200' : 
                      cls.color === 'pink' ? 'bg-pink-50/50 border-pink-200' : 
                      cls.color === 'orange' ? 'bg-orange-50/50 border-orange-200' : 'bg-indigo-50/50 border-indigo-200'}`}
                >
                  <p className="text-[9px] uppercase tracking-wider font-bold text-gray-500 mb-1 sm:mb-2">Current Topic</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">{cls.topic}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex justify-between text-[10px] items-center font-bold">
                  <span className="text-gray-500 uppercase">Unit 3 of 8</span>
                  <span className={`${cls.color === 'blue' ? 'text-blue-600' : 
                    cls.color === 'purple' ? 'text-purple-600' : 
                    cls.color === 'green' ? 'text-green-600' : 
                    cls.color === 'pink' ? 'text-pink-600' : 
                    cls.color === 'orange' ? 'text-orange-600' : 'text-indigo-600'}`}>{cls.progress}% Complete</span>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out
                      ${cls.color === 'blue' ? 'bg-blue-500' : 
                        cls.color === 'purple' ? 'bg-purple-500' : 
                        cls.color === 'green' ? 'bg-green-500' : 
                        cls.color === 'pink' ? 'bg-pink-500' : 
                        cls.color === 'orange' ? 'bg-orange-500' : 'bg-indigo-500'}`} 
                    style={{ width: `${cls.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
                <span className="text-[9px] font-bold text-gray-400 mr-2 uppercase shrink-0">Stars:</span>
                {[...Array(10)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${i < cls.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-100'}`} 
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button className={`py-2 px-1 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold border-2 flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300
                  ${cls.color === 'blue' ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : 
                    cls.color === 'purple' ? 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white' : 
                    cls.color === 'green' ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white' : 
                    cls.color === 'pink' ? 'border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white' : 
                    cls.color === 'orange' ? 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' : 
                    'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>
                  📚 <span className="hidden sm:inline">Materials</span>
                </button>
                <button className="py-2 px-1 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold bg-blue-900 border-2 border-transparent text-white hover:bg-black transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2">
                  📝 <span className="hidden sm:inline">Homework</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Sidebar Component */}
      <div className="lg:w-80 w-full">
        <MyClassRight />
      </div>
    </div>
  );
};

export default MyClasses;
