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

const Shapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
    <div className="absolute top-1/3 -right-10 w-36 h-36 rounded-full bg-yellow-400/10" />
    <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-white/5" />
    <div className="absolute bottom-28 right-12 w-16 h-16 rounded-full bg-yellow-400/20" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="signup-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#signup-grid)" />
    </svg>
  </div>
);

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    
    // Simulate signup success
    localStorage.setItem("role", role);
    localStorage.setItem("isAuthenticated", "true");
    navigate(role === "teacher" ? "/teacher" : "/student");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-slate-300/60 flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT PANEL - Information */}
        <div className="relative w-full md:w-5/12 bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-800 text-white flex flex-col justify-between p-8 md:p-12 overflow-hidden min-h-[280px] md:min-h-[720px]">
          <Shapes />

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden p-1.5">
              <img src={logo} alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-white/95 text-sm tracking-widest ">GHRA School</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="relative z-10 my-8 md:my-0">
            <p className="text-blue-200 text-[10px] font-black tracking-[0.3em] uppercase mb-4 opacity-80 italic">Join our community</p>
            <h1 className="text-4xl md:text-[3.5rem] font-black leading-[1] mb-2 font-serif italic tracking-tighter">
              Shaping Young Minds.<br />
              <span className="text-yellow-400">Building Future Leaders.</span>
            </h1>
            <p className="mt-6 text-blue-100/70 text-sm leading-relaxed max-w-[300px] font-medium">
              Create your account to access your personalized educational portal and connect with teachers and peers.
            </p>

            <div className="mt-12 space-y-6">
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all border border-white/5">
                     <span className="text-yellow-400 text-lg font-black italic">1</span>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Access Tools</p>
                    <p className="text-[11px] text-blue-200 opacity-60">Homework, Grades & More</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group border-t border-white/5 pt-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all border border-white/5">
                     <span className="text-yellow-400 text-lg font-black italic">2</span>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Stay Updated</p>
                    <p className="text-[11px] text-blue-200 opacity-60">Real-time Announcements</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="relative z-10 flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-indigo-600 shadow-sm" alt="student" />
                ))}
             </div>
             <p className="text-[10px] font-bold text-blue-100 italic">Joining 2,400+ students & teachers</p>
          </div>
        </div>

        {/* RIGHT PANEL - Signup Form */}
        <div className="w-full md:w-7/12 bg-white flex items-center justify-center p-6 sm:p-10 md:p-14">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-[480px]"
          >
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                Create Account
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Fill in the details below to set up your {role} access
              </p>
            </div>

            {/* Role selection tabs */}
            <div className="relative flex bg-slate-100 rounded-2xl p-1.5 mb-8 shadow-inner">
              <motion.div
                className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm border border-slate-200"
                animate={{ left: role === "student" ? "6px" : "calc(50% + 2px)" }}
                transition={{ type: "spring", stiffness: 450, damping: 40 }}
              />
              {["student", "teacher"].map((r) => (
                <button key={r} onClick={() => { setRole(r); setError(""); }}
                  className={`relative z-10 flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all
                    ${role === r ? "text-blue-700" : "text-slate-400 hover:text-slate-600"}`}>
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    {role === 'student' ? 'Student ID' : 'Employee ID'}
                  </label>
                  <input
                    name="studentId"
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={handleInputChange}
                    placeholder="E.g. SCH-4092"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@school.com"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 bottom-3.5 text-slate-400 hover:text-slate-600">
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 px-1">
                 <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                 <p className="text-[11px] text-slate-500 font-medium leading-normal">
                   I agree to the <span className="text-blue-600 font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-blue-600 font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                 </p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-l-4 border-red-500 rounded-xl px-4 py-3 overflow-hidden">
                    <p className="text-xs text-red-600 font-bold">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ y: -1, boxShadow: "0 10px 40px -10px rgba(37,99,235,0.4)" }}
                whileTap={{ y: 0, scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-[20px] font-black tracking-widest text-[11px] uppercase transition-all shadow-xl shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-2 mt-4 italic"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating Account...
                  </>
                ) : "Complete Registration"}
              </motion.button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Or register with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black tracking-widest uppercase text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" />
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black tracking-widest uppercase text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <img src="https://www.svgrepo.com/show/512513/microsoft.svg" className="w-4 h-4" alt="microsoft" />
                Microsoft
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-10 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-black hover:underline underline-offset-4 decoration-2 decoration-blue-500/20">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
