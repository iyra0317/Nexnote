import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';

const router = express.Router();

// Public routes
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// Protected routes (teacher/admin only)
router.post('/', protect, authorize('teacher', 'admin'), createAnnouncement);
router.put('/:id', protect, authorize('teacher', 'admin'), updateAnnouncement);
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteAnnouncement);

export default router;
