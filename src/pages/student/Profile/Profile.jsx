import { useState } from 'react';
import {
  User,
  Trophy,
  Settings,
  Users,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  BookOpen,
  Pencil,
  AlertCircle,
  Bus,
  ShieldAlert,
  School,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';
import ProfileRight from './ProfileRight';
import { useAuth } from '../../../hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const tabs = [
  { label: 'About Me', icon: <User className="w-3.5 h-3.5" /> },
  { label: 'My Achievements', icon: <Trophy className="w-3.5 h-3.5" /> },
  { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  { label: 'Parent Info', icon: <Users className="w-3.5 h-3.5" /> },
];

const student = {
  name: 'Emma Rose Johnson',
  grade: 'Grade 4B',
  studentId: 'ID: 471-003-4467',
  classTeacher: 'Miss Roberts',
  motto: 'Always try my best! 💪',
  avatar: '👧',
};

const basicInfo = [
  { label: 'Birthday', value: 'March 15, 2015 (Age: 8 years old)', icon: <Calendar className="w-3.5 h-3.5 text-blue-400" /> },
  { label: 'Address', value: '14 Maple Street, Springfield', icon: <MapPin className="w-3.5 h-3.5 text-red-400" /> },
  { label: 'Phone', value: '(555) 123-4567', icon: <Phone className="w-3.5 h-3.5 text-green-400" /> },
  { label: 'Parent Email', value: 'johnson.family@gmail.com', icon: <Mail className="w-3.5 h-3.5 text-purple-400" /> },
];

const family = [
  {
    name: 'Jennifer Johnson',
    role: 'Mom',
    phone: '(555) 123-4567',
    email: 'jennyjohnson@gmail.com',
    canPickup: true,
    emoji: '👩',
  },
  {
    name: 'Michael Johnson',
    role: 'Dad',
    phone: '(555) 123-4789',
    email: 'michaeljohnson@gmail.com',
    canPickup: true,
    emoji: '👨',
  },
];

const emergencyContacts = [
  { label: 'Contact 1', name: 'Grandma Susan', phone: '(555) 234-5678', relationship: 'Grandmother' },
  { label: 'Contact 2', name: 'Uncle Tim', phone: '(555) 349-6789', relationship: 'Uncle' },
];

const healthInfo = [
  { label: 'Blood Type', value: 'O+', color: 'text-red-600' },
  { label: 'Allergies', value: '⚠️ Peanuts', color: 'text-orange-600 font-black' },
  { label: 'Medications', value: 'None', color: 'text-gray-600' },
  { label: 'Health Conditions', value: 'None', color: 'text-gray-600' },
  { label: 'Doctor', value: 'Dr. Smith — (555) 456-7893', color: 'text-gray-600' },
  { label: 'Last Check-up', value: 'August 2023', color: 'text-gray-600' },
];

const schoolInfo = [
  { label: 'Enrolled', value: 'September 2023', icon: <School className="w-3.5 h-3.5 text-blue-400" /> },
  { label: 'Grade', value: '4B', icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" /> },
  { label: 'Homeroom', value: 'Room 4B', icon: <School className="w-3.5 h-3.5 text-green-400" /> },
  { label: 'Class Teacher', value: 'Miss Roberts', icon: <User className="w-3.5 h-3.5 text-orange-400" /> },
  { label: 'Bus Route', value: 'Route 12', icon: <Bus className="w-3.5 h-3.5 text-yellow-500" /> },
  { label: 'Bus Number', value: 'Bus 49', icon: <Bus className="w-3.5 h-3.5 text-yellow-600" /> },
  { label: 'Lunch', value: 'School lunch program', icon: <Heart className="w-3.5 h-3.5 text-pink-400" /> },
];

const interests = {
  subjects: ['Science', 'Art', 'Reading'],
  hobbies: ['Drawing', 'Soccer', 'Reading books'],
  book: 'Harry Potter series',
  color: 'Purple 💜',
  dream: 'I want to be a scientist 🔬',
};

const SectionCard = ({ title, icon, children, color = 'bg-white border-gray-100' }) => (
  <div className={`${color} rounded-2xl p-5 sm:p-6 shadow-sm border`}>
    <div className="flex items-center gap-2 mb-5">
      {icon}
      <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm">{title}</h3>
    </div>
    {children}
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState('About Me');
  const { user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-6 sm:space-y-8 min-w-0"
      >
        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wide transition-all border whitespace-nowrap shadow-sm
                ${activeTab === tab.label
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100 scale-105'
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── Profile Card ── */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-5xl sm:text-6xl border-2 border-blue-100 shadow-inner">
              {student.avatar}
            </div>
            <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-wide shadow-lg hover:bg-black transition-all whitespace-nowrap">
              <Camera className="w-2.5 h-2.5" /> Change Photo
            </button>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tight">{user?.full_name || student.name}</h2>
              {user?.is_prefect && (
                <span className="px-3 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-yellow-200 shadow-sm">
                  ⭐ {user.prefect_title || 'Prefect'}
                </span>
              )}
            </div>
            <span className="inline-block mt-1 px-3 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-widest">
              {student.grade}
            </span>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-[11px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {student.studentId}</span>
              <span className="flex items-center gap-1.5">🧑‍🏫 Class Teacher: {student.classTeacher}</span>
            </div>
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 bg-blue-50 rounded-xl px-4 py-2.5 border border-blue-100 w-fit">
              <span className="text-sm">💬</span>
              <p className="text-[11px] font-bold text-blue-700">
                My Motto: <span className="font-black">{student.motto}</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Basic Information ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="Basic Information" icon={<span className="text-lg">📋</span>}>
            <div className="space-y-4">
              {basicInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xs font-bold text-gray-700 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.section>

        {/* ── Family Information ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="Family Information" icon={<span className="text-lg">👨‍👩‍👧</span>}>
            <div className="space-y-4">
              {family.map((member, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl border border-blue-100">
                      {member.emoji}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{member.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pl-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Phone className="w-3 h-3 text-green-400" /> {member.phone}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Mail className="w-3 h-3 text-purple-400" /> {member.email}
                    </div>
                  </div>
                  {member.canPickup && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-green-500 font-black text-xs">✓</span>
                      <span className="text-[10px] font-black text-green-600">Can pick up: Yes</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.section>

        {/* ── Emergency Contacts ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="Emergency Contacts" icon={<span className="text-lg">🚨</span>} color="bg-orange-50 border-orange-100">
            <div className="space-y-3 mb-4">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-orange-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-0.5">{contact.label}</p>
                      <p className="text-xs font-black text-gray-800">{contact.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{contact.relationship}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                      <Phone className="w-3 h-3 text-orange-400" /> {contact.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 bg-orange-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
              + Add Emergency Contact
            </button>
          </SectionCard>
        </motion.section>

        {/* ── Health Information ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="Health Information" icon={<span className="text-lg">❤️</span>} color="bg-pink-50 border-pink-100">
            <div className="space-y-3 mb-3">
              {healthInfo.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-tight">{item.label}</span>
                  <span className={`font-black text-right ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-pink-600 bg-white border border-pink-100 rounded-xl px-3 py-2 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Only parents and school nurses can see this
            </p>
          </SectionCard>
        </motion.section>

        {/* ── School Information ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="School Information" icon={<span className="text-lg">🏫</span>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schoolInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xs font-bold text-gray-700 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.section>

        {/* ── My Interests ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="My Interests" icon={<span className="text-lg">⭐</span>} color="bg-yellow-50 border-yellow-100">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2">Favorite Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {interests.subjects.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-black rounded-full border border-yellow-200 uppercase">
                      {s === 'Science' ? '🔬' : s === 'Art' ? '🎨' : '📖'} {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2">Hobbies</p>
                <div className="flex flex-wrap gap-2">
                  {interests.hobbies.map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-white text-gray-600 text-[10px] font-black rounded-full border border-yellow-200">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 border border-yellow-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">📚 Favorite Book</p>
                  <p className="text-[11px] font-black text-gray-700">{interests.book}</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-yellow-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">🎨 Fav. Color</p>
                  <p className="text-[11px] font-black text-gray-700">{interests.color}</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-yellow-100 sm:col-span-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">🚀 When I grow up...</p>
                  <p className="text-[11px] font-black text-gray-700">{interests.dream}</p>
                </div>
              </div>
            </div>

            <button className="mt-5 flex items-center justify-center gap-2 py-3 px-6 bg-yellow-400 text-yellow-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-md shadow-yellow-100 w-full sm:w-auto">
              <Pencil className="w-3.5 h-3.5" /> Edit My Interests
            </button>
          </SectionCard>
        </motion.section>

        {/* Footer tip */}
        <motion.div
          variants={itemVariants}
          className="bg-green-600 text-white p-4 sm:p-6 rounded-2xl flex items-center gap-3 shadow-lg shadow-green-100"
        >
          <div className="bg-white/20 p-2 rounded-lg">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Flame className="w-5 h-5 text-yellow-300" />
            </motion.div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold">
              Remember: Your parents can see everything in your account to help keep you safe online! 🔒
            </p>
            <p className="text-[10px] opacity-75 mt-0.5 font-bold">Account created: September 2023</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full">
        <ProfileRight />
      </div>
    </div>
  );
};

export default Profile;
