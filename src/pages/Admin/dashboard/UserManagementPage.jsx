import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../../services/userService';
import { getClasses } from '../../../services/classService';
import { getSubjects, createSubject } from '../../../services/subjectService';
import { Users, UserPlus, Pencil, Trash2, X, Loader2, Eye } from 'lucide-react';

export default function UserManagementPage({ defaultRole = 'student' }) {
  const [role, setRole] = useState(defaultRole);

  useEffect(() => {
    setRole(defaultRole);
  }, [defaultRole]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [classesData, setClassesData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    student_id: '',
    employee_id: '',
    is_prefect: false,
    prefect_title: '',
    institutional_role: '',
    gender: '',
    class_id: '',
    subjects_text: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    Promise.all([getClasses(), getSubjects()]).then(([clsData, subData]) => {
      setClassesData(Array.isArray(clsData) ? clsData : (clsData?.data || []));
      setSubjectsData(Array.isArray(subData) ? subData : (subData?.data || []));
    }).catch(err => console.error(err));
  }, []);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers(role);
      setUsers(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({
        full_name: user.full_name,
        email: user.email,
        password: '',
        student_id: user.student_id || '',
        employee_id: user.employee_id || '',
        is_prefect: user.is_prefect || false,
        prefect_title: user.prefect_title || '',
        institutional_role: user.institutional_role || '',
        gender: user.gender || '',
        class_id: user.school_classes?.[0]?.id || '',
        subjects_text: user.subjects?.map(s => s.name).join(', ') || ''
      });
    } else {
      setFormData({ full_name: '', email: '', password: '', student_id: '', employee_id: '', is_prefect: false, prefect_title: '', institutional_role: '', gender: '', class_id: '', subjects_text: '' });
    }
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = { ...formData, role };
      if (!payload.password) delete payload.password;
      if (!payload.gender) delete payload.gender;
      if (role !== 'student') {
        delete payload.student_id;
        delete payload.is_prefect;
        delete payload.prefect_title;
        delete payload.class_id;
      } else {
        if (!payload.is_prefect) delete payload.prefect_title; // ignore title if not prefect
        if (!payload.class_id) delete payload.class_id;
      }
      if (role !== 'teacher' && role !== 'worker') {
        delete payload.employee_id;
        delete payload.institutional_role;
      }
      
      // Process custom subjects text for teachers
      if (role === 'teacher') {
        payload.subject_ids = [];
        if (payload.subjects_text?.trim()) {
           const subjectNames = payload.subjects_text.split(',').map(s => s.trim()).filter(Boolean);
           for (const sName of subjectNames) {
              const existing = subjectsData.find(s => s.name.toLowerCase() === sName.toLowerCase());
              if (existing) {
                 payload.subject_ids.push(existing.id);
              } else {
                 // Create new subject automatically
                 const res = await createSubject({ name: sName, code: sName.substring(0, 4).toUpperCase() + Math.floor(Math.random()*1000) });
                 payload.subject_ids.push(res.id);
              }
           }
        }
      }
      delete payload.subjects_text;
      
      if (!payload.student_id) delete payload.student_id;
      if (!payload.employee_id) delete payload.employee_id;

      if (editingUser) {
        await updateUser(role, editingUser.id, payload);
      } else {
        await createUser(payload);
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      setFormError(err?.errors ? Object.values(err.errors)[0][0] : err.message || 'Error saving user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(role, id);
        fetchUsers();
      } catch (err) {
        alert(err.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-blue-900">
          <Users className="w-8 h-8 text-blue-500" /> User Management
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
        >
          <UserPlus className="w-5 h-5" /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex gap-4 p-4 border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
          {['student', 'teacher', 'worker', 'admin'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-6 py-2 rounded-lg font-bold capitalize transition-all whitespace-nowrap ${role === r ? 'bg-blue-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {r}s
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
          ) : users.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No users found.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-100">
                  <th className="pb-3 px-4 font-semibold uppercase">Name</th>
                  <th className="pb-3 px-4 font-semibold uppercase">Email</th>
                  {role === 'student' && <th className="pb-3 px-4 font-semibold uppercase">Student ID</th>}
                  {(role === 'teacher' || role === 'worker') && <th className="pb-3 px-4 font-semibold uppercase">Employee ID</th>}
                  {role === 'student' && <th className="pb-3 px-4 font-semibold uppercase">Prefect</th>}
                  {(role === 'teacher' || role === 'worker') && <th className="pb-3 px-4 font-semibold uppercase">Post/Role</th>}
                  <th className="pb-3 px-4 text-right font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-800">{u.full_name}</td>
                    <td className="py-4 px-4 text-gray-600">{u.email}</td>
                    {role === 'student' && <td className="py-4 px-4 text-gray-600">{u.student_id || '-'}</td>}
                    {(role === 'teacher' || role === 'worker') && <td className="py-4 px-4 text-gray-600">{u.employee_id || '-'}</td>}
                    {role === 'student' && <td className="py-4 px-4 text-gray-600">{u.is_prefect ? (u.prefect_title || 'Yes') : 'No'}</td>}
                    {(role === 'teacher' || role === 'worker') && <td className="py-4 px-4 text-gray-600">{u.institutional_role || '-'}</td>}
                    <td className="py-4 px-4 flex justify-end gap-2">
                      <button onClick={() => setViewingUser(u)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenModal(u)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {editingUser ? <Pencil className="w-5 h-5 text-blue-500" /> : <UserPlus className="w-5 h-5 text-blue-500" />} 
                {editingUser ? `Edit ${role}` : `Add New ${role}`}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:bg-gray-100 p-2 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold">{formError}</div>}
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" required autoComplete="off" placeholder="Enter email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender</label>
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Student ID</label>
                    <input required={!editingUser} value={formData.student_id} onChange={e => setFormData({...formData, student_id: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Class</label>
                    <select value={formData.class_id} onChange={e => setFormData({...formData, class_id: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500">
                      <option value="">Select Class</option>
                      {classesData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mt-8 cursor-pointer w-max">
                      <input type="checkbox" checked={formData.is_prefect} onChange={e => setFormData({...formData, is_prefect: e.target.checked})} className="w-4 h-4 rounded" />
                      Is Prefect
                    </label>
                  </div>
                  {formData.is_prefect && (
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prefect Title / Post</label>
                        <input required value={formData.prefect_title} onChange={e => setFormData({...formData, prefect_title: e.target.value})} placeholder="e.g. Head Boy" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
                    </div>
                  )}
                </div>
              )}

              {(role === 'teacher' || role === 'worker') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Employee ID</label>
                    <input required={!editingUser} value={formData.employee_id} onChange={e => setFormData({...formData, employee_id: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Title / Post</label>
                    <input value={formData.institutional_role} onChange={e => setFormData({...formData, institutional_role: e.target.value})} placeholder={role === 'teacher' ? 'e.g. Principal' : 'e.g. Janitor'} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
                  </div>
                  {role === 'teacher' && (
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subjects (comma-separated)</label>
                      <input 
                         value={formData.subjects_text} 
                         onChange={e => setFormData({...formData, subjects_text: e.target.value})} 
                         placeholder="e.g. Mathematics, Physics, English" 
                         className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1 italic">Type subjects separated by commas. New subjects will be created automatically.</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password {editingUser && '(Leave blank to retain)'}</label>
                <input type="password" required={!editingUser} autoComplete="new-password" placeholder="Enter password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl">Cancel</button>
                <button type="submit" disabled={formLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50">
                  {formLoading ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2">
                User Details
              </h2>
              <button onClick={() => setViewingUser(null)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-center mb-6">
                {viewingUser.profile_picture ? (
                  <img src={viewingUser.profile_picture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-md" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-50 shadow-md">
                    <Users className="w-10 h-10 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <div className="font-bold text-gray-500 uppercase">Name:</div><div className="text-gray-900 font-semibold">{viewingUser.full_name}</div>
                <div className="font-bold text-gray-500 uppercase">Email:</div><div className="text-gray-900 font-semibold">{viewingUser.email}</div>
                <div className="font-bold text-gray-500 uppercase">Role:</div><div className="text-gray-900 font-semibold capitalize">{viewingUser.role || role}</div>
                <div className="font-bold text-gray-500 uppercase">Gender:</div><div className="text-gray-900 font-semibold capitalize">{viewingUser.gender || 'Not specified'}</div>
                
                {role === 'student' && (
                  <>
                    <div className="font-bold text-gray-500 uppercase">Student ID:</div><div className="text-gray-900 font-semibold">{viewingUser.student_id || '-'}</div>
                    <div className="font-bold text-gray-500 uppercase">Class:</div><div className="text-gray-900 font-semibold">{viewingUser.school_classes?.map(c => c.name).join(', ') || '-'}</div>
                    <div className="font-bold text-gray-500 uppercase">Prefect:</div><div className="text-gray-900 font-semibold">{viewingUser.is_prefect ? viewingUser.prefect_title || 'Yes' : 'No'}</div>
                  </>
                )}
                
                {(role === 'teacher' || role === 'worker') && (
                  <>
                    <div className="font-bold text-gray-500 uppercase">Employee ID:</div><div className="text-gray-900 font-semibold">{viewingUser.employee_id || '-'}</div>
                    <div className="font-bold text-gray-500 uppercase">Post:</div><div className="text-gray-900 font-semibold">{viewingUser.institutional_role || '-'}</div>
                  </>
                )}

                {role === 'teacher' && (
                  <>
                    <div className="font-bold text-gray-500 uppercase">Subjects:</div>
                    <div className="text-gray-900 font-semibold">{viewingUser.subjects?.map(s => s.name).join(', ') || '-'}</div>
                  </>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-50 bg-gray-50/50">
              <button onClick={() => setViewingUser(null)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
