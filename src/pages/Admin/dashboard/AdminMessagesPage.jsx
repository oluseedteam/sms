import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Megaphone, User, Users, Loader2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { broadcastMessageToTeachers, getMessages } from '../../../services/messageService';
import apiFetch from '../../../services/api';

const AdminMessagesPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Broadcast form
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all'); // 'all' | teacher id
  const [broadcastSending, setBroadcastSending] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, msgsRes] = await Promise.all([
        apiFetch('/users?role=teacher'),
        getMessages(),
      ]);
      setTeachers(usersRes?.data?.filter(u => u.role === 'teacher') || usersRes?.teachers || []);
      setMessages(msgsRes?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastContent.trim()) return;
    setBroadcastSending(true);
    try {
      const payload = {
        content: broadcastContent,
        teacher_id: broadcastTarget === 'all' ? undefined : parseInt(broadcastTarget),
      };
      const res = await broadcastMessageToTeachers(payload);
      setAlert({ type: 'success', message: broadcastTarget === 'all'
        ? `Broadcast sent to all teachers (${res.sent}).`
        : 'Message sent to selected teacher.' });
      setBroadcastContent('');
      await fetchData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to send.' });
    } finally {
      setBroadcastSending(false);
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
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
      <div className="flex items-center gap-3">
        <Megaphone className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-black text-gray-800">Admin Messages</h1>
      </div>

      {/* Broadcast Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-4 text-lg">
          <Megaphone className="w-5 h-5 text-orange-500" /> Send Message to Teachers
        </h2>
        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Send To</label>
            <select value={broadcastTarget} onChange={e => setBroadcastTarget(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-blue-400">
              <option value="all">📢 All Teachers (Broadcast)</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>👤 {t.full_name} ({t.employee_id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
            <textarea
              required
              value={broadcastContent}
              onChange={e => setBroadcastContent(e.target.value)}
              placeholder="Write your message to teachers..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          <button type="submit" disabled={broadcastSending || !broadcastContent.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all">
            {broadcastSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {broadcastTarget === 'all' ? 'Broadcast to All Teachers' : 'Send to Teacher'}
          </button>
        </form>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-4 text-lg">
          <Users className="w-5 h-5 text-blue-500" /> Sent Messages
        </h2>
        {messages.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm italic">No messages sent yet.</p>
        ) : (
          <div className="space-y-3">
            {messages.slice(0, 20).map(m => (
              <div key={m.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                  {m.receiver?.full_name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-bold text-gray-800">To: {m.receiver?.full_name || 'Unknown'}</p>
                    <span className="text-[9px] text-gray-400 shrink-0">{new Date(m.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-gray-600">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminMessagesPage;
