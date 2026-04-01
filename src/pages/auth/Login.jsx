import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

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

const MOCK_USERS = {
  student: { email: "student@school.com", password: "student123" },
  teacher: { email: "teacher@school.com", password: "teacher123" },
};

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const mock = MOCK_USERS[role];
    if (email === mock.email && password === mock.password) {
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");
      navigate(role === "teacher" ? "/teacher" : "/student");
    } else {
      setError("Invalid credentials. Use the test credentials shown.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-300/60 flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col justify-between p-8 md:p-10 overflow-hidden min-h-[280px] md:min-h-[680px]">
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

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-yellow-300 mb-2">🧪 Test Credentials</p>
            <div className="space-y-1 text-xs text-blue-100/90">
              <p><span className="text-white font-semibold">Student —</span> student@school.com · student123</p>
              <p><span className="text-white font-semibold">Teacher —</span> teacher@school.com · teacher123</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
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
                <button key={r} onClick={() => { setRole(r); setError(""); }}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-semibold capitalize rounded-xl transition-colors
                    ${role === r ? "text-blue-700" : "text-slate-500 hover:text-slate-700"}`}>
                  {r}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={role} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {role === "teacher" ? "Teacher Sign In" : "Student Sign In"}
                </h2>
                <p className="text-sm text-slate-400 mb-7">
                  Enter your credentials to access your {role} portal
                </p>
              </motion.div>
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                  Email / School ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={MOCK_USERS[role].email}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 overflow-hidden">
                    <p className="text-xs text-red-500">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-xs text-blue-500 hover:text-blue-700 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>

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

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Or continue with</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="flex gap-3">
              {[{ label: "Google", letter: "G", color: "text-red-500" }, { label: "Microsoft", letter: "M", color: "text-blue-500" }].map(({ label, letter, color }) => (
                <motion.button key={label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <span className={`font-black text-base ${color}`}>{letter}</span>
                  {label}
                </motion.button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mt-7">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}