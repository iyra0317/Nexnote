import Note from '../models/Note.js';

/**
 * POST /api/notes/:id/comments - Add comment
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    note.comments.push({
      user: req.user._id,
      text: text.trim(),
    });
    
    await note.save();
    
    const updatedNote = await Note.findById(req.params.id)
      .populate('comments.user', 'name email avatar')
      .populate('uploadedBy', 'name email');
    
    res.status(201).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * DELETE /api/notes/:id/comments/:commentId - Delete comment
 */
export const deleteComment = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    const comment = note.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    // Only comment owner or admin can delete
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    comment.deleteOne();
    await note.save();
    
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

/**
 * POST /api/notes/:id/ratings - Add or update rating
 */
export const addRating = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    // Check if user already rated
    const existingRating = note.ratings.find(
      r => r.user.toString() === req.user._id.toString()
    );
    
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      note.ratings.push({ user: req.user._id, rating });
    }
    
    note.calculateAverageRating();
    await note.save();
    
    res.json({ message: 'Rating added', averageRating: note.averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
