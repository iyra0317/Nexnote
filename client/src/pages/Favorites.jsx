import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineArrowDownTray,
  HiOutlineHeart,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
import { useToast } from '../components/Toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/users/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(data);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to load favorites', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/users/favorites/${noteId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(prev => prev.filter(note => note._id !== noteId));
      addToast('Removed from favorites', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to remove favorite', 'error');
    }
  };

  const handleDownload = async (note) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/notes/${note._id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = note.title;
      a.click();
      window.URL.revokeObjectURL(url);
      addToast('Download started', 'success');
    } catch (error) {
      addToast('Download failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">My Favorites</h1>
        <p className="text-sm text-slate-400">
          Your bookmarked notes for quick access
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full flex flex-col items-center justify-center py-12 space-y-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-slate-900/60 flex items-center justify-center">
              <HiOutlineHeart className="text-3xl text-slate-500" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-slate-300">No favorites yet</p>
              <p className="text-xs text-slate-500">
                Start bookmarking notes you want to save for later
              </p>
            </div>
            <button
              onClick={() => (window.location.href = '/notes')}
              className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] hover:from-cyan-400 hover:to-sky-400 transition-all"
            >
              Browse Notes
            </button>
          </motion.div>
        ) : (
          favorites.map((note, i) => (
            <motion.article
              key={note._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05, translateY: -4 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#111827]/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.35)] group-hover:bg-cyan-500/25">
                  <HiOutlineDocumentText className="text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-50">{note.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{note.subject}</p>
                </div>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                {note.uploadedBy && (
                  <span>
                    By{' '}
                    <span className="text-slate-300">
                      {note.uploadedBy.name || note.uploadedBy.email}
                    </span>
                  </span>
                )}
                {note.createdAt && (
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineCalendarDays className="text-xs" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(note)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] transition-all hover:from-cyan-400 hover:to-sky-400"
                >
                  <HiOutlineArrowDownTray className="text-sm" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFavorite(note._id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/20"
                >
                  <HiOutlineHeart className="text-sm" />
                  Remove
                </button>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
