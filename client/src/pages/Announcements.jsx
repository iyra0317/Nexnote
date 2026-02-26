import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMegaphone, HiXMark } from 'react-icons/hi2';
import { announcementAPI } from '../api/api';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState(0);
  const [priority, setPriority] = useState('normal');
  const { addToast } = useToast();
  const { user } = useAuth();

  const departments = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE', 'Chemical', 'Biotechnology'];
  const semesters = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const fetchAnnouncements = async () => {
    try {
      const { data } = await announcementAPI.getAll();
      setAnnouncements(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await announcementAPI.create({ title, content, department, semester, priority });
      addToast('Announcement created successfully', 'success');
      setTitle('');
      setContent('');
      setDepartment('All');
      setSemester(0);
      setPriority('normal');
      setShowCreateForm(false);
      fetchAnnouncements();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create announcement', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await announcementAPI.delete(id);
      setAnnouncements(prev => prev.filter(a => a._id !== id));
      addToast('Announcement deleted', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-300';
      case 'info':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300';
      default:
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Loading announcements...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">Announcements</h1>
          <p className="text-sm text-slate-400">
            Important updates and notices for students
          </p>
        </div>
        
        {(user?.role === 'teacher' || user?.role === 'admin') && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {showCreateForm ? 'Cancel' : '+ New Announcement'}
          </button>
        )}
      </motion.div>

      {showCreateForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreate}
          className="rounded-3xl border border-white/10 bg-[#111827]/80 p-6 shadow-xl backdrop-blur-xl space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
              placeholder="Announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 resize-none"
              placeholder="Announcement details..."
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(parseInt(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
              >
                <option value={0}>All Semesters</option>
                {semesters.slice(1).map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
              >
                <option value="info">Info</option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Create Announcement
          </button>
        </motion.form>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-slate-900/60 flex items-center justify-center">
              <HiOutlineMegaphone className="text-3xl text-slate-500" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-slate-300">No announcements yet</p>
              <p className="text-xs text-slate-500">Check back later for updates</p>
            </div>
          </motion.div>
        ) : (
          announcements.map((announcement, index) => (
            <motion.div
              key={announcement._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border bg-gradient-to-r p-6 shadow-lg ${getPriorityColor(announcement.priority)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <span className="px-2 py-0.5 rounded-lg bg-white/10 text-xs font-medium uppercase">
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs opacity-75">
                    <span>📚 {announcement.department}</span>
                    {announcement.semester > 0 && <span>📖 Semester {announcement.semester}</span>}
                    <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {(user?.role === 'teacher' || user?.role === 'admin') && (
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <HiXMark className="text-xl" />
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
