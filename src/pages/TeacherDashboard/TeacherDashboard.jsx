import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Activity,
  Award,
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
  PlusCircle,
  BarChart2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import TeacherDashboardRight from './TeacherDashboardRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const TeacherDashboard = () => {
  const stats = [
    { title: 'Students Present Today', value: '27/28', subtitle: '96% attendance rate', icon: CheckCircle2, bg: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Pending Assignments',    value: '15',    subtitle: 'To grade',             icon: FileText,       bg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { title: "Today's Classes",        value: '4',     subtitle: 'Periods scheduled',    icon: BookOpen,       bg: 'bg-blue-100',   iconColor: 'text-blue-600' },
    { title: 'Upcoming Events',        value: '2',     subtitle: 'This week',            icon: Calendar,       bg: 'bg-purple-100', iconColor: 'text-purple-600' },
  ];

  const schedule = [
    { time: '8:30 AM – 10:00 AM',  subject: 'Mathematics',         topic: 'Addition & Subtraction', room: 'Room 4B',     students: 28, accent: 'border-l-blue-500',   badge: 'bg-blue-50 text-blue-600' },
    { time: '10:00 AM – 11:30 AM', subject: 'English Language Arts',topic: 'Creative Writing',       room: 'Room 4B',     students: 28, accent: 'border-l-purple-500', badge: 'bg-purple-50 text-purple-600' },
    { time: '12:30 PM – 2:00 PM',  subject: 'Science Lab',         topic: 'Plants & Animals',       room: 'Science Lab', students: 28, accent: 'border-l-green-500',  badge: 'bg-green-50 text-green-600' },
    { time: '2:00 PM – 3:30 PM',   subject: 'Art & Craft',         topic: 'Watercolor Techniques',  room: 'Art Room',    students: 28, accent: 'border-l-orange-500', badge: 'bg-orange-50 text-orange-600' },
  ];

  const recentActivity = [
    { name: 'Emma Johnson',  action: 'submitted Math Homework',  time: '5 minutes ago',  status: 'grade', type: 'success' },
    { name: 'Michael Chen',  action: 'submitted Reading Log',    time: '15 minutes ago', status: 'grade', type: 'success' },
    { name: 'Sarah Williams',action: 'marked absent today',      time: '2 hours ago',    status: 'review',type: 'danger' },
  ];

  const upcomingEvents = [
    { day: '27', label: 'Field Trip to Zoo',          sub: 'Friday, October 27',  color: 'bg-blue-50 text-blue-600' },
    { day: '📚', label: 'Book Fair',                  sub: 'Next Week',           color: 'bg-gray-50 text-gray-500' },
    { day: '👥', label: 'Parent-Teacher Conferences', sub: 'Next Tuesday',        color: 'bg-yellow-50 text-yellow-600' },
  ];

  const quickActions = [
    { label: 'Record Attendance', icon: ClipboardCheck },
    { label: 'Enter Grades',      icon: GraduationCap },
    { label: 'Send Message',      icon: MessageSquare },
    { label: 'Create Assignment', icon: PlusCircle },
    { label: 'Schedule Meeting',  icon: Calendar },
    { label: 'View Reports',      icon: BarChart2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      {/* ── Main column ─────────────────────────── */}
      <motion.div
        className="flex-1 space-y-8 min-w-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Banner */}
        <div className="bg-blue-700 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome back, Miss Roberts! ✨</h1>
            <p className="text-sm opacity-70">Wednesday, October 25, 2023</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className={`inline-flex p-2 rounded-xl bg-white/20 mb-3`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">{s.value}</h3>
                  <p className="text-xs font-semibold mt-1 leading-snug">{s.title}</p>
                  <p className="text-[10px] opacity-60 mt-1">{s.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl" />
        </div>

        {/* Today's Schedule */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schedule.map((s, i) => (
              <div key={i} className={`p-4 rounded-2xl bg-gray-50 border-l-4 ${s.accent} hover:bg-white hover:shadow-md transition-all`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{s.time}</p>
                <h3 className="font-bold text-gray-800 text-base mb-0.5">{s.subject}</h3>
                <p className="text-xs text-gray-500 mb-3">{s.topic} • {s.room}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Users className="w-3 h-3" /> {s.students} students
                  </span>
                  <button className={`text-[10px] font-bold px-3 py-1.5 rounded-xl ${s.badge}`}>
                    Start Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Student Activity */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-600" /> Recent Student Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.type === 'danger' ? 'bg-red-50' : 'bg-blue-50'}`}>
                  <Users className={`w-4 h-4 ${a.type === 'danger' ? 'text-red-500' : 'text-blue-500'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">{a.name}</span> {a.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
                <button className={`text-xs font-bold px-3 py-1.5 rounded-xl ${a.type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  {a.status === 'grade' ? 'Grade Now' : 'Review'}
                </button>
              </div>
            ))}
          </div>

          {/* Needs Attention */}
          <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <h3 className="text-sm font-bold text-orange-600 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4" /> Needs Attention
            </h3>
            {['Late submissions', 'Missing homework', 'Attendance follow-up', 'Parent meetings scheduled'].map((n, i) => (
              <div key={i} className="flex justify-between items-center text-xs text-orange-700 py-1.5 border-b border-orange-100 last:border-0">
                <span>{n}</span>
                <span className="bg-orange-100 text-orange-600 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming This Week */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-blue-600" /> Upcoming This Week
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((e, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 ${e.color} rounded-2xl`}>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-sm">
                  {e.day}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{e.label}</h4>
                  <p className="text-xs text-gray-500">{e.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right sidebar ────────────────────────── */}
      <div className="lg:w-80 w-full">
        <TeacherDashboardRight quickActions={quickActions} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
