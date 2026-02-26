import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineArrowDownTray,
  HiOutlineTrash,
  HiOutlineCalendarDays,
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatBubbleLeft,
  HiOutlineEye,
  HiOutlineArrowDownCircle,
} from 'react-icons/hi2';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function NoteCard({ note, onDelete, onUpdate }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [localNote, setLocalNote] = useState(note);

  const canDelete = user?.role === 'admin' || user?.role === 'teacher';

  const handleDownload = async () => {
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

  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/users/favorites/${note._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorite(data.isFavorite);
      addToast(data.isFavorite ? 'Added to favorites' : 'Removed from favorites', 'success');
    } catch (error) {
      addToast('Failed to update favorites', 'error');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/notes/${note._id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalNote(data);
      setNewComment('');
      addToast('Comment added', 'success');
      if (onUpdate) onUpdate(data);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to add comment', 'error');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/notes/${note._id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedComments = localNote.comments.filter(c => c._id !== commentId);
      setLocalNote({ ...localNote, comments: updatedComments });
      addToast('Comment deleted', 'success');
    } catch (error) {
      addToast('Failed to delete comment', 'error');
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/notes/${note._id}/ratings`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalNote({ ...localNote, averageRating: data.averageRating });
      addToast('Rating submitted', 'success');
    } catch (error) {
      addToast('Failed to submit rating', 'error');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, translateY: -4 }}
      className="group flex flex-col rounded-2xl border border-white/10 bg-[#111827]/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.35)] group-hover:bg-cyan-500/25">
          <HiOutlineDocumentText className="text-xl" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-50">{localNote.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{localNote.subject}</p>
          {localNote.category && (
            <span className="mt-1 inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/30">
              {localNote.category}
            </span>
          )}
        </div>
        <button
          onClick={handleToggleFavorite}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          {isFavorite ? (
            <HiHeart className="text-lg text-red-400 fill-red-400" />
          ) : (
            <HiOutlineHeart className="text-lg text-slate-400" />
          )}
        </button>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={localNote.averageRating || 0} onRate={handleRate} size="sm" />
      </div>

      {/* Stats */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
        {localNote.uploadedBy && (
          <span>
            By <span className="text-slate-300">{localNote.uploadedBy.name || localNote.uploadedBy.email}</span>
          </span>
        )}
        {localNote.createdAt && (
          <span className="inline-flex items-center gap-1">
            <HiOutlineCalendarDays className="text-xs" />
            {new Date(localNote.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Metrics */}
      <div className="mb-4 flex gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <HiOutlineEye className="text-sm" />
          {localNote.views || 0} views
        </span>
        <span className="inline-flex items-center gap-1">
          <HiOutlineArrowDownCircle className="text-sm" />
          {localNote.downloads || 0} downloads
        </span>
        <span className="inline-flex items-center gap-1">
          <HiOutlineChatBubbleLeft className="text-sm" />
          {localNote.comments?.length || 0} comments
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.55)] transition-all hover:from-cyan-400 hover:to-sky-400"
        >
          <HiOutlineArrowDownTray className="text-sm" />
          Download
        </button>
        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(note._id)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/20"
          >
            <HiOutlineTrash className="text-sm" />
          </button>
        )}
      </div>

      {/* Comments Toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors text-left"
      >
        {showComments ? 'Hide' : 'Show'} comments ({localNote.comments?.length || 0})
      </button>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-3 border-t border-white/10 pt-4"
          >
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 resize-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="w-full rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {localNote.comments?.map((comment) => (
                <div key={comment._id} className="rounded-lg bg-slate-950/60 p-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-300">
                        {comment.user?.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{comment.text}</p>
                    </div>
                    {(user?._id === comment.user?._id || user?.role === 'admin') && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
              {(!localNote.comments || localNote.comments.length === 0) && (
                <p className="text-xs text-slate-500 text-center py-4">No comments yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
