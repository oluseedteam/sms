import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, User, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, X, Save } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import apiFetch from '../../../services/api';

const AdminSettingsPage = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [profilePic, setProfilePic] = useState(user?.profile_picture || null);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return setAlert({ type: 'error', message: 'Image must be under 2MB.' });
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...profileForm };
      if (profilePic && profilePic !== user?.profile_picture) {
        payload.profile_picture = profilePic;
      }
      const res = await apiFetch('/auth/profile', { method: 'PATCH', body: JSON.stringify(payload) });
      updateUser(res.user || payload);
      setAlert({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to update profile.' });
    } finally { setLoading(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.password !== passwordForm.password_confirmation) {
      return setAlert({ type: 'error', message: 'New passwords do not match.' });
    }
    setLoading(true);
    try {
      await apiFetch('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify({ password: passwordForm.password }),
      });
      setPasswordForm({ current_password: '', password: '', password_confirmation: '' });
      setAlert({ type: 'success', message: 'Password changed successfully!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to change password.' });
    } finally { setLoading(false); }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
      <AnimatePresence>
        {alert && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-3 ${alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {alert.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            {alert.message}
            <button onClick={() => setAlert(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <Settings className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-black text-gray-800">Admin Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleProfileSave} className="space-y-5">
            {/* Profile Picture */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-blue-100 border-2 border-blue-50">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                  <input type="file" accept="image/*" onChange={handlePicChange} className="hidden" />
                  <User className="w-3 h-3" />
                </label>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">{user?.full_name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Super Admin</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
              <input required value={profileForm.full_name} onChange={e => setProfileForm({ ...profileForm, full_name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-400" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">Email</label>
              <input required type="email" value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-400" />
            </div>

            <button type="submit" disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2 shadow-md shadow-blue-500/20">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile
            </button>
          </form>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handlePasswordSave} className="space-y-5">
            {[
              { key: 'password', label: 'New Password', showKey: 'new' },
              { key: 'password_confirmation', label: 'Confirm New Password', showKey: 'confirm' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">{field.label}</label>
                <div className="relative">
                  <input required type={showPass[field.showKey] ? 'text' : 'password'} minLength={8}
                    value={passwordForm[field.key]} onChange={e => setPasswordForm({ ...passwordForm, [field.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-400 pr-12" />
                  <button type="button" onClick={() => setShowPass(p => ({ ...p, [field.showKey]: !p[field.showKey] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass[field.showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400">Password must be at least 8 characters.</p>
            <button type="submit" disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2 shadow-md shadow-blue-500/20">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />} Change Password
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default AdminSettingsPage;
