import React, { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, School, QrCode, Phone, UserCheck, AlertCircle } from 'lucide-react';
import apiFetch from '../services/api';
import logo from '../assets/images/logo.png';

export default function IdCardModal({ isOpen, onClose, userRole, userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userRole && userId) {
      fetchIdCardData();
    }
  // The fetch function intentionally follows only identity/open-state changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userRole, userId]);

  const fetchIdCardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`/users/${userRole}/${userId}/id-card`);
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load ID card data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden print:shadow-none print:border-none print:max-w-none">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase">Official Identity Card</h3>
              <p className="text-[11px] text-slate-400">Print-ready official school identity credential</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={loading || error}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / ID Card Canvas */}
        <div className="p-6 flex flex-col items-center justify-center bg-slate-50 print:bg-white print:p-0">
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-bold">Generating Identity Card...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-rose-600 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto" />
              <p className="text-xs font-bold">{error}</p>
            </div>
          ) : data ? (
            <div className="id-card-element w-full max-w-sm bg-white rounded-2xl shadow-xl border-2 border-blue-900 overflow-hidden relative print:shadow-none print:border-2">
              
              {/* Header Gradient Stripe */}
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-4 text-center relative overflow-hidden">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shrink-0 shadow-sm">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-black tracking-tight uppercase leading-none">
                      {data.school.name || 'GHRA'}
                    </h2>
                    <p className="text-[9px] font-bold text-amber-300 tracking-widest uppercase mt-1">
                      {data.school.motto || 'SHAPING YOUNG MINDS, BUILDING FUTURE LEADERS'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 bg-amber-400 text-blue-950 font-black text-[9px] py-0.5 rounded-full uppercase tracking-widest text-center">
                  {data.user.role === 'student' ? 'Student Identity Card' : 
                   data.user.role === 'teacher' ? 'Faculty Identity Card' : 
                   data.user.role === 'admin' ? 'Executive Administration' : 'Staff Credential'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="flex gap-4 items-center">
                  {/* Photo Frame */}
                  <div className="w-24 h-28 rounded-xl bg-slate-100 border-2 border-blue-900/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {data.user.profile_picture ? (
                      <img src={data.user.profile_picture} alt={data.user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-300 flex flex-col items-center">
                        <UserCheck className="w-8 h-8 text-slate-400" />
                        <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-1.5 flex-1 min-w-0 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Full Name</span>
                      <span className="font-black text-slate-900 text-sm block truncate">{data.user.full_name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">
                        {data.user.role === 'student' ? 'Student ID' : 'Employee ID'}
                      </span>
                      <span className="font-mono font-black text-blue-900 text-xs block">{data.user.identifier}</span>
                    </div>
                    {data.user.class_name && (
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Class</span>
                        <span className="font-bold text-slate-800 text-xs block">{data.user.class_name} {data.user.section ? `(${data.user.section})` : ''}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Status</span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {data.user.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact & Safe QR Code Barcode Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[10px] space-y-0.5 flex-1">
                    <span className="font-bold text-slate-400 uppercase block text-[8px] tracking-wider">Emergency Contact</span>
                    <p className="font-bold text-slate-800 truncate">
                      {data.user.emergency_contact_name || 'School Front Desk'}
                    </p>
                    <p className="text-slate-500 font-mono text-[9px]">
                      {data.user.emergency_contact_phone || data.school.phone}
                    </p>
                  </div>

                  {/* QR Identifier Stamp */}
                  <div className="text-center p-1.5 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
                    <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center shadow-sm">
                      {/* Simple high-contrast SVG QR Representation */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                        <rect x="0" y="0" width="30" height="30" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" />

                        <rect x="70" y="0" width="30" height="30" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" />

                        <rect x="0" y="70" width="30" height="30" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" />

                        <rect x="40" y="20" width="10" height="20" />
                        <rect x="20" y="40" width="20" height="10" />
                        <rect x="50" y="50" width="15" height="15" />
                        <rect x="75" y="75" width="15" height="15" />
                        <rect x="40" y="75" width="10" height="10" />
                        <rect x="75" y="40" width="10" height="15" />
                      </svg>
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 font-bold block mt-0.5 truncate max-w-[60px]">
                      {data.user.qr_code_identifier?.slice(-8) || 'VERIFIED'}
                    </span>
                  </div>
                </div>

                {/* Footer Stamp */}
                <div className="bg-blue-50 rounded-xl p-2 text-center text-[8px] text-blue-900 font-medium">
                  This card is official property of GHRA. If found, please return to the school front desk or call {data.school.phone}.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
