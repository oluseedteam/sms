import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusCircle, Loader2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { getClasses, getClass } from '../../../services/classService';
import { getResults, createResult, updateResult } from '../../../services/resultService';
import { getSubjects } from '../../../services/subjectService';

const ASSESSMENT_TYPES = ['homework', 'test', 'project', 'participation', 'exam'];

const TeacherGradebook = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqueAssessments, setUniqueAssessments] = useState([]);
  const [alert, setAlert] = useState(null);

  // New Assessment modal
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    assessment_name: '', assessment_type: 'test', subject_id: '', max_score: '100'
  });
  const [modalSaving, setModalSaving] = useState(false);

  // Inline editing map: { 'studentId-assessmentName': pendingScore }
  const [pendingScores, setPendingScores] = useState({});
  const [savingCell, setSavingCell] = useState(null);

  const fetchGradebookData = async (classId) => {
    setLoading(true);
    try {
      const classDetail = await getClass(classId);
      setSelectedClass(classDetail);
      const resultsData = await getResults({ school_class_id: classId });
      const list = resultsData.data || [];
      setResults(list);
      const assessments = [...new Set(list.map(r => r.assessment_name))];
      setUniqueAssessments(assessments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [classesData, subjectsData] = await Promise.all([getClasses(), getSubjects()]);
        const classList = Array.isArray(classesData) ? classesData : classesData?.data || [];
        setClasses(classList);
        setSubjects(Array.isArray(subjectsData) ? subjectsData : subjectsData?.data || []);
        if (classList.length > 0) await fetchGradebookData(classList[0].id);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleClassChange = (classId) => fetchGradebookData(classId);

  const getStudentResult = (studentId, assessmentName) =>
    results.find(r => r.student_id === studentId && r.assessment_name === assessmentName);

  // Save a single cell grade
  const handleSaveScore = async (student, assessmentName) => {
    const key = `${student.id}-${assessmentName}`;
    const scoreStr = pendingScores[key];
    if (scoreStr === undefined) return;
    const existing = getStudentResult(student.id, assessmentName);
    const maxScore = existing?.max_score ?? 100;
    const score = parseFloat(scoreStr);
    if (isNaN(score) || score < 0 || score > maxScore) {
      return setAlert({ type: 'error', message: `Score must be between 0 and ${maxScore}` });
    }

    setSavingCell(key);
    try {
      if (existing) {
        await updateResult(existing.id, { score });
      } else {
        // We need subject_id – if result doesn't exist, we can't create without a subject
        // Skip silently; "New Assessment" modal handles full creation
        setAlert({ type: 'error', message: 'Use "New Assessment" to add this assessment first, then edit from here.' });
        setSavingCell(null);
        return;
      }
      const newPending = { ...pendingScores };
      delete newPending[key];
      setPendingScores(newPending);
      await fetchGradebookData(selectedClass.id);
      setAlert({ type: 'success', message: 'Grade saved!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save grade.' });
    } finally {
      setSavingCell(null);
    }
  };

  // Create a new assessment for all students at once
  const handleCreateAssessment = async (e) => {
    e.preventDefault();
    if (!modalForm.assessment_name || !modalForm.subject_id) return;
    setModalSaving(true);
    try {
      const students = selectedClass?.students || [];
      await Promise.all(students.map(s => createResult({
        student_id: s.id,
        school_class_id: selectedClass.id,
        subject_id: parseInt(modalForm.subject_id),
        assessment_name: modalForm.assessment_name,
        assessment_type: modalForm.assessment_type,
        score: 0,
        max_score: parseFloat(modalForm.max_score) || 100,
      })));
      setShowModal(false);
      setModalForm({ assessment_name: '', assessment_type: 'test', subject_id: '', max_score: '100' });
      await fetchGradebookData(selectedClass.id);
      setAlert({ type: 'success', message: `Assessment "${modalForm.assessment_name}" created for all ${students.length} student(s)!` });
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to create assessment.' });
    } finally {
      setModalSaving(false);
    }
  };

  if (loading && classes.length === 0) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="flex flex-col gap-6 px-2 sm:px-4 lg:px-0">
      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-3 ${alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {alert.message}
            <button onClick={() => setAlert(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gradebook</h1>
          <select
            className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border-none outline-none cursor-pointer"
            value={selectedClass?.id || ''}
            onChange={e => handleClassChange(e.target.value)}
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
          <PlusCircle className="w-3.5 h-3.5" /> New Assessment
        </button>
      </div>

      {/* Stats bar */}
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center text-xs font-bold text-gray-500 px-4">
        <span>{selectedClass?.students?.length || 0} Students</span>
        <span className="text-gray-200">|</span>
        <span>{uniqueAssessments.length} Assessments</span>
        <span className="text-gray-200">|</span>
        <span className="text-blue-500">Click a score cell to edit inline</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-48 items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-xs font-bold text-gray-500 w-48">Student Name</th>
                {uniqueAssessments.map(ass => (
                  <th key={ass} className="p-3 text-center min-w-[90px]">
                    <p className="text-[10px] font-bold text-gray-700 uppercase">{ass}</p>
                    <div className="h-0.5 mt-1 rounded-full bg-blue-400 mx-auto w-8" />
                  </th>
                ))}
                {uniqueAssessments.length === 0 && (
                  <th className="p-4 text-xs text-gray-400 font-medium">No assessments yet – click "New Assessment"</th>
                )}
              </tr>
            </thead>
            <tbody>
              {selectedClass?.students?.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
                        {s.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                      </div>
                      <span className="text-xs font-bold text-gray-800">{s.full_name}</span>
                    </div>
                  </td>
                  {uniqueAssessments.map(ass => {
                    const res = getStudentResult(s.id, ass);
                    const key = `${s.id}-${ass}`;
                    const pending = pendingScores[key];
                    const isSaving = savingCell === key;
                    return (
                      <td key={ass} className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max={res?.max_score ?? 100}
                            value={pending !== undefined ? pending : (res?.score ?? '')}
                            onChange={e => setPendingScores({ ...pendingScores, [key]: e.target.value })}
                            className={`w-14 text-center text-xs font-bold rounded-lg py-1.5 px-1 border ${pending !== undefined ? 'border-blue-400 bg-blue-50' : 'border-gray-100 bg-gray-50'} focus:outline-blue-400`}
                            placeholder="--"
                          />
                          {pending !== undefined && (
                            isSaving ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                            ) : (
                              <button onClick={() => handleSaveScore(s, ass)} className="text-green-500 hover:text-green-700">
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            )
                          )}
                        </div>
                        {res && <p className="text-[9px] text-gray-400 mt-0.5">/{res.max_score}</p>}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
          {(!selectedClass?.students?.length) && (
            <div className="p-12 text-center text-gray-400 text-sm italic">No students in this class.</div>
          )}
        </div>
      )}

      {/* New Assessment Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold">Create New Assessment</h2>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
              </div>
              <form onSubmit={handleCreateAssessment} className="p-6 space-y-4">
                <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-xl p-3">
                  This will create an assessment entry (score = 0) for all <strong>{selectedClass?.students?.length || 0}</strong> students in <strong>{selectedClass?.name}</strong>. You can then update each score inline.
                </p>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Assessment Name</label>
                  <input required value={modalForm.assessment_name}
                    onChange={e => setModalForm({ ...modalForm, assessment_name: e.target.value })}
                    placeholder="e.g. Mid-Term Math Test" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Type</label>
                    <select value={modalForm.assessment_type}
                      onChange={e => setModalForm({ ...modalForm, assessment_type: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white">
                      {ASSESSMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Max Score</label>
                    <input type="number" min="1" required value={modalForm.max_score}
                      onChange={e => setModalForm({ ...modalForm, max_score: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject</label>
                  <select required value={modalForm.subject_id}
                    onChange={e => setModalForm({ ...modalForm, subject_id: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white">
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl text-sm">Cancel</button>
                  <button type="submit" disabled={modalSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2">
                    {modalSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                    Create for All
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherGradebook;
