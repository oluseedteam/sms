import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Download, Printer, Mail, PlusCircle, SlidersHorizontal,
  BarChart2, TrendingUp, ChevronDown, Save, Send, RotateCcw, History, Loader2
} from 'lucide-react';
import { getClasses, getClass } from '../../../services/classService';
import { getResults, createResult } from '../../../services/resultService';

const getScoreColor = (score, max) => {
  if (score === undefined || score === null) return 'bg-gray-100 text-gray-400';
  const pct = (score / max) * 100;
  if (pct >= 90) return 'bg-green-100 text-green-700';
  if (pct >= 80) return 'bg-blue-100 text-blue-700';
  if (pct >= 70) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const TeacherGradebook = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqueAssessments, setUniqueAssessments] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const classesData = await getClasses();
        setClasses(classesData);
        if (classesData.length > 0) {
          await handleClassChange(classesData[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleClassChange = async (classId) => {
    setLoading(true);
    try {
      const classDetail = await getClass(classId);
      setSelectedClass(classDetail);
      
      const resultsData = await getResults({ school_class_id: classId });
      setResults(resultsData.data || []);

      // Extract unique assessment names for columns
      const assessments = [...new Set((resultsData.data || []).map(r => r.assessment_name))];
      setUniqueAssessments(assessments);
    } catch (error) {
      console.error("Failed to fetch gradebook data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStudentScore = (studentId, assessmentName) => {
    return results.find(r => r.student_id === studentId && r.assessment_name === assessmentName);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 space-y-6 min-w-0 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gradebook</h1>
            <select 
              className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border-none outline-none cursor-pointer"
              value={selectedClass?.id || ''}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <PlusCircle className="w-3.5 h-3.5" /> New Assessment
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-wrap gap-2 items-center">
          <div className="text-xs font-bold text-gray-500 px-2">
            {selectedClass?.students?.length || 0} Students • {uniqueAssessments.length} Assessments
          </div>
        </div>

        {/* Grades table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-xs font-bold text-gray-500 w-48">Student Name</th>
                {uniqueAssessments.map((ass, i) => (
                  <th key={ass} className="p-3 text-center">
                    <p className="text-[10px] font-bold text-gray-700 uppercase">{ass}</p>
                    <div className="h-0.5 mt-1 rounded-full bg-blue-400 mx-auto w-8" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedClass?.students?.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
                        {s.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                      </div>
                      <span className="text-xs font-bold text-gray-800">{s.full_name}</span>
                    </div>
                  </td>
                  {uniqueAssessments.map(ass => {
                    const res = getStudentScore(s.id, ass);
                    return (
                      <td key={ass} className="p-2 text-center">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${getScoreColor(res?.score, res?.max_score)}`}>
                          {res ? `${res.score}/${res.max_score}` : '--'}
                        </span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
          {(!selectedClass?.students?.length || !uniqueAssessments.length) && (
            <div className="p-12 text-center text-gray-400 text-sm italic">
              No grading data available for this class.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;
