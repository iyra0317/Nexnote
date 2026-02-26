import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

/**
 * POST /api/auth/signup - Register new user
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, department, semester, rollNumber } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    
    const user = await User.create({ 
      name, 
      email, 
      password,
      role: role || 'student',
      department,
      semester,
      rollNumber
    });
    
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      semester: user.semester,
      rollNumber: user.rollNumber,
      isVerified: user.isVerified,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * POST /api/auth/login - User login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      semester: user.semester,
      rollNumber: user.rollNumber,
      isVerified: user.isVerified,
      bio: user.bio,
      avatar: user.avatar,
      points: user.points,
      badges: user.badges,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
