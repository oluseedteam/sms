import React, { useState, useEffect } from 'react';
import { getClasses, createClass, deleteClass } from '../../../services/classService';
import { getSubjects, createSubject, deleteSubject } from '../../../services/subjectService';
import { BookOpen, GraduationCap, Plus, Trash2, Loader2 } from 'lucide-react';
import PopupModal from '../../../components/PopupModal';

// Nigerian school class structure
const NIGERIAN_CLASSES = [
  // Junior Secondary School
  { name: 'JSS 1A', grade_level: 'JSS 1' },
  { name: 'JSS 1B', grade_level: 'JSS 1' },
  { name: 'JSS 2A', grade_level: 'JSS 2' },
  { name: 'JSS 2B', grade_level: 'JSS 2' },
  { name: 'JSS 3A', grade_level: 'JSS 3' },
  { name: 'JSS 3B', grade_level: 'JSS 3' },
  // Senior Secondary School
  { name: 'SS 1 Science', grade_level: 'SS 1' },
  { name: 'SS 1 Art', grade_level: 'SS 1' },
  { name: 'SS 1 Commercial', grade_level: 'SS 1' },
  { name: 'SS 2 Science', grade_level: 'SS 2' },
  { name: 'SS 2 Art', grade_level: 'SS 2' },
  { name: 'SS 2 Commercial', grade_level: 'SS 2' },
  { name: 'SS 3 Science', grade_level: 'SS 3' },
  { name: 'SS 3 Art', grade_level: 'SS 3' },
  { name: 'SS 3 Commercial', grade_level: 'SS 3' },
];

const NIGERIAN_GRADE_LEVELS = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];

export default function AcademicManagementPage() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms state
  const [newClass, setNewClass] = useState({ name: '', grade_level: '', room: '', academic_year: '' });
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [submittingClass, setSubmittingClass] = useState(false);
  const [submittingSubject, setSubmittingSubject] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [deleteTarget, setDeleteTarget] = useState({ type: null, id: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clsRes, subRes] = await Promise.all([getClasses(), getSubjects()]);
      setClasses(Array.isArray(clsRes) ? clsRes : (clsRes?.data || []));
      setSubjects(Array.isArray(subRes) ? subRes : (subRes?.data || []));
    } catch (_err) {
      console.error(_err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setSubmittingClass(true);
    try {
      await createClass(newClass);
      setNewClass({ name: '', grade_level: '', room: '', academic_year: '' });
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Created!', message: 'Class has been created successfully.' });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to create class' });
    } finally {
      setSubmittingClass(false);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    setSubmittingSubject(true);
    try {
      const payload = { ...newSubject };
      if (!payload.code) {
         payload.code = payload.name.substring(0, 4).toUpperCase() + Math.floor(Math.random() * 1000);
      }
      await createSubject(payload);
      setNewSubject({ name: '', code: '' });
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Created!', message: 'Subject has been created successfully.' });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to create subject' });
    } finally {
      setSubmittingSubject(false);
    }
  };

  const handleDeleteRequest = (type, id) => {
    setDeleteTarget({ type, id });
    setPopup({ isOpen: true, type: 'confirm', title: `Delete ${type === 'class' ? 'Class' : 'Subject'}?`, message: `Are you sure you want to delete this ${type}? This action cannot be undone.` });
  };

  const handleDeleteConfirm = async () => {
    setPopup({ ...popup, isOpen: false });
    const { type, id } = deleteTarget;
    if (!id) return;
    try {
      if (type === 'class') {
        await deleteClass(id);
      } else {
        await deleteSubject(id);
      }
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Deleted!', message: `${type === 'class' ? 'Class' : 'Subject'} deleted successfully.` });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to delete' });
    }
    setDeleteTarget({ type: null, id: null });
  };

  // Handle quick-add from Nigerian class presets
  const handleQuickAddClass = async (nigerianClass) => {
    setSubmittingClass(true);
    try {
      await createClass({ name: nigerianClass.name, grade_level: nigerianClass.grade_level, room: '', academic_year: '' });
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Added!', message: `${nigerianClass.name} has been created.` });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to create class' });
    } finally {
      setSubmittingClass(false);
    }
  };

  // Filter out already-created Nigerian classes
  const existingClassNames = classes.map(c => c.name.toLowerCase());
  const availableNigerianClasses = NIGERIAN_CLASSES.filter(nc => !existingClassNames.includes(nc.name.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-blue-900">
          <BookOpen className="w-8 h-8 text-blue-500" /> Academic Management
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
      ) : (
        <div className="space-y-6">
          {/* Quick Add Nigerian Classes */}
          {availableNigerianClasses.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50 flex items-center gap-2">
                <GraduationCap className="text-green-600 w-5 h-5"/>
                <h2 className="font-bold text-gray-800">Quick Add – Nigerian School Classes</h2>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-3">Click to quickly add standard Nigerian school classes:</p>
                <div className="flex flex-wrap gap-2">
                  {availableNigerianClasses.map((nc, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAddClass(nc)}
                      disabled={submittingClass}
                      className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-all disabled:opacity-50"
                    >
                      + {nc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classes Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <GraduationCap className="text-blue-500 w-5 h-5"/>
                <h2 className="font-bold text-gray-800">Classes</h2>
              </div>
              <form onSubmit={handleCreateClass} className="p-4 border-b border-gray-50 flex gap-2 flex-wrap items-end bg-blue-50/30">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Class Name</label>
                  <input required placeholder="e.g. JSS 1A" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Grade Level</label>
                  <select required value={newClass.grade_level} onChange={e => setNewClass({...newClass, grade_level: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-blue-500 bg-white">
                    <option value="">Select Level</option>
                    {NIGERIAN_GRADE_LEVELS.map(gl => (
                      <option key={gl} value={gl}>{gl}</option>
                    ))}
                  </select>
                </div>
                <button disabled={submittingClass} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1 transition-all">
                  {submittingClass ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
                </button>
              </form>
              <div className="p-0 overflow-y-auto max-h-96">
                {classes.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">No classes found.</p>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {classes.map(c => (
                      <li key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <div className="font-bold text-gray-800">{c.name}</div>
                          <div className="text-xs text-gray-500">Grade: {c.grade_level}</div>
                        </div>
                        <button onClick={() => handleDeleteRequest('class', c.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Subjects Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <BookOpen className="text-blue-500 w-5 h-5"/>
                <h2 className="font-bold text-gray-800">Subjects</h2>
              </div>
              <form onSubmit={handleCreateSubject} className="p-4 border-b border-gray-50 flex gap-2 flex-wrap items-end bg-blue-50/30">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject Name</label>
                  <input required placeholder="e.g. Mathematics" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                </div>
                <div className="flex-1 min-w-[80px] max-w-[150px]">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Code (Optional)</label>
                  <input placeholder="e.g. MTH101" value={newSubject.code} onChange={e => setNewSubject({...newSubject, code: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-blue-500" />
                </div>
                <button disabled={submittingSubject} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1 transition-all">
                  {submittingSubject ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
                </button>
              </form>
              <div className="p-0 overflow-y-auto max-h-96">
                {subjects.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">No subjects found.</p>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {subjects.map(s => (
                      <li key={s.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                          <div className="font-bold text-gray-800">{s.name}</div>
                          <div className="text-xs text-gray-500">Code: {s.code}</div>
                        </div>
                        <button onClick={() => handleDeleteRequest('subject', s.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <PopupModal
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        onConfirm={popup.type === 'confirm' ? handleDeleteConfirm : undefined}
      />
    </div>
  );
}
