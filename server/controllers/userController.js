import User from '../models/User.js';
import Note from '../models/Note.js';

/**
 * GET /api/users/profile - Get current user profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * PUT /api/users/profile - Update user profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    
    await user.save();
    
    const updatedUser = await User.findById(user._id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * PUT /api/users/change-password - Change password
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }
    
    const user = await User.findById(req.user._id).select('+password');
    
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * POST /api/users/favorites/:noteId - Toggle favorite
 */
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const noteId = req.params.noteId;
    
    const index = user.favorites.indexOf(noteId);
    
    if (index > -1) {
      user.favorites.splice(index, 1);
      await user.save();
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      user.favorites.push(noteId);
      await user.save();
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * GET /api/users/favorites - Get user's favorite notes
 */
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favorites',
      populate: { path: 'uploadedBy', select: 'name email' }
    });
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
