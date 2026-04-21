import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../../services/userService';
import { Users, UserPlus, Pencil, Trash2, X, Loader2 } from 'lucide-react';

export default function UserManagementPage() {
  const [role, setRole] = useState('student');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    student_id: '',
    employee_id: '',
    is_prefect: false,
    prefect_title: '',
    institutional_role: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

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
        institutional_role: user.institutional_role || ''
      });
    } else {
      setFormData({ full_name: '', email: '', password: '', student_id: '', employee_id: '', is_prefect: false, prefect_title: '', institutional_role: '' });
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
      if (role !== 'student') {
        delete payload.student_id;
        delete payload.is_prefect;
        delete payload.prefect_title;
      } else {
        if (!payload.is_prefect) delete payload.prefect_title; // ignore title if not prefect
      }
      if (role !== 'teacher' && role !== 'worker') {
        delete payload.employee_id;
        delete payload.institutional_role;
      }
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
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
              </div>

              {role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Student ID</label>
                    <input required={!editingUser} value={formData.student_id} onChange={e => setFormData({...formData, student_id: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
                  </div>
                  <div>
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
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password {editingUser && '(Leave blank to retain)'}</label>
                <input type="password" required={!editingUser} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500" />
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
    </div>
  );
}
