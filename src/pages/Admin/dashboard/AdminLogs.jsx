import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import apiFetch from '../../../services/api';
import PopupModal from '../../../components/PopupModal';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearing, setClearing] = useState(false);
  const [popup, setPopup] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [confirmClear, setConfirmClear] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/logs');
      // Update logic: apiFetch returns the JSON directly if it succeeds
      setLogs(res.logs || []);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      // Determine error structure
      const errMsg = err.message || 'Failed to fetch the system logs. Check server configuration.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClearRequest = () => {
    setPopup({ isOpen: true, type: 'confirm', title: 'Clear All Logs?', message: 'Are you sure you want to clear all system logs? This cannot be undone.' });
    setConfirmClear(true);
  };

  const handleClearConfirm = async () => {
    setPopup({ ...popup, isOpen: false });
    setConfirmClear(false);
    setClearing(true);
    try {
      await apiFetch('/logs', { method: 'DELETE' });
      setLogs([]);
      setPopup({ isOpen: true, type: 'success', title: 'Cleared!', message: 'System logs have been cleared.' });
    } catch (err) {
      console.error('Failed to clear logs:', err);
      setPopup({ isOpen: true, type: 'error', title: 'Error', message: err.message || 'Failed to clear the logs.' });
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-blue-900 tracking-tight flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-500" /> System Logs
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={fetchLogs} 
            className="flex-1 md:flex-none bg-white hover:bg-gray-50 text-blue-900 px-4 py-2 rounded-xl font-bold border border-gray-100 flex items-center justify-center gap-2 shadow-sm transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button 
            onClick={handleClearRequest} 
            disabled={clearing || logs.length === 0}
            className="flex-1 md:flex-none bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold border border-red-100 flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 text-sm"
          >
            {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Clear Logs
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
          <div>
            <h3 className="text-red-900 font-bold mb-1 border-b border-red-100 pb-1">Log Access Error</h3>
            <p className="text-red-600 text-[11px] md:text-sm whitespace-pre-wrap">{error}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] p-4 md:p-8 shadow-sm border border-gray-100 min-h-[60vh] relative overflow-hidden">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-bold">No system logs available.</p>
              <p className="text-sm">Everything is running smoothly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  key={index}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 ${
                    log.level === 'ERROR' || log.level === 'CRITICAL'
                      ? 'bg-red-50 border-red-100'
                      : log.level === 'WARNING'
                      ? 'bg-orange-50 border-orange-100'
                      : 'bg-gray-50 border-gray-100 hover:bg-white transition-colors'
                  }`}
                >
                  <div className="whitespace-nowrap flex flex-row sm:flex-col items-center justify-between sm:justify-center border-b sm:border-b-0 border-gray-200/50 pb-2 sm:pb-0 gap-2 sm:min-w-[120px]">
                    <span className="text-[9px] font-black tracking-widest uppercase text-gray-400">Date & Time</span>
                    <span className="text-[11px] font-bold text-gray-700">{log.timestamp}</span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center min-w-[90px] h-fit self-start sm:self-center ${
                    log.level === 'ERROR' || log.level === 'CRITICAL' ? 'bg-red-200/50 text-red-700' : 
                    log.level === 'WARNING' ? 'bg-orange-200/50 text-orange-700' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {log.level}
                  </div>
                  
                  <div className="flex-1 font-mono text-[10px] md:text-xs text-gray-700 whitespace-pre-wrap wrap-break-word opacity-90 leading-relaxed self-center">
                    {log.message}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>

    <PopupModal
      isOpen={popup.isOpen}
      type={popup.type}
      title={popup.title}
      message={popup.message}
      onClose={() => { setPopup({ ...popup, isOpen: false }); setConfirmClear(false); }}
      onConfirm={confirmClear ? handleClearConfirm : undefined}
    />
    </>
  );
};

export default AdminLogs;
