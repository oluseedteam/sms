import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, CreditCard, CheckCircle, AlertCircle, Loader2, X, ArrowDownRight, ArrowUpRight, History, DollarSign } from 'lucide-react';
import { getStudentFinance, initializePayment, verifyPayment, payFromWallet } from '../../../services/financeService';
import { useSearchParams } from 'react-router-dom';

const StudentFinancePage = () => {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [fundAmount, setFundAmount] = useState('');
  const [fundLoading, setFundLoading] = useState(false);
  const [payingFee, setPayingFee] = useState(null);
  const [activeTab, setActiveTab] = useState('fees');
  const [searchParams] = useSearchParams();

  const fetchFinance = async () => {
    try {
      const res = await getStudentFinance();
      setFinance(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFinance(); }, []);

  // Handle Flutterwave callback
  useEffect(() => {
    const status = searchParams.get('status');
    const txRef = searchParams.get('tx_ref');
    const transactionId = searchParams.get('transaction_id');

    if (status === 'successful' && txRef && transactionId) {
      const verify = async () => {
        try {
          await verifyPayment({ transaction_id: transactionId, tx_ref: txRef });
          setAlert({ type: 'success', message: 'Payment verified successfully!' });
          fetchFinance();
        } catch (err) {
          setAlert({ type: 'error', message: err.message || 'Payment verification failed' });
        }
      };
      verify();
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'cancelled') {
      setAlert({ type: 'error', message: 'Payment was cancelled.' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  const handleFundWallet = async () => {
    if (!fundAmount || parseFloat(fundAmount) < 100) {
      setAlert({ type: 'error', message: 'Minimum funding amount is ₦100' });
      return;
    }
    setFundLoading(true);
    try {
      const res = await initializePayment({ amount: parseFloat(fundAmount), type: 'funding' });
      if (res.payment_link) {
        window.location.href = res.payment_link;
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to initialize payment' });
    } finally {
      setFundLoading(false);
    }
  };

  const handlePayFee = async (fee) => {
    setPayingFee(fee.id);
    try {
      // Try wallet payment first
      if (finance?.wallet?.balance >= fee.amount) {
        await payFromWallet({ fee_structure_id: fee.id });
        setAlert({ type: 'success', message: 'Fee paid successfully from wallet!' });
        fetchFinance();
      } else {
        // Redirect to Flutterwave
        const res = await initializePayment({ amount: parseFloat(fee.amount), type: 'fee_payment', fee_structure_id: fee.id });
        if (res.payment_link) {
          window.location.href = res.payment_link;
        }
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Payment failed' });
    } finally {
      setPayingFee(null);
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const wallet = finance?.wallet;
  const fees = finance?.fees || [];
  const payments = finance?.payments || [];
  const paidFeeIds = finance?.paid_fee_ids || [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20">
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

      {/* Wallet Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-5 h-5 opacity-70" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">My Wallet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">
            ₦{parseFloat(wallet?.balance || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-xs opacity-60 mt-1 font-semibold">Available Balance</p>

          {/* Fund Wallet */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">₦</span>
              <input type="number" value={fundAmount} onChange={e => setFundAmount(e.target.value)}
                placeholder="Enter amount" min="100"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 text-sm font-bold" />
            </div>
            <button onClick={handleFundWallet} disabled={fundLoading}
              className="bg-white text-blue-900 px-6 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg whitespace-nowrap">
              {fundLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              {fundLoading ? 'Processing...' : 'Fund Wallet'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {[
          { id: 'fees', label: 'School Fees', icon: DollarSign },
          { id: 'history', label: 'Transaction History', icon: History },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="space-y-3">
          {fees.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">No fees available for your class.</p>
            </div>
          ) : (
            fees.map(fee => {
              const isPaid = paidFeeIds.includes(fee.id);
              return (
                <motion.div key={fee.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={`bg-white rounded-2xl p-5 border transition-all ${isPaid ? 'border-green-100' : 'border-gray-100 hover:shadow-md'}`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-black text-gray-800">{fee.class_name} {fee.department ? `- ${fee.department}` : ''}</h3>
                      <p className="text-xs text-gray-400 font-semibold mt-1">
                        {fee.term} {fee.academic_year ? `• ${fee.academic_year}` : ''}
                        {fee.description && ` • ${fee.description}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-blue-900">
                        ₦{parseFloat(fee.amount).toLocaleString('en-NG')}
                      </span>
                      {isPaid ? (
                        <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Paid
                        </span>
                      ) : (
                        <button onClick={() => handlePayFee(fee)} disabled={payingFee === fee.id}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm">
                          {payingFee === fee.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                          {payingFee === fee.id ? 'Paying...' : (wallet?.balance >= fee.amount ? 'Pay from Wallet' : 'Pay Online')}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {payments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">No transactions yet.</p>
            </div>
          ) : (
            payments.map(p => (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${p.type === 'funding' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    {p.type === 'funding' ? <ArrowDownRight className="w-5 h-5 text-green-500" /> : <ArrowUpRight className="w-5 h-5 text-blue-500" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800 capitalize">{p.type === 'funding' ? 'Wallet Funding' : 'Fee Payment'}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      {new Date(p.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-sm ${p.type === 'funding' ? 'text-green-600' : 'text-blue-900'}`}>
                    {p.type === 'funding' ? '+' : '-'}₦{parseFloat(p.amount).toLocaleString('en-NG')}
                  </p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${p.status === 'successful' ? 'bg-green-50 text-green-600' : p.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                    {p.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default StudentFinancePage;
