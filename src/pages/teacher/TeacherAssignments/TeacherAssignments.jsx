import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Filter, Search, ChevronDown, Send, Eye, BookOpen,
  Clock, CheckCircle2, AlertCircle, PlusCircle, Download, Bell, Loader2
} from 'lucide-react';
import TeacherAssignmentsRight from './TeacherAssignmentsRight';
import { getAssignments } from '../../../services/assignmentService';
import { getClasses } from '../../../services/classService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110 } },
};

const filterTabs = ['All Assignments', 'Active', 'Grading Needed', 'Upcoming', 'Past'];

const TeacherAssignments = () => {
  const [activeTab, setActiveTab] = useState(filterTabs[0]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentsData] = await Promise.all([
          getAssignments(),
        ]);
        setAssignments(assignmentsData.data || assignmentsData);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAssignments = assignments.filter(a => {
    if (activeTab === 'All Assignments') return true;
    if (activeTab === 'Active') return a.status === 'active';
    // Add more filter logic as needed based on actual API response fields
    return true;
  });

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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

        {/* Assignment cards */}
        <motion.div
          className="space-y-5 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAssignments.map(a => (
            <motion.div
              key={a.id}
              variants={itemVariants}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700`}>
                  {a.subject?.name || 'General'}
                </span>
                {new Date(a.due_date) < new Date(Date.now() + 86400000) && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Due Soon
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">{a.title}</h3>
              <p className="text-xs text-gray-500 mb-4">
                Assigned: {new Date(a.assigned_date).toLocaleDateString()} &nbsp;•&nbsp; 
                <span className="text-gray-500">Due: {new Date(a.due_date).toLocaleDateString()}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2.5 rounded-2xl text-xs font-bold border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all">
                  View Submissions
                </button>
                <button className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
                  Grade Now
                </button>
              </div>
            </motion.div>
          ))}
          {filteredAssignments.length === 0 && (
            <div className="text-center py-12 text-gray-400 italic">
              No assignments found for this filter.
            </div>
          )}
        </motion.div>
      </div>

      <div className="lg:w-80 w-full">
        <TeacherAssignmentsRight />
      </div>
    </div>
  );
};

export default TeacherAssignments;
