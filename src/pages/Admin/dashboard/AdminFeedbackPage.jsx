import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Star, 
  Trash2, 
  User, 
  Clock, 
  AlertTriangle,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import apiFetch from '../../../services/api';

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'approved', 'featured', 'rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/admin/feedbacks');
      setFeedbacks(res || []);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, isFeatured = null) => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const payload = { status };
      if (isFeatured !== null) {
        payload.is_featured = isFeatured;
      }

      await apiFetch(`/admin/feedbacks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

      setSuccessMessage(`Feedback marked as ${status}.`);
      fetchFeedbacks();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update feedback status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback item?')) return;
    try {
      await apiFetch(`/admin/feedbacks/${id}`, { method: 'DELETE' });
      setSuccessMessage('Feedback deleted.');
      fetchFeedbacks();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete feedback');
    }
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'featured' ? f.is_featured : f.status === filterStatus);
    
    const matchesQuery = 
      f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 text-slate-800">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-800 font-bold border border-blue-100 shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              Public Testimonials & Feedback Moderation
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Review, approve, feature or reject submissions from parents, students, and alumni
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 bg-blue-50 text-blue-800 rounded-full text-xs font-black">
          {feedbacks.filter(f => f.status === 'approved').length} Approved Testimonials
        </span>
      </div>

      {successMessage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs font-bold text-blue-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── Filters & Search ── */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
          {['all', 'pending', 'approved', 'featured', 'rejected'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black capitalize transition cursor-pointer whitespace-nowrap ${
                filterStatus === st ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feedback..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* ── Feedback List Grid ── */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold">Loading submissions...</p>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-100">
          <p className="text-sm font-bold text-slate-600">No feedback found matching the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.map(f => (
            <div
              key={f.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {f.is_featured && (
                <div className="absolute top-0 right-0 bg-amber-400 text-blue-950 px-3 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Featured</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-black text-sm border border-blue-100">
                    {f.name ? f.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">{f.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium capitalize">
                      {f.role || 'Parent / Guardian'} {f.rating ? `• ${f.rating} ★` : ''}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100 italic">
                  "{f.message}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {f.created_at ? new Date(f.created_at).toLocaleDateString() : 'Recent'}
                  </span>

                  <span className={`px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    f.status === 'approved' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    f.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {f.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {f.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(f.id, 'approved')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleUpdateStatus(f.id, f.status, !f.is_featured)}
                    className={`p-1.5 rounded-xl border transition cursor-pointer ${
                      f.is_featured 
                        ? 'bg-amber-50 border-amber-300 text-amber-600' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500'
                    }`}
                    title={f.is_featured ? 'Remove featured' : 'Feature testimonial'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  {f.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(f.id, 'rejected')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
