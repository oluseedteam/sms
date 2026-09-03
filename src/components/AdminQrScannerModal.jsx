import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  X, 
  UserCheck, 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  ExternalLink,
  Printer,
  Phone
} from 'lucide-react';
import apiFetch from '../services/api';
import IdCardModal from './IdCardModal';

export default function AdminQrScannerModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [idCardTarget, setIdCardTarget] = useState(null);

  if (!isOpen) return null;

  const handleLookup = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await apiFetch('/admin/qr/lookup', {
        method: 'POST',
        body: JSON.stringify({ query: query.trim() }),
      });

      if (res.found) {
        setResult(res);
      } else {
        setError('No user matches the provided QR identifier.');
      }
    } catch (err) {
      setError(err.message || 'Lookup failed. Please verify the QR identifier or ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase">Authorized QR Lookup & Scanner</h3>
                <p className="text-[11px] text-slate-400">Scan QR Code badge or enter Student/Employee ID</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search / Scan Input */}
          <form onSubmit={handleLookup} className="space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Scan QR or enter ID (e.g. GHRA-STU-101)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Searching Profile...' : 'Verify & Lookup Profile'}
            </button>
          </form>

          {/* Error Notice */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                  {result.user.profile_picture ? (
                    <img src={result.user.profile_picture} alt={result.user.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCheck className="w-8 h-8 text-slate-300" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm truncate">{result.user.full_name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-blue-100 text-blue-800 shrink-0">
                      {result.role}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-blue-800 font-bold">
                    {result.user.student_id || result.user.employee_id || result.user.email}
                  </p>

                  {result.user.class && (
                    <p className="text-[11px] text-slate-500 font-medium">
                      Class: <strong>{result.user.class}</strong> {result.user.section ? `(${result.user.section})` : ''}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs space-y-1.5 pt-3 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Status:</span>
                  <span className="font-black text-blue-700 uppercase">{result.user.status}</span>
                </div>
                {result.user.emergency_contact && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Emergency Contact:</span>
                    <span className="font-bold text-slate-700">{result.user.emergency_contact}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">QR Identifier:</span>
                  <span className="font-mono text-slate-600 font-bold">{result.user.qr_code_identifier || 'VERIFIED'}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setIdCardTarget({ role: result.role, id: result.user.id })}
                  className="flex-1 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  <span>Generate ID Card</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ID Card Modal If Triggered */}
      {idCardTarget && (
        <IdCardModal
          isOpen={true}
          onClose={() => setIdCardTarget(null)}
          userRole={idCardTarget.role}
          userId={idCardTarget.id}
        />
      )}
    </>
  );
}
