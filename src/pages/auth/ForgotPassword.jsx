import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { forgotPassword } from "../../services/authService";

const Shapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
    <div className="absolute top-1/3 -right-10 w-36 h-36 rounded-full bg-yellow-400/10" />
    <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-white/5" />
    <div className="absolute bottom-28 right-12 w-16 h-16 rounded-full bg-yellow-400/20" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fp-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fp-grid)" />
    </svg>
  </div>
);

const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }

    setError("");
    setLoading(true);
    try {
      await forgotPassword({ email });
      setSent(true);
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setError(Object.values(err.errors).flat()[0] || "Please check your input.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-300/60 flex flex-col md:flex-row overflow-hidden"
      >

        {/* ── LEFT ─────────────────────────────────────────────────────────── */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col justify-between p-8 md:p-10 overflow-hidden min-h-[260px] md:min-h-[620px]">
          <Shapes />

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img src={logo} alt="GHRA Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-white/90 text-sm tracking-wide">GHRA School</span>
          </motion.div>

          {/* Headline animates between states */}
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent-copy"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }} className="relative z-10 my-6 md:my-0">
                <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Next step</p>
                <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Check your
                </h1>
                <h1 className="text-3xl md:text-[2.6rem] font-black text-yellow-400 leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Email Inbox.
                </h1>
                <p className="mt-5 text-blue-200/80 text-sm leading-relaxed max-w-[260px]">
                  A reset link is on its way. Check your spam folder if you don't see it within a minute.
                </p>
              </motion.div>
            ) : (
              <motion.div key="default-copy"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }} className="relative z-10 my-6 md:my-0">
                <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Account recovery</p>
                <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Forgot your
                </h1>
                <h1 className="text-3xl md:text-[2.6rem] font-black text-yellow-400 leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Password?
                </h1>
                <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  No worries.
                </h1>
                <p className="mt-5 text-blue-200/80 text-sm leading-relaxed max-w-[260px]">
                  Enter your school email and we'll send a secure reset link straight to your inbox.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-yellow-300 mb-2">💡 Things to know</p>
            <ul className="space-y-1 text-xs text-blue-100/90">
              <li>• The reset link expires in 60 minutes</li>
              <li>• Check your spam or junk folder</li>
              <li>• Contact your admin if issues persist</li>
            </ul>
          </motion.div>
        </div>

        {/* ── RIGHT ────────────────────────────────────────────────────────── */}
        <div className="w-full md:w-7/12 bg-slate-50 flex items-center justify-center p-6 sm:p-10 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-[400px]"
          >
            <AnimatePresence mode="wait">

              {/* Sent state */}
              {sent ? (
                <motion.div key="sent"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}>

                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>

                  <h2 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Reset link sent!
                  </h2>
                  <p className="text-sm text-slate-400 mb-7 leading-relaxed">
                    If <span className="text-blue-600 font-semibold break-all">{email}</span> is linked to an account, you'll receive a reset link shortly.
                  </p>

                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-7 space-y-3">
                    {[
                      { n: "1", text: "Open your email inbox" },
                      { n: "2", text: "Click the reset link in the email" },
                      { n: "3", text: "Create your new password" },
                    ].map(({ n, text }) => (
                      <div key={n} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                          {n}
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{text}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 mb-5">
                    Didn't receive it?{" "}
                    <button onClick={() => { setSent(false); setEmail(""); }}
                      className="text-blue-600 font-bold hover:underline">
                      Try a different email
                    </button>
                  </p>

                  <Link to="/login" className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 font-semibold transition-colors">
                    <BackIcon /> Back to login
                  </Link>
                </motion.div>

              ) : (

                /* Form state */
                <motion.div key="form"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}>

                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Reset your password
                  </h2>
                  <p className="text-sm text-slate-400 mb-7">
                    Enter your school email and we'll send you a reset link
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email" value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder="your@school.com"
                        className={`w-full px-4 py-3 bg-white border rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all
                          ${error ? "border-red-300 focus:ring-red-400/30 focus:border-red-400"
                                  : "border-slate-200 focus:ring-blue-500/30 focus:border-blue-400"}`}
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 overflow-hidden">
                          <p className="text-xs text-red-500 font-medium">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(37,99,235,0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : "Send Reset Link"}
                    </motion.button>
                  </form>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">or</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <Link to="/login"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <BackIcon /> Back to login
                  </Link>

                  <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one</Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
