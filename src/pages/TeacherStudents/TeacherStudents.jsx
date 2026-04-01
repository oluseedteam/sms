import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, LayoutGrid, List, MessageSquare, UserPlus,
  FileText, ChevronDown, ChevronUp, AlertTriangle,
  CheckCircle2, Clock, Download, Mail
} from 'lucide-react';
import TeacherStudentsRight from './TeacherStudentsRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};

const students = [
  {
    id: 'STU-2024-0847', name: 'Emma Rose Johnson', grade: 'B+ (88%)',
    attendance: '99%', homework: '15/16',
    status: 'present', arrival: '8:35 AM',
    allergy: 'Peanuts',
    recent: 'Math homework submitted (Grade: A) • Reading log in progress',
    alerts: [],
  },
  {
    id: 'STU-2024-0851', name: 'Michael Chen', grade: 'A (94%)',
    attendance: '98%', homework: '16/16',
    status: 'present', arrival: '8:32 AM',
    allergy: null,
    recent: 'Science project submitted (Grade: A+) • Perfect spelling test score',
    alerts: [],
  },
  {
    id: 'STU-2024-0838', name: 'Sarah Williams', grade: 'A- (91%)',
    attendance: '84%', homework: '14/16',
    status: 'absent', arrival: null,
    allergy: null,
    recent: 'English essay submitted (Grade: A) • Excused absence note received',
    alerts: [],
  },
  {
    id: 'STU-2024-0862', name: 'David Martinez', grade: 'B (82%)',
    attendance: '92%', homework: '13/18',
    status: 'late', arrival: '8:55 AM',
    allergy: null,
    recent: 'Math homework late submission • Needs homework reminder',
    alerts: ['3 late submissions this week', 'Attendance follow-up needed'],
  },
  {
    id: 'STU-2024-0845', name: 'Olivia Brown', grade: 'A+ (98%)',
    attendance: '100%', homework: '16/16',
    status: 'present', arrival: '8:28 AM',
    allergy: null,
    recent: 'Reading log submitted (Grade: A+) • Perfect attendance this term',
    alerts: [],
  },
];

const filters = ['All Students (28)', 'Needs Attention (5)', 'High Performers (8)', 'Attendance Concerns (2)', 'Homework Issues (3)'];

const statusConfig = {
  present: { label: 'Present today', color: 'text-green-600 bg-green-50', icon: CheckCircle2 },
  absent:  { label: 'Absent today – parent notified', color: 'text-red-600 bg-red-50', icon: AlertTriangle },
  late:    { label: 'Late arrival', color: 'text-orange-600 bg-orange-50', icon: Clock },
};

const TeacherStudents = () => {
  const [active, setActive] = useState(filters[0]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      {/* Main content */}
      <div className="flex-1 space-y-6 min-w-0">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Roster – Grade 4B</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-xl border ${view === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-xl border ${view === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                active === f
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search + bulk actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm">
              <Mail className="w-4 h-4" /> Message All Parents
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm">
              <Download className="w-4 h-4" /> Export Roster
            </button>
          </div>
        </div>

        {/* Student List */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map(student => {
            const sc = statusConfig[student.status];
            const StatusIcon = sc.icon;
            const isOpen = expanded === student.id;

            return (
              <motion.div
                key={student.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm shrink-0">
                      {student.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <h3 className="font-bold text-gray-800">{student.name}</h3>
                        <span className="text-xs text-gray-400 font-medium">{student.id}</span>
                      </div>

                      {/* Stats row */}
                      <div className="flex flex-wrap gap-4 mt-2 text-xs font-medium text-gray-600">
                        <span>Grade: <span className="font-bold text-gray-900">{student.grade}</span></span>
                        <span>Attendance: <span className="font-bold text-gray-900">{student.attendance}</span></span>
                        <span>Homework: <span className="font-bold text-gray-900">{student.homework}</span></span>
                      </div>

                      {/* Status badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold mt-2 ${sc.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {sc.label} {student.arrival ? `– arrived ${student.arrival}` : ''}
                      </div>

                      {/* recent */}
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{student.recent}</p>

                      {/* Allergy & alerts */}
                      {student.allergy && (
                        <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                          ⚠️ Allergies: {student.allergy}
                        </span>
                      )}
                      {student.alerts.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {student.alerts.map((a, i) => (
                            <span key={i} className="bg-orange-50 text-orange-600 ring-1 ring-orange-100 ring-inset px-2 py-0.5 rounded-lg text-[10px] font-bold">
                              ⚠️ {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center shrink-0">
                      <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                        View Profile
                      </button>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                        Message Parents
                      </button>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                        Add Note
                      </button>
                      <button
                        onClick={() => setExpanded(isOpen ? null : student.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-gray-100 bg-gray-50 p-5 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Academic Summary</p>
                          <p className="text-sm text-gray-700 font-medium">GPA: {student.grade}</p>
                          <p className="text-sm text-gray-700">Rank: Top 20% of class</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Behavioral Notes</p>
                          <p className="text-sm text-gray-700">No incidents this term</p>
                          <p className="text-sm text-gray-700">Active class participant</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Parent Contact</p>
                          <p className="text-sm text-gray-700 font-medium">Last contacted: 2 days ago</p>
                          <button className="mt-1 flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline">
                            <MessageSquare className="w-3.5 h-3.5" /> Send message now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-80 w-full">
        <TeacherStudentsRight />
      </div>
    </div>
  );
};

export default TeacherStudents;
