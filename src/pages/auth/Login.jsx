import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";

// ── Icons ─────────────────────────────────────────────────────────────────────
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

// ── Background shapes ─────────────────────────────────────────────────────────
const Shapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
    <div className="absolute top-1/3 -right-10 w-36 h-36 rounded-full bg-yellow-400/10" />
    <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-white/5" />
    <div className="absolute bottom-28 right-12 w-16 h-16 rounded-full bg-yellow-400/20" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lgrid)" />
    </svg>
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function Login() {
  const { login: loginUserToContext } = useAuth();
  const navigate = useNavigate();
  const [role, setRole]                 = useState("student");
  const [login, setLogin]               = useState(""); // email or student_id / employee_id
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);

  const handleRoleSwitch = (r) => {
    setRole(r);
    setLogin("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // API expects: { login, password, role }
      // `login` accepts email OR student_id / employee_id — the server normalises it
      const data = await loginUser({ login, password, role });

      // Persist token + user info
      loginUserToContext(data);

      // Use the role from the server response as the source of truth
      // console.log("login data", data);
      navigate(data.user.role === "teacher" ? "/teacher" : "/student");

    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        setError("Invalid credentials. Please check your login and password.");
      } else if (err.status === 422 && err.errors) {
        const first = Object.values(err.errors).flat()[0];
        setError(first || "Please check your input and try again.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-300/60 flex flex-col md:flex-row overflow-hidden"
      >

        {/* ── LEFT ────────────────────────────────────────────────────────── */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col justify-between p-8 md:p-10 overflow-hidden min-h-[280px] md:min-h-[680px]">
          <Shapes />

          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/" className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src={logo} alt="GHRA Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-white/90 text-sm tracking-wide">GHRA School</span>
            </Link>
          </motion.div>

          {/* Hero copy */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="relative z-10 my-6 md:my-0">
            <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Welcome back</p>
            <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Shaping<br />Young Minds.
            </h1>
            <h1 className="text-3xl md:text-[2.6rem] font-black text-yellow-400 leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Building<br />Future Leaders.
            </h1>
            <p className="mt-5 text-blue-200/80 text-sm leading-relaxed max-w-[260px]">
              Access your personalized learning space and stay connected with your school community.
            </p>
          </motion.div>

          {/* Login hint — replaces old mock credentials box */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-yellow-300 mb-2">💡 Login options</p>
            <div className="space-y-1 text-xs text-blue-100/90">
              <p><span className="text-white font-semibold">Students —</span> use your email or Student ID</p>
              <p><span className="text-white font-semibold">Teachers —</span> use your email or Employee ID</p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT ───────────────────────────────────────────────────────── */}
        <div className="w-full md:w-7/12 bg-slate-50 flex items-center justify-center p-6 sm:p-10 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-[400px]"
          >
            {/* Role toggle */}
            <div className="relative flex bg-slate-200 rounded-2xl p-1 mb-8">
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-2px)] bg-white rounded-xl shadow-sm"
                animate={{ left: role === "student" ? "4px" : "calc(50%)" }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
              {["student", "teacher"].map((r) => (
                <button key={r} type="button" onClick={() => handleRoleSwitch(r)}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-semibold capitalize rounded-xl transition-colors
                    ${role === r ? "text-blue-700" : "text-slate-500 hover:text-slate-700"}`}>
                  {r}
                </button>
              ))}
            </div>

            {/* Heading animates on role switch */}
            <AnimatePresence mode="wait">
              <motion.div key={role}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {role === "teacher" ? "Teacher Sign In" : "Student Sign In"}
                </h2>
                <p className="text-sm text-slate-400 mb-7">
                  Enter your credentials to access your {role} portal
                </p>
              </motion.div>
            </AnimatePresence>

            <form onSubmit={handleLogin} noValidate className="space-y-4">

              {/* Login — email or role-specific ID */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                  {role === "student" ? "Email / Student ID" : "Email / Employee ID"}
                </label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => { setLogin(e.target.value); setError(""); }}
                  placeholder={role === "student" ? "email or SCH-4092" : "email or TCH-1023"}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 overflow-hidden">
                    <p className="text-xs text-red-500 font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot password */}
              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-xs text-blue-500 hover:text-blue-700 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(37,99,235,0.35)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </>
                ) : `Continue as ${role === "teacher" ? "Teacher" : "Student"}`}
              </motion.button>
            </form>

            {/* Social login */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Or continue with</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="flex gap-3">
              {[
                { label: "Google",    letter: "G", color: "text-red-500"  },
                { label: "Microsoft", letter: "M", color: "text-blue-500" },
              ].map(({ label, letter, color }) => (
                <motion.button  onClick={() => alert('This is currently unavailable')} key={label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <span className={`font-black text-base ${color}`}>{letter}</span>
                  {label}
                </motion.button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mt-7">
              Registration is restricted to administrators.<br/>
              Please contact the front desk for account creation.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}