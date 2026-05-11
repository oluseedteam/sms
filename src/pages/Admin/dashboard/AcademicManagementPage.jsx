import React, { useState, useEffect } from 'react';
import { getClasses, createClass, deleteClass } from '../../../services/classService';
import { getSubjects, createSubject, deleteSubject } from '../../../services/subjectService';
import { getResources, createResource, deleteResource } from '../../../services/resourceService';
import { BookOpen, GraduationCap, Plus, Trash2, Loader2, FileText, Link as LinkIcon, Upload, Globe, Users } from 'lucide-react';
import PopupModal from '../../../components/PopupModal';

// Nigerian school class structure
const NIGERIAN_CLASSES = [
  { name: 'JSS 1A', grade_level: 'JSS 1' },
  { name: 'JSS 1B', grade_level: 'JSS 1' },
  { name: 'JSS 2A', grade_level: 'JSS 2' },
  { name: 'JSS 2B', grade_level: 'JSS 2' },
  { name: 'JSS 3A', grade_level: 'JSS 3' },
  { name: 'JSS 3B', grade_level: 'JSS 3' },
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
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms state
  const [newClass, setNewClass] = useState({ name: '', grade_level: '', room: '', academic_year: '' });
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [newResource, setNewResource] = useState({ title: '', type: 'pdf', url: '', school_class_id: '' });
  
  const [submittingClass, setSubmittingClass] = useState(false);
  const [submittingSubject, setSubmittingSubject] = useState(false);
  const [submittingResource, setSubmittingResource] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [deleteTarget, setDeleteTarget] = useState({ type: null, id: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clsRes, subRes, resRes] = await Promise.all([
        getClasses(), 
        getSubjects(),
        getResources()
      ]);
      setClasses(Array.isArray(clsRes) ? clsRes : (clsRes?.data || []));
      setSubjects(Array.isArray(subRes) ? subRes : (subRes?.data || []));
      setResources(Array.isArray(resRes) ? resRes : (resRes?.data || []));
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

  const handleCreateResource = async (e) => {
    e.preventDefault();
    setSubmittingResource(true);
    try {
      await createResource(newResource);
      setNewResource({ title: '', type: 'pdf', url: '', school_class_id: '' });
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Uploaded!', message: 'Library resource added successfully.' });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to upload resource' });
    } finally {
      setSubmittingResource(false);
    }
  };

  const handleDeleteRequest = (type, id) => {
    setDeleteTarget({ type, id });
    setPopup({ isOpen: true, type: 'confirm', title: `Delete ${type === 'class' ? 'Class' : type === 'subject' ? 'Subject' : 'Resource'}?`, message: `Are you sure you want to delete this ${type}? This action cannot be undone.` });
  };

  const handleDeleteConfirm = async () => {
    setPopup({ ...popup, isOpen: false });
    const { type, id } = deleteTarget;
    if (!id) return;
    try {
      if (type === 'class') {
        await deleteClass(id);
      } else if (type === 'subject') {
        await deleteSubject(id);
      } else {
        await deleteResource(id);
      }
      fetchData();
      setPopup({ isOpen: true, type: 'success', title: 'Deleted!', message: `${type} deleted successfully.` });
    } catch (_err) {
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: _err.message || 'Failed to delete' });
    }
    setDeleteTarget({ type: null, id: null });
  };

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

  const existingClassNames = classes.map(c => c.name.toLowerCase());
  const availableNigerianClasses = NIGERIAN_CLASSES.filter(nc => !existingClassNames.includes(nc.name.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-blue-900">
          <BookOpen className="w-8 h-8 text-blue-500" /> Academic & Library Management
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
      ) : (
        <div className="space-y-6">
          {availableNigerianClasses.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-linear-to-r from-green-50 to-blue-50 flex items-center gap-2">
                <GraduationCap className="text-green-600 w-5 h-5"/>
                <h2 className="font-bold text-gray-800">Quick Add – Nigerian Classes</h2>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {availableNigerianClasses.map((nc, i) => (
                    <button key={i} onClick={() => handleQuickAddClass(nc)} disabled={submittingClass} className="px-3 py-1.5 text-[10px] font-black uppercase bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-all disabled:opacity-50">+ {nc.name}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classes */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2 font-black uppercase tracking-widest text-[11px] text-gray-600">
                <GraduationCap className="text-blue-500 w-4 h-4"/> Classrooms
              </div>
              <form onSubmit={handleCreateClass} className="p-4 border-b border-gray-50 flex gap-2 items-end bg-blue-50/20">
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Class Name</label>
                  <input required placeholder="JSS 1A" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Level</label>
                  <select required value={newClass.grade_level} onChange={e => setNewClass({...newClass, grade_level: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none bg-white">
                    <option value="">Lvl</option>
                    {NIGERIAN_GRADE_LEVELS.map(gl => <option key={gl} value={gl}>{gl}</option>)}
                  </select>
                </div>
                <button disabled={submittingClass} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-black text-xs h-9 flex items-center gap-2">
                  {submittingClass ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />} ADD
                </button>
              </form>
              <div className="p-0 overflow-y-auto h-64 scrollbar-hide">
                 {classes.map(c => (
                   <div key={c.id} className="p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50/50">
                      <div>
                        <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{c.name}</p>
                        <p className="text-[10px] font-bold text-gray-400">{c.grade_level}</p>
                      </div>
                      <button onClick={() => handleDeleteRequest('class', c.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2 font-black uppercase tracking-widest text-[11px] text-gray-600">
                <BookOpen className="text-indigo-500 w-4 h-4"/> Subjects
              </div>
              <form onSubmit={handleCreateSubject} className="p-4 border-b border-gray-50 flex gap-2 items-end bg-indigo-50/20">
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Subject Name</label>
                  <input required placeholder="Mathematics" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" />
                </div>
                <button disabled={submittingSubject} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-black text-xs h-9 flex items-center gap-2">
                  {submittingSubject ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />} ADD
                </button>
              </form>
              <div className="p-0 overflow-y-auto h-64 scrollbar-hide">
                 {subjects.map(s => (
                   <div key={s.id} className="p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50/50">
                      <div>
                        <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{s.name}</p>
                        <p className="text-[10px] font-bold text-gray-400">{s.code}</p>
                      </div>
                      <button onClick={() => handleDeleteRequest('subject', s.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Library Resources */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <FileText className="w-5 h-5 text-blue-600"/>
                  </div>
                  <h2 className="font-black text-gray-800 uppercase tracking-widest text-sm">Library Resources</h2>
               </div>
               <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">{resources.length} active items</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 h-[500px]">
               {/* Upload Form */}
               <div className="lg:col-span-2 border-r border-gray-50 p-8 space-y-6 bg-gray-50/20">
                  <form onSubmit={handleCreateResource} className="space-y-4">
                     <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Resource Title</label>
                        <input required placeholder="e.g. Physics Textbook Part 1" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Type</label>
                           <select value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold bg-white outline-none">
                              <option value="pdf">PDF File</option>
                              <option value="link">URL Link</option>
                              <option value="video">Video</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visible To</label>
                           <select value={newResource.school_class_id} onChange={e => setNewResource({...newResource, school_class_id: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold bg-white outline-none capitalize">
                              <option value="">Everyone (Global)</option>
                              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                           </select>
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Resource URL / Path</label>
                        <div className="relative">
                           <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input required placeholder="https://drive.google.com/..." value={newResource.url} onChange={e => setNewResource({...newResource, url: e.target.value})} className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-sm bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" />
                        </div>
                     </div>
                     <button disabled={submittingResource} type="submit" className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                        {submittingResource ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Publish to Library
                     </button>
                  </form>
               </div>

               {/* Resource List */}
               <div className="lg:col-span-3 overflow-y-auto p-4 space-y-3">
                  {resources.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-30 gap-4">
                       <Globe className="w-12 h-12"/>
                       <p className="font-black text-xs uppercase tracking-widest">Library is empty</p>
                    </div>
                  ) : (
                    resources.map(r => (
                      <div key={r.id} className="group p-5 bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center font-black text-blue-600 uppercase text-[10px]">
                               {r.type}
                            </div>
                            <div>
                               <h4 className="font-black text-gray-800 text-sm uppercase tracking-tight mb-1">{r.title}</h4>
                               <div className="flex items-center gap-3">
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1">
                                     <Users className="w-3 h-3"/> {r.school_class?.name || 'Global'}
                                  </span>
                                  <a href={r.url} target="_blank" rel="noreferrer" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-wide">View Resource</a>
                               </div>
                            </div>
                         </div>
                         <button onClick={() => handleDeleteRequest('resource', r.id)} className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                            <Trash2 className="w-5 h-5"/>
                         </button>
                      </div>
                    ))
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
