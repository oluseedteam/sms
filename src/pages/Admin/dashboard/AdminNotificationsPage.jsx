import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Loader2, BookOpen, DollarSign, MessageSquare, ClipboardList, UserPlus, Trash2, AlertCircle, Smile, Mail } from 'lucide-react';
import apiFetch from '../../../services/api';
import { getMessages, deleteMessage } from '../../../services/messageService';
import { getDisputes, deleteDispute } from '../../../services/disputeService';
import { getInquiries, deleteInquiry } from '../../../services/inquiryService';
import toast from 'react-hot-toast';

const getIcon = (msg) => {
  const m = msg?.toLowerCase() || '';
  if (m.includes('inquiry') || m.includes('tour') || m.includes('contact')) return Mail;
  if (m.includes('payment') || m.includes('fee')) return DollarSign;
  if (m.includes('user') || m.includes('created') || m.includes('register')) return UserPlus;
  if (m.includes('message')) return MessageSquare;
  if (m.includes('assignment')) return ClipboardList;
  if (m.includes('class')) return BookOpen;
  return Bell;
};

const getColor = (msg) => {
  const m = msg?.toLowerCase() || '';
  if (m.includes('inquiry') || m.includes('tour')) return 'bg-blue-50 text-blue-700';
  if (m.includes('payment') || m.includes('fee')) return 'bg-green-50 text-green-600';
  if (m.includes('delete') || m.includes('error') || m.includes('fail')) return 'bg-red-50 text-red-500';
  if (m.includes('message') || m.includes('dispute')) return 'bg-purple-50 text-purple-600';
  if (m.includes('login')) return 'bg-yellow-50 text-yellow-600';
  return 'bg-blue-50 text-blue-600';
};

const timeAgo = (dateStr) => {
  if (!dateStr) return '...';
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
  const [clearing, setClearing] = useState(false);
  
  // Custom dialog state
  const [confirmClear, setConfirmClear] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const [logsRes, msgsRes, disputesRes, inqRes] = await Promise.all([
        apiFetch('/logs').catch(() => ({ logs: [] })),
        getMessages().catch(() => ({ data: [] })),
        getDisputes().catch(() => ({ data: [] })),
        getInquiries().catch(() => ({ data: [] })),
      ]);
      
      const combined = [
        ...(Array.isArray(logsRes) ? logsRes : logsRes?.logs || []).map(l => ({ ...l, type: 'log', id: l.id || `log-${l.timestamp}` })),
        ...(msgsRes?.data || []).map(m => ({ 
           id: `msg-${m.id}`, 
           dbId: m.id,
           message: `New message from ${m.sender?.full_name || 'User'}: ${m.content ? m.content.substring(0, 30) : ''}...`, 
           created_at: m.created_at,
           type: 'message'
        })),
        ...(disputesRes?.data || []).map(d => ({ 
           id: `disp-${d.id}`, 
           dbId: d.id,
           message: `Feedback/Dispute: ${d.subject}`, 
           created_at: d.created_at,
           type: 'dispute'
        })),
        ...(inqRes?.data || []).map(inq => ({
           id: `inq-${inq.id}`,
           dbId: inq.id,
           message: `Contact Inquiry [${inq.inquiry_type}] from ${inq.name} (${inq.email}): ${inq.message?.substring(0, 35)}...`,
           created_at: inq.created_at,
           type: 'inquiry'
        }))
      ].sort((a, b) => new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp));

      setLogs(combined);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleClearAll = async () => {
      setClearing(true);
      try {
          // Clear multiple sources to ensure nothing "comes back" on refresh
          await Promise.all([
              apiFetch('/logs', { method: 'DELETE' }),
              apiFetch('/admin/messages/wipe-all', { method: 'DELETE' }),
              apiFetch('/disputes/clear-all', { method: 'DELETE' })
          ]);
          
          toast.success('System logs, messages, and feedback cleared permanently');
          setConfirmClear(false);
          fetchLogs();
      } catch {
          toast.error('Failed to clear some communication sources');
      } finally {
          setClearing(false);
      }
  };

  const handleDeleteItem = async () => {
      if (!deleteTarget) return;
      try {
          if (deleteTarget.type === 'message') {
              await deleteMessage(deleteTarget.dbId);
          } else if (deleteTarget.type === 'dispute') {
              await deleteDispute(deleteTarget.dbId);
          } else if (deleteTarget.type === 'inquiry') {
              await deleteInquiry(deleteTarget.dbId);
          } else {
              toast.error('Log entry removal not supported via individual delete');
              return;
          }
          toast.success('Notification removed');
          setDeleteTarget(null);
          fetchLogs();
      } catch {
          toast.error('Failed to remove item');
      }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl">
            <Bell className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">NOTIFICATIONS</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Real-time system activity</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setConfirmClear(true)}
            disabled={clearing}
            className="text-[10px] font-black text-red-500 uppercase tracking-widest px-6 py-3 bg-red-50 hover:bg-red-100 rounded-2xl transition-all flex items-center gap-2 border border-red-100/50 active:scale-95"
          >
            {clearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} clear all logs
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-16 text-center text-gray-400 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500/20 to-indigo-500/20" />
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smile className="w-10 h-10 opacity-20" />
          </div>
          <p className="font-black text-xs uppercase tracking-widest opacity-40 italic">Nothing new to show here</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-500/5 divide-y divide-gray-50 overflow-hidden">
          {logs.map((log, i) => {
            const Icon = getIcon(log.message || log.event || '');
            const colorClass = getColor(log.message || log.event || '');
            return (
              <motion.div key={log.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-start gap-5 p-6 hover:bg-gray-50/50 transition-all group">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-bold leading-relaxed">{log.message || log.event || 'Activity recorded'}</p>
                  <div className="flex items-center gap-3 mt-1.5 uppercase tracking-widest font-black text-[9px]">
                    <span className="text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{log.type}</span>
                    {log.user && (
                      <span className="text-gray-400">By: {log.user?.name || log.user?.full_name || log.causer_name || 'System'}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[10px] font-black text-gray-400 mt-1">{timeAgo(log.created_at || log.timestamp)}</span>
                    <button 
                        onClick={() => setDeleteTarget(log)}
                        className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-xl border border-gray-100 text-gray-300 hover:text-red-500 transition-all shadow-sm hover:shadow-md"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialogs */}
      <AnimatePresence>
        {confirmClear && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full shadow-2xl border border-gray-100">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight mb-3">WIPE ALL LOGS?</h3>
                    <p className="text-sm font-medium text-gray-500 mb-10 leading-relaxed italic">This will erase all activity records permanently. This cannot be undone.</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={handleClearAll} className="w-full py-5 bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95">Yes, clear system logs</button>
                        <button onClick={() => setConfirmClear(false)} className="w-full py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">Keep records</button>
                    </div>
                </motion.div>
            </div>
        )}

        {deleteTarget && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[200] p-4 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full shadow-2xl border border-gray-100">
                     <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                        <Trash2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight mb-3">DELETE ITEM?</h3>
                    <p className="text-sm font-medium text-gray-500 mb-10 leading-relaxed italic">Remove this specific notification from your view permanently?</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={handleDeleteItem} className="w-full py-5 bg-gray-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">confirm deletion</button>
                        <button onClick={() => setDeleteTarget(null)} className="w-full py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">go back</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminNotificationsPage;
