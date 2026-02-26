import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  }
);

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    
    // College-specific fields
    department: { 
      type: String, 
      enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE', 'Chemical', 'Biotechnology', 'Other'],
      required: true,
      default: 'Other'
    },
    semester: { 
      type: Number, 
      min: 1, 
      max: 8,
      required: true,
      default: 1
    },
    
    // Exam preparation
    isImportantForExam: { type: Boolean, default: false },
    examTags: [{ type: String, enum: ['midterm', 'final', 'quick-revision', 'important'] }],
    
    // Syllabus mapping
    syllabusTopics: [String],
    syllabusUnit: { type: Number, min: 1, max: 10 },
    
    category: { type: String, default: 'General', trim: true },
    tags: [{ type: String, trim: true }],
    fileURL: { type: String, required: true },
    fileSize: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [commentSchema],
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    
    // Offline availability
    isOfflineAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Calculate average rating
noteSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
};

// Indexes for better query performance
noteSchema.index({ department: 1, semester: 1 });
noteSchema.index({ subject: 1 });
noteSchema.index({ isImportantForExam: 1 });
noteSchema.index({ uploadedBy: 1 });

export default mongoose.model('Note', noteSchema);
