import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { resetPassword } from "../../services/authService";

// ── Shared pieces ─────────────────────────────────────────────────────────────
const Shapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
    <div className="absolute top-1/3 -right-10 w-36 h-36 rounded-full bg-yellow-400/10" />
    <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-white/5" />
    <div className="absolute bottom-28 right-12 w-16 h-16 rounded-full bg-yellow-400/20" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="rp-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rp-grid)" />
    </svg>
  </div>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

// ── Password strength ─────────────────────────────────────────────────────────
const getStrength = (pw) => {
  if (!pw) return null;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return [
    { label: "Too weak",    color: "bg-red-400"    },
    { label: "Weak",        color: "bg-orange-400"  },
    { label: "Fair",        color: "bg-yellow-400"  },
    { label: "Strong",      color: "bg-blue-500"    },
    { label: "Very strong", color: "bg-green-500"   },
  ][s] && { score: s, ...([{label:"Too weak",color:"bg-red-400"},{label:"Weak",color:"bg-orange-400"},{label:"Fair",color:"bg-yellow-400"},{label:"Strong",color:"bg-blue-500"},{label:"Very strong",color:"bg-green-500"}][s]) };
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // The reset link from the email will contain ?token=xxx&email=yyy
  const tokenFromUrl = searchParams.get("token") || "";
  const emailFromUrl = searchParams.get("email") || "";

  const [password, setPassword]               = useState("");
  const [password_confirmation, setConfirm]   = useState("");
  const [showPw, setShowPw]                   = useState(false);
  const [showCpw, setShowCpw]                 = useState(false);
  const [fieldErrors, setFieldErrors]         = useState({});
  const [globalError, setGlobalError]         = useState("");
  const [loading, setLoading]                 = useState(false);
  const [success, setSuccess]                 = useState(false);

  // Guard: if no token in URL, the link is invalid
  const invalidLink = !tokenFromUrl || !emailFromUrl;

  const validate = () => {
    const e = {};
    if (password.length < 8)          e.password = "Password must be at least 8 characters";
    if (password !== password_confirmation) e.password_confirmation = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setFieldErrors({});
    setGlobalError("");
    setLoading(true);

    try {
      await resetPassword({
        token: tokenFromUrl,
        email: emailFromUrl,
        password,
        password_confirmation,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      if (err.status === 422 && err.errors) {
        const mapped = {};
        Object.entries(err.errors).forEach(([key, msgs]) => {
          mapped[key] = Array.isArray(msgs) ? msgs[0] : msgs;
        });
        setFieldErrors(mapped);
      } else {
        // 403 = token expired or invalid
        setGlobalError(err.message || "Something went wrong. Please request a new reset link.");
      }
    } finally {
      setLoading(false);
    }
  };

  const st = getStrength(password);

  const requirements = [
    { label: "8+ characters",     met: password.length >= 8             },
    { label: "Uppercase letter",  met: /[A-Z]/.test(password)           },
    { label: "Number",            met: /[0-9]/.test(password)           },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password)   },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-300/60 flex flex-col md:flex-row overflow-hidden"
      >

        {/* ── LEFT ─────────────────────────────────────────────────────────── */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col justify-between p-8 md:p-10 overflow-hidden min-h-[260px] md:min-h-[660px]">
          <Shapes />

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img src={logo} alt="GHRA Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-white/90 text-sm tracking-wide">GHRA School</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="relative z-10 my-6 md:my-0">
            <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Final step</p>
            <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create a
            </h1>
            <h1 className="text-3xl md:text-[2.6rem] font-black text-yellow-400 leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              New Password.
            </h1>
            <p className="mt-5 text-blue-200/80 text-sm leading-relaxed max-w-[260px]">
              Choose a strong password you haven't used before. You'll use it next time you sign in.
            </p>

            {/* Password tips */}
            <div className="mt-8 space-y-2">
              {requirements.map(({ label, met }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                    ${met ? "bg-green-400/30 border border-green-400" : "bg-white/10 border border-white/20"}`}>
                    {met && (
                      <svg className="w-2.5 h-2.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs transition-colors ${met ? "text-green-300" : "text-blue-200/60"}`}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-yellow-300 mb-2">🔒 Security tips</p>
            <ul className="space-y-1 text-xs text-blue-100/90">
              <li>• Never share your password with anyone</li>
              <li>• Use a unique password for each account</li>
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

              {/* Invalid / expired link */}
              {invalidLink ? (
                <motion.div key="invalid"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Invalid reset link
                  </h2>
                  <p className="text-sm text-slate-400 mb-7 leading-relaxed">
                    This link is missing required information or has expired. Please request a new one.
                  </p>
                  <Link to="/forgot-password"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 flex items-center justify-center">
                    Request a new link
                  </Link>
                  <p className="text-center text-sm text-slate-500 mt-5">
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to login</Link>
                  </p>
                </motion.div>

              ) : success ? (

                /* Success state */
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-slate-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Password reset!
                  </h2>
                  <p className="text-sm text-slate-400 mb-1">Your password has been updated successfully.</p>
                  <p className="text-sm text-slate-400">Redirecting you to login…</p>
                </motion.div>

              ) : (

                /* Form */
                <motion.div key="form"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}>

                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Set new password
                  </h2>
                  <p className="text-sm text-slate-400 mb-1">
                    Resetting for <span className="text-blue-600 font-semibold">{emailFromUrl}</span>
                  </p>
                  <p className="text-sm text-slate-400 mb-7">Must be different from your previous password</p>

                  {/* Global error */}
                  <AnimatePresence>
                    {globalError && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-4 overflow-hidden">
                        <p className="text-xs text-red-500 font-medium">{globalError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">

                    {/* New password */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPw ? "text" : "password"}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: "" })); }}
                          placeholder="••••••••"
                          className={`w-full pl-4 pr-11 py-3 bg-white border rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all
                            ${fieldErrors.password ? "border-red-300 focus:ring-red-400/30 focus:border-red-400"
                                                   : "border-slate-200 focus:ring-blue-500/30 focus:border-blue-400"}`}
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          <EyeIcon open={showPw} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {fieldErrors.password && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-red-500 font-bold mt-1.5 px-1">{fieldErrors.password}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Strength bar */}
                    {password && st && (
                      <div className="-mt-1">
                        <div className="flex gap-1 mb-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < st.score ? st.color : "bg-slate-200"}`} />
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">{st.label}</p>
                      </div>
                    )}

                    {/* Confirm password */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCpw ? "text" : "password"}
                          value={password_confirmation}
                          onChange={(e) => { setConfirm(e.target.value); setFieldErrors((p) => ({ ...p, password_confirmation: "" })); }}
                          placeholder="••••••••"
                          className={`w-full pl-4 pr-11 py-3 bg-white border rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all
                            ${fieldErrors.password_confirmation ? "border-red-300 focus:ring-red-400/30 focus:border-red-400"
                                                                : "border-slate-200 focus:ring-blue-500/30 focus:border-blue-400"}`}
                        />
                        <button type="button" onClick={() => setShowCpw(!showCpw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                          <EyeIcon open={showCpw} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {fieldErrors.password_confirmation && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-red-500 font-bold mt-1.5 px-1">{fieldErrors.password_confirmation}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(37,99,235,0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Resetting…
                        </>
                      ) : "Reset Password"}
                    </motion.button>
                  </form>

                  <p className="text-center text-sm text-slate-500 mt-6">
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to login</Link>
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
