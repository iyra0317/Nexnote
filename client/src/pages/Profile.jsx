import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlinePencil, HiOutlineKey } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(
        `${API_URL}/users/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser(data);
      addToast('Profile updated successfully', 'success');
      setEditing(false);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to update profile', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/users/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToast('Password changed successfully', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setChangingPassword(false);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to change password', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">Profile Settings</h1>
        <p className="text-sm text-slate-400">Manage your account information and preferences</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-[#111827]/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-50">Profile Information</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <HiOutlinePencil className="text-cyan-300 text-lg" />
            </button>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 shadow-[0_0_30px_rgba(56,189,248,0.7)] flex items-center justify-center">
                <HiOutlineUser className="text-4xl text-slate-950" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editing}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Role
              </label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none opacity-60 capitalize"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!editing}
                rows={3}
                maxLength={500}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-60 resize-none"
                placeholder="Tell us about yourself..."
              />
              <p className="text-xs text-slate-500 text-right">{formData.bio.length}/500</p>
            </div>

            {editing && (
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] hover:from-cyan-400 hover:to-sky-400 transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-[#111827]/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-50">Change Password</h2>
            <HiOutlineKey className="text-cyan-300 text-xl" />
          </div>

          {!changingPassword ? (
            <button
              onClick={() => setChangingPassword(true)}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] hover:from-cyan-400 hover:to-sky-400 transition-all"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] hover:from-cyan-400 hover:to-sky-400 transition-all"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
