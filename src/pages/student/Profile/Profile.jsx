import { useState } from 'react';
import {
  User, Trophy, Settings, Users, Camera, Phone, Mail, MapPin, Calendar, Heart, BookOpen, Pencil, AlertCircle, Bus, ShieldAlert, School, Flame, Briefcase, Award, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileRight from './ProfileRight';
import { useAuth } from '../../../hooks/useAuth';
import { updateProfile } from '../../../services/authService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
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
  const { user, updateUser } = useAuth();
  
  const isTeacher = user?.role === 'teacher';
  const roleDisplay = isTeacher ? 'Teacher' : 'Student';

  const tabs = isTeacher ? [
    { label: 'About Me', icon: <User className="w-3.5 h-3.5" /> },
    { label: 'My Classes', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ] : [
    { label: 'About Me', icon: <User className="w-3.5 h-3.5" /> },
    { label: 'My Achievements', icon: <Trophy className="w-3.5 h-3.5" /> },
    { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
    { label: 'Parent Info', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  // Dynamic Info Arrays
  const basicInfo = [
    { label: 'Email', value: user?.email || 'N/A', icon: <Mail className="w-3.5 h-3.5 text-purple-400" /> },
    { label: 'Gender', value: user?.gender ? (user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) : 'Not Specified', icon: <User className="w-3.5 h-3.5 text-blue-400" /> },
    { label: isTeacher ? 'Employee ID' : 'Student ID', value: isTeacher ? user?.employee_id : user?.student_id, icon: <AlertCircle className="w-3.5 h-3.5 text-orange-400" /> },
  ];

  if (isTeacher) {
      if(user?.department) basicInfo.push({ label: 'Department', value: user?.department, icon: <Briefcase className="w-3.5 h-3.5 text-green-400" /> });
  } else {
      if(user?.department) basicInfo.push({ label: 'Department', value: user?.department, icon: <GraduationCap className="w-3.5 h-3.5 text-green-400" /> });
  }

  // File upload handler
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
           const res = await updateProfile({ profile_picture: reader.result });
           updateUser(res.user);
        } catch (err) {
           console.error("Failed to update photo", err);
           alert("Failed to update photo");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Main Content */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 space-y-6 sm:space-y-8 min-w-0">
        
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
        <motion.section variants={itemVariants} className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-5xl sm:text-6xl border-2 border-blue-100 shadow-inner overflow-hidden">
              {user?.profile_picture ? (
                 <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                 isTeacher ? "👨‍🏫" : "👧"
              )}
            </div>
            <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-wide shadow-lg hover:bg-black transition-all whitespace-nowrap cursor-pointer">
              <Camera className="w-2.5 h-2.5" /> Change Photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tight">{user?.full_name}</h2>
              {user?.is_prefect && (
                <span className="px-3 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-yellow-200 shadow-sm">
                  ⭐ {user.prefect_title || 'Prefect'}
                </span>
              )}
              {isTeacher && user?.institutional_role && (
                <span className="px-3 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-200 shadow-sm">
                  {user.institutional_role}
                </span>
              )}
            </div>
            <span className="inline-block mt-1 px-3 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-widest">
              {roleDisplay}
            </span>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-[11px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {isTeacher ? user?.employee_id : user?.student_id}</span>
              {!isTeacher && user?.school_classes?.length > 0 && (
                <span className="flex items-center gap-1.5">🏫 Class: {user.school_classes.map(c => c.name).join(', ')}</span>
              )}
            </div>
          </div>
        </motion.section>

        {/* ── Basic Information ── */}
        <motion.section variants={itemVariants}>
          <SectionCard title="Basic Information" icon={<span className="text-lg">📋</span>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {!isTeacher && (
           <motion.section variants={itemVariants}>
             <SectionCard title="Health Information" icon={<span className="text-lg">❤️</span>} color="bg-pink-50 border-pink-100">
                <div className="flex items-center justify-center p-6 text-gray-500 font-bold text-sm">
                    No health records found in system.
                </div>
             </SectionCard>
           </motion.section>
        )}

      </motion.div>

      {/* Right Sidebar */}
      {!isTeacher && (
          <div className="lg:w-80 w-full">
            <ProfileRight />
          </div>
      )}
    </div>
  );
};

export default Profile;
