import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, Save, Loader2, Award, Calendar, AlertCircle } from 'lucide-react';
import { getAvailableSubjects, registerCourses, getAcademicSessions } from '../../../services/reportCardService';
import { getMyClasses } from '../../../services/classService';
import toast from 'react-hot-toast';

export default function CourseRegistrationPage() {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('1st Term');
  const [selectedClass, setSelectedClass] = useState('');

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (selectedSession && selectedTerm) {
      fetchSubjects();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSession, selectedTerm, selectedClass]);

  const init = async () => {
    try {
      const [sessionsRes, classesRes] = await Promise.all([
        getAcademicSessions(),
        getMyClasses().catch(() => []),
      ]);

      const sessionList = Array.isArray(sessionsRes) ? sessionsRes : (sessionsRes?.data || []);
      const classList = Array.isArray(classesRes) ? classesRes : (classesRes?.data || []);

      setSessions(sessionList);
      setClasses(classList);

      const activeSession = sessionList.find(s => s.is_current) || sessionList[0];
      if (activeSession) {
        setSelectedSession(activeSession.id);
        setSelectedTerm(activeSession.current_term || '1st Term');
      }

      if (classList.length > 0) {
        setSelectedClass(classList[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await getAvailableSubjects({
        academic_session_id: selectedSession,
        term: selectedTerm,
        school_class_id: selectedClass,
      });

      const list = res.subjects || [];
      setSubjects(list);

      const registered = list.filter(s => s.is_registered).map(s => s.id);
      setSelectedSubjectIds(registered);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load subjects.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubject = (subjectId) => {
    setSelectedSubjectIds(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubjectIds.length === subjects.length) {
      setSelectedSubjectIds([]);
    } else {
      setSelectedSubjectIds(subjects.map(s => s.id));
    }
  };

  const handleSaveRegistration = async () => {
    if (selectedSubjectIds.length === 0) {
      return toast.error('Please select at least one subject to register.');
    }

    setSaving(true);
    try {
      const res = await registerCourses({
        school_class_id: selectedClass || (classes[0]?.id ?? 1),
        academic_session_id: selectedSession,
        term: selectedTerm,
        subject_ids: selectedSubjectIds,
      });

      toast.success(res.message || 'Course registration completed successfully!');
      fetchSubjects();
    } catch (e) {
      toast.error(e.message || 'Failed to complete registration.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" /> Student Course Registration
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Register your subjects for the term. Your official Report Card will reflect your registered courses.
          </p>
        </div>

        <button
          onClick={handleSaveRegistration}
          disabled={saving || subjects.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Confirm & Save Registration
        </button>
      </div>

      {/* Selectors */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Academic Session</label>
            <select
              value={selectedSession}
              onChange={e => setSelectedSession(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
            >
              {sessions.map(s => (
                <option key={s.id} value={s.id}>{s.name} {s.is_current ? '(Current)' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Term</label>
            <select
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="1st Term">1st Term</option>
              <option value="2nd Term">2nd Term</option>
              <option value="3rd Term">3rd Term</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">
            {selectedSubjectIds.length} of {subjects.length} Subjects Selected
          </span>
          <button
            onClick={handleSelectAll}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            {selectedSubjectIds.length === subjects.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Loading available subjects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const isChecked = selectedSubjectIds.includes(s.id);

            return (
              <div
                key={s.id}
                onClick={() => handleToggleSubject(s.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isChecked
                    ? 'bg-blue-50/70 border-blue-300 shadow-sm'
                    : 'bg-white border-gray-100 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    {s.code}
                  </span>
                  <h3 className="font-black text-slate-900 text-sm">{s.name}</h3>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isChecked
                    ? 'bg-blue-600 text-white'
                    : 'border-2 border-gray-200 group-hover:border-blue-500'
                }`}>
                  {isChecked && <CheckCircle className="w-4 h-4" />}
                </div>
              </div>
            );
          })}

          {subjects.length === 0 && (
            <div className="col-span-full p-12 bg-white rounded-3xl border border-gray-100 text-center text-gray-400 italic">
              No subjects available for course registration in this term. Please contact the administrator.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
