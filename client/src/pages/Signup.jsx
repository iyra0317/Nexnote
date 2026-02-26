import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api';
import { useToast } from '../components/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const departments = ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE', 'Chemical', 'Biotechnology', 'Other'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { name, email, password, role };
      if (role === 'student' && department && semester) {
        userData.department = department;
        userData.semester = semester;
        userData.rollNumber = rollNumber;
      }
      const { data } = await authAPI.signup(userData.name, userData.email, userData.password, userData.role, userData.department, userData.semester, userData.rollNumber);
      login(data);
      addToast('Account created successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-8 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-500/15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl"
      >
        <div className="mb-6 space-y-4 text-center">
          <div className="flex justify-center">
            <img 
              src="/nexnote-logo.png" 
              alt="NEXNOTE Logo" 
              className="h-16 w-auto object-contain"
              onError={(e) => {
                // Fallback to text if image doesn't load
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-50">Create account</h1>
            <p className="text-xs text-slate-400">Register as a teacher on NEXNOTE</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  role === 'student'
                    ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-purple-300 border-2 border-purple-500/40'
                    : 'bg-slate-950/40 text-slate-400 border border-white/10 hover:bg-white/5'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  role === 'teacher'
                    ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-purple-300 border-2 border-purple-500/40'
                    : 'bg-slate-950/40 text-slate-400 border border-white/10 hover:bg-white/5'
                }`}
              >
                Teacher
              </button>
            </div>
          </div>
          
          {role === 'student' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  required={role === 'student'}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                    required={role === 'student'}
                  >
                    <option value="">Sem</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                    placeholder="e.g. 21CS001"
                  />
                </div>
              </div>
            </>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.55)] transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-300 hover:text-purple-200">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
