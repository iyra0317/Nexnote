import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    department: { 
      type: String, 
      enum: ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE', 'Chemical', 'Biotechnology'],
      default: 'All'
    },
    semester: { type: Number, min: 0, max: 8, default: 0 }, // 0 means all semesters
    priority: {
      type: String,
      enum: ['urgent', 'normal', 'info'],
      default: 'normal'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index for efficient queries
announcementSchema.index({ department: 1, semester: 1, isActive: 1 });
announcementSchema.index({ isPinned: -1, createdAt: -1 });

export default mongoose.model('Announcement', announcementSchema);
