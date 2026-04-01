import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Filter, Search, ChevronDown, Send, Eye, BookOpen,
  Clock, CheckCircle2, AlertCircle, PlusCircle, Download, Bell
} from 'lucide-react';
import TeacherAssignmentsRight from './TeacherAssignmentsRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110 } },
};

const assignments = [
  {
    id: 1,
    subject: 'Mathematics', subjectColor: 'bg-blue-100 text-blue-700',
    title: 'Math Practice Sheet – Addition Problems',
    assigned: 'Oct 23', due: 'Oct 26 (Tomorrow!)', dueAlert: true,
    pct: 86,
    barColor: 'bg-orange-500',
    breakdown: { notStarted: 2, inProgress: 2, submitted: 24, graded: 9 },
    needsGrading: 15,
    actions: [
      { label: 'View Submissions', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
      { label: 'Grade Now', style: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100' },
      { label: 'Send Reminders', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
    ],
    extensions: null,
  },
  {
    id: 2,
    subject: 'English Language Arts', subjectColor: 'bg-purple-100 text-purple-700',
    title: 'Reading Log – Chapter 3',
    assigned: 'Oct 24', due: 'Oct 27 (3 days)', dueAlert: false,
    pct: 64,
    barColor: 'bg-purple-500',
    breakdown: { notStarted: 2, inProgress: 8, submitted: 18, graded: 10 },
    needsGrading: 8,
    actions: [
      { label: 'Monitor Progress', style: 'bg-blue-900 text-white hover:bg-blue-800' },
      { label: 'Grade Submissions', style: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100' },
      { label: 'Extension Requests', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
    ],
    extensions: '1 extension request pending',
  },
  {
    id: 3,
    subject: 'Science', subjectColor: 'bg-green-100 text-green-700',
    title: 'Draw and Label Plant Parts',
    assigned: 'Oct 25', due: 'Oct 31 (6 days)', dueAlert: false,
    pct: 43,
    barColor: 'bg-green-500',
    breakdown: { notStarted: 16, inProgress: 12, submitted: 0, graded: 0 },
    needsGrading: 0,
    actions: [
      { label: 'View Details', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
      { label: 'Edit Assignment', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
      { label: 'Add Resources', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
    ],
    extensions: null,
    resources: ['Drawing paper', 'Colored pencils', 'Reference images'],
  },
  {
    id: 4,
    subject: 'English', subjectColor: 'bg-purple-100 text-purple-700',
    title: 'Weekly Spelling Practice',
    assigned: '', due: 'Completed: Oct 23', dueAlert: false,
    pct: 100,
    barColor: 'bg-green-500',
    breakdown: null,
    needsGrading: 0,
    classAvg: 'B+ (88%)',
    allGraded: true,
    topPerformers: ['Emma J. (100%)', 'Michael C. (98%)', 'Sarah W. (96%)'],
    actions: [
      { label: 'View Results', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
      { label: 'Download Report', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
      { label: 'Share with Parents', style: 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' },
    ],
    extensions: null,
  },
];

const filterTabs = ['All Assignments 31', 'Active 12', 'Grading Needed 15', 'Upcoming 8', 'Past 34'];

const TeacherAssignments = () => {
  const [activeTab, setActiveTab] = useState(filterTabs[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Assignment Management</h1>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all text-sm">
            <PlusCircle className="w-4 h-4" /> New Assignment
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
          {filterTabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === t
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
          {['Subject', 'Status', 'Date Range'].map(f => (
            <div key={f} className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">{f}:</span>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl hover:border-blue-200 transition-all">
                All <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Sort by:</span>
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl hover:border-blue-200 transition-all">
              Due Date <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Assignment cards */}
        <motion.div
          className="space-y-5 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {assignments.map(a => (
            <motion.div
              key={a.id}
              variants={itemVariants}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Subject badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${a.subjectColor}`}>
                  {a.subject}
                </span>
                {a.dueAlert && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Due Tomorrow!
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">{a.title}</h3>
              {a.assigned && <p className="text-xs text-gray-500 mb-4">Assigned: {a.assigned} &nbsp;•&nbsp; <span className={a.dueAlert ? 'text-red-600 font-bold' : 'text-gray-500'}>Due: {a.due}</span></p>}
              {!a.assigned && <p className="text-xs text-gray-500 mb-4">{a.due}</p>}

              {/* Progress bar */}
              {!a.allGraded ? (
                <>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-gray-600">
                    <span>Submission Status</span>
                    <span>{a.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className={`h-full ${a.barColor} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${a.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-400 font-bold">Class Average</p>
                      <p className="text-xl font-bold text-green-600">{a.classAvg}</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-400 font-bold">All 28 Students Graded</p>
                      <p className="text-xl font-bold text-blue-600">100%</p>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                  {a.topPerformers && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] font-bold text-gray-500">Top Performers:</span>
                      {a.topPerformers.map((p, i) => (
                        <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg">{p}</span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Breakdown */}
              {a.breakdown && (
                <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded-2xl p-3 mb-4 text-center">
                  {[
                    { l: 'Not Started', v: a.breakdown.notStarted },
                    { l: 'In Progress', v: a.breakdown.inProgress },
                    { l: 'Submitted',   v: a.breakdown.submitted },
                    { l: 'Graded',     v: a.breakdown.graded },
                  ].map((b, i) => (
                    <div key={i}>
                      <p className="text-lg font-bold text-gray-800">{b.v}</p>
                      <p className="text-[9px] text-gray-400 font-medium">{b.l}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Resources tags */}
              {a.resources && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {a.resources.map((r, i) => (
                    <span key={i} className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {r}
                    </span>
                  ))}
                </div>
              )}

              {/* Needs grading banner */}
              {a.needsGrading > 0 && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-xs font-bold text-orange-600">Needs Grading: {a.needsGrading} submissions</span>
                </div>
              )}

              {/* Extension warning */}
              {a.extensions && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-2.5 mb-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                  <span className="text-[11px] font-bold text-yellow-700">{a.extensions}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {a.actions.map((btn, i) => (
                  <button key={i} className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${btn.style}`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-80 w-full">
        <TeacherAssignmentsRight />
      </div>
    </div>
  );
};

export default TeacherAssignments;
