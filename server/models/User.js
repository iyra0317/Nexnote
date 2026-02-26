import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minLength: 6, select: false },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    
    // College-specific fields
    department: { 
      type: String, 
      enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT', 'EEE', 'Chemical', 'Biotechnology', 'Other'],
    },
    semester: { type: Number, min: 1, max: 8 },
    rollNumber: { type: String, trim: true },
    
    // Verification
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verificationDate: { type: Date },
    
    bio: { type: String, default: '', maxLength: 500 },
    avatar: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    
    // Gamification
    points: { type: Number, default: 0 },
    badges: [{ type: String }],
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
