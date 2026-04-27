import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, MapPin, Calendar, Users, CheckCircle2,
  TrendingUp, AlertCircle, ChevronRight, MoreVertical,
  Calculator, Microscope, Globe, Palette, Goal, Activity, PlusCircle, Trash2, X, Loader2
} from 'lucide-react';
import TeacherMyClassesRight from './TeacherMyClassesRight';
import { getTeacherClasses, createTeacherClass, deleteTeacherClass } from '../../../services/teacherClassService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const attentionStyles = {
  warn: 'bg-orange-50 text-orange-600 ring-orange-100',
  ok:   'bg-green-50  text-green-600  ring-green-100',
  info: 'bg-blue-50   text-blue-600   ring-blue-100',
};

const iconMapping = {
  'Mathematics': <Calculator className="w-6 h-6 text-blue-500" />,
  'English Language Arts': <BookOpen className="w-6 h-6 text-purple-500" />,
  'Science': <Microscope className="w-6 h-6 text-green-500" />,
  'Social Studies': <Globe className="w-6 h-6 text-yellow-500" />,
  'Art': <Palette className="w-6 h-6 text-orange-500" />,
  'Physical Education': <Goal className="w-6 h-6 text-indigo-500" />,
};

const TeacherMyClasses = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Classes');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', grade: '', time: '', location: '' });

  const fetchClasses = async () => {
    try {
      const res = await getTeacherClasses();
      const hwList = res.data || res || [];
      const mapped = hwList.map((c, i) => {
        const colors = [
          { accent: 'border-l-blue-500', iconBg: 'bg-blue-50' },
          { accent: 'border-l-purple-500', iconBg: 'bg-purple-50' },
          { accent: 'border-l-green-500', iconBg: 'bg-green-50' },
          { accent: 'border-l-yellow-500', iconBg: 'bg-yellow-50' },
          { accent: 'border-l-orange-500', iconBg: 'bg-orange-50' },
        ];
        const t = colors[i % colors.length];
        return {
          ...c,
          students: Math.floor(Math.random() * 10) + 20,
          unit: 'Custom Unit Selection',
          week: 'Week ' + (Math.floor(Math.random() * 8) + 1),
          avg: Math.floor(Math.random() * 15 + 85) + '%',
          hw: Math.floor(Math.random() * 15 + 85) + '%',
          upcoming: 'Custom Assessment',
          attention: 'No critical alerts',
          attentionType: 'ok',
          accent: t.accent, iconBg: t.iconBg,
          icon: iconMapping[c.title] || <BookOpen className="w-6 h-6 text-blue-500" />,
          actions: ['Lesson Plans', 'Student Progress']
        };
      });
      setClasses(mapped);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createTeacherClass(formData);
      setIsModalOpen(false);
      setFormData({ title: '', grade: '', time: '', location: '' });
      fetchClasses();
    } catch(err) {
      alert("Error adding class");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if(window.confirm("Delete this scheduled class?")) {
      try {
        await deleteTeacherClass(id);
        fetchClasses();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      {/* Main content */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Classes</h1>
            <p className="text-sm text-gray-500 mt-1">2023-2024 Academic Year • Term 2</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-full text-xs font-bold border transition-all bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-lg flex items-center gap-2">
              <PlusCircle className="w-4 h-4"/> Add Custom Class
            </button>
            {['All Classes', 'Current Day'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeFilter === f
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Class Cards */}
        {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {classes.map(cls => (
              <motion.div
                key={cls.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 border-l-4 ${cls.accent} hover:shadow-xl transition-all group`}
              >
                {/* Card top */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${cls.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {cls.icon}
                  </div>
                  <button onClick={(e) => handleDelete(e, cls.id)} className="text-gray-300 hover:text-red-500 transition-colors" title="Delete Class">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{cls.title}</h3>
                <p className="text-xs text-gray-400 font-medium mb-4">{cls.grade}</p>

                {/* Meta */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />{cls.students} students
                  </div>
                </div>

                {/* Current unit */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                  <div className="flex justify-between text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">
                    <span>Current Unit</span>
                    <span>{cls.week}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-3 line-clamp-1">{cls.unit}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold mb-0.5">Class Average</p>
                      <p className="text-base font-bold text-gray-800">{cls.avg}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold mb-0.5">HW Completion</p>
                      <p className="text-base font-bold text-gray-800">{cls.hw}</p>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-2 mb-6">
                  <div className="bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100 p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>Upcoming: {cls.upcoming}</span>
                  </div>
                  <div className={`ring-1 ring-inset ${attentionStyles[cls.attentionType]} p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold`}>
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{cls.attention}</span>
                  </div>
                </div>

                {/* Buttons */}
                <button onClick={() => navigate('/teacher/attendance')} className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mb-2 transition-all">
                  <CheckCircle2 className="w-4 h-4" /> Take Attendance
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {cls.actions.map((a, i) => (
                    <button key={i} className="text-blue-600 border border-blue-100 font-bold py-2.5 rounded-2xl hover:bg-blue-50 text-xs transition-all">
                      {a}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="lg:w-80 w-full">
        <TeacherMyClassesRight />
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold">Add Custom Class Definition</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Subject Title</label>
                  <input required placeholder="e.g. Mathematics" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Target Grade</label>
                  <input required placeholder="e.g. Grade 4B" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Schedule Array (Time)</label>
                  <input required placeholder="e.g. Mon, Thu 8:30AM-10AM" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Room / Location</label>
                  <input required placeholder="e.g. Science Lab A" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <button disabled={submitting} type="submit" className="w-full py-3 mt-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md">
                  {submitting ? 'Saving...' : 'Add Class'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherMyClasses;
