import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCheck, Loader2, Users, BookOpen, DollarSign, MessageSquare, ClipboardList, UserPlus } from 'lucide-react';
import apiFetch from '../../../services/api';

// Generate a "notification" feed from system activity logs
const ICON_MAP = {
  payment: DollarSign,
  user: UserPlus,
  message: MessageSquare,
  assignment: ClipboardList,
  class: BookOpen,
  default: Bell,
};

const getIcon = (msg) => {
  const m = msg?.toLowerCase() || '';
  if (m.includes('payment') || m.includes('fee')) return DollarSign;
  if (m.includes('user') || m.includes('created') || m.includes('register')) return UserPlus;
  if (m.includes('message')) return MessageSquare;
  if (m.includes('assignment')) return ClipboardList;
  if (m.includes('class')) return BookOpen;
  return Bell;
};

const getColor = (msg) => {
  const m = msg?.toLowerCase() || '';
  if (m.includes('payment') || m.includes('fee')) return 'bg-green-50 text-green-600';
  if (m.includes('delete') || m.includes('error') || m.includes('fail')) return 'bg-red-50 text-red-500';
  if (m.includes('message') || m.includes('dispute')) return 'bg-purple-50 text-purple-600';
  if (m.includes('login')) return 'bg-yellow-50 text-yellow-600';
  return 'bg-blue-50 text-blue-600';
};

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const AdminNotificationsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/logs');
      setLogs(Array.isArray(res) ? res : res?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-black text-gray-800">Notifications</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{logs.length} Activities</span>
          <button onClick={fetchLogs} className="text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-xl transition-colors">
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-blue-500" /></div>
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <Bell className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="font-bold text-sm">No activity yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
          {logs.map((log, i) => {
            const Icon = getIcon(log.message || log.event || '');
            const colorClass = getColor(log.message || log.event || '');
            return (
              <motion.div key={log.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium">{log.message || log.event || 'Activity recorded'}</p>
                  {log.user && (
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      By: <span className="font-bold">{log.user?.name || log.user?.full_name || log.causer_name || 'System'}</span>
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{timeAgo(log.created_at)}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default AdminNotificationsPage;
