import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password, role, department, semester, rollNumber) => 
    api.post('/auth/signup', { name, email, password, role, department, semester, rollNumber }),
};

export const notesAPI = {
  getAll: (params) => api.get('/notes', { params }),
  upload: (formData) =>
    api.post('/notes', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/notes/${id}`),
  download: (id, fallbackName) =>
    api.get(`/notes/${id}/download`, { responseType: 'blob' }).then((res) => {
      const disposition = res.headers['content-disposition'];
      let filename = fallbackName || 'note';
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) filename = match[1];
      }
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }),
  addComment: (id, text) => api.post(`/notes/${id}/comments`, { text }),
  deleteComment: (noteId, commentId) => api.delete(`/notes/${noteId}/comments/${commentId}`),
  addRating: (id, rating) => api.post(`/notes/${id}/ratings`, { rating }),
  toggleFavorite: (id) => api.post(`/notes/${id}/favorite`),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getFavorites: () => api.get('/users/favorites'),
  getAnalytics: () => api.get('/users/analytics'),
};

export const announcementAPI = {
  getAll: (params) => api.get('/announcements', { params }),
  create: (data) => api.post('/announcements', data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default api;
