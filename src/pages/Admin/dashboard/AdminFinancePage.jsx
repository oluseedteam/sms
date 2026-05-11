import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Plus, Trash2, Pencil, X, Loader2, CheckCircle, AlertCircle, History, CreditCard } from 'lucide-react';
import { getFees, createFee, updateFee, deleteFee, getAllPayments } from '../../../services/financeService';
import { getClasses } from '../../../services/classService';

const AdminFinancePage = () => {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fees');
  const [showForm, setShowForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    class_name: '', department: '', term: '1st Term', academic_year: '', amount: '', description: ''
  });

  const classOptions = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'];
  const departmentOptions = ['', 'Science', 'Art', 'Commercial'];

  const fetchData = async () => {
    try {
      const [feesRes, paymentsRes, classesRes] = await Promise.all([
        getFees(), 
        getAllPayments(),
        getClasses()
      ]);
      setFees(Array.isArray(feesRes) ? feesRes : []);
      setPayments(paymentsRes?.data || []);
      setClasses(Array.isArray(classesRes) ? classesRes : classesRes?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const payload = { ...formData, amount: parseFloat(formData.amount) };
      if (!payload.department) delete payload.department;
      if (!payload.academic_year) delete payload.academic_year;

      if (editingFee) {
        await updateFee(editingFee.id, payload);
        setAlert({ type: 'success', message: 'Fee updated!' });
      } else {
        await createFee(payload);
        setAlert({ type: 'success', message: 'Fee created!' });
      }
      setShowForm(false);
      setEditingFee(null);
      setFormData({ class_name: '', department: '', term: '1st Term', academic_year: '', amount: '', description: '' });
      fetchData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this fee structure?')) return;
    try {
      await deleteFee(id);
      setAlert({ type: 'success', message: 'Fee deleted!' });
      fetchData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3">
          <DollarSign className="w-7 h-7 text-blue-500" /> Financial Management
        </h1>
        <button onClick={() => { setShowForm(true); setEditingFee(null); setFormData({ class_name: '', department: '', term: '1st Term', academic_year: '', amount: '', description: '' }); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 text-sm">
          <Plus className="w-4 h-4" /> Add Fee Structure
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {[
          { id: 'fees', label: 'Fee Structures', icon: DollarSign },
          { id: 'payments', label: 'Payment History', icon: History },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold">{editingFee ? 'Edit Fee' : 'Add Fee Structure'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-xl"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Class</label>
                    <select required value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm">
                      <option value="">Select Class</option>
                      {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department (SS only)</label>
                    <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm">
                      {departmentOptions.map(d => <option key={d} value={d}>{d || 'None (General)'}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Term</label>
                    <select required value={formData.term} onChange={e => setFormData({...formData, term: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm">
                      <option value="1st Term">1st Term</option>
                      <option value="2nd Term">2nd Term</option>
                      <option value="3rd Term">3rd Term</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Academic Year</label>
                    <input value={formData.academic_year} onChange={e => setFormData({...formData, academic_year: e.target.value})}
                      placeholder="e.g. 2025/2026" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Amount (₦)</label>
                  <input type="number" required min="0" step="0.01" value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm" placeholder="e.g. 50000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                  <input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-blue-500 text-sm" placeholder="e.g. Tuition fee" />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl text-sm">Cancel</button>
                  <button type="submit" disabled={formLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50">
                    {formLoading ? 'Saving...' : editingFee ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {fees.length === 0 ? (
            <p className="text-center py-12 text-gray-400 font-bold">No fee structures yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-gray-100 uppercase">
                    <th className="py-3 px-4 font-semibold">Class</th>
                    <th className="py-3 px-4 font-semibold">Department</th>
                    <th className="py-3 px-4 font-semibold">Term</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold hidden sm:table-cell">Year</th>
                    <th className="py-3 px-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map(f => (
                    <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-bold text-gray-800 text-sm">{f.class_name}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{f.department || '-'}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{f.term}</td>
                      <td className="py-3 px-4 font-black text-blue-900 text-sm">₦{parseFloat(f.amount).toLocaleString('en-NG')}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm hidden sm:table-cell">{f.academic_year || '-'}</td>
                      <td className="py-3 px-4 flex justify-end gap-2">
                        <button onClick={() => { setEditingFee(f); setFormData({ class_name: f.class_name, department: f.department || '', term: f.term, academic_year: f.academic_year || '', amount: f.amount, description: f.description || '' }); setShowForm(true); }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(f.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-3">
          {payments.length === 0 ? (
            <p className="text-center py-12 text-gray-400 font-bold">No payment records.</p>
          ) : (
            payments.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${p.type === 'funding' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    <CreditCard className={`w-5 h-5 ${p.type === 'funding' ? 'text-green-500' : 'text-blue-500'}`} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{p.student?.full_name} ({p.student?.student_id})</p>
                    <p className="text-[10px] text-gray-400 font-semibold capitalize">{p.type.replace('_', ' ')} • {new Date(p.created_at).toLocaleDateString('en-NG')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-blue-900">₦{parseFloat(p.amount).toLocaleString('en-NG')}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${p.status === 'successful' ? 'bg-green-50 text-green-600' : p.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>{p.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AdminFinancePage;
