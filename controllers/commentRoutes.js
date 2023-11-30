const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// Add a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId  // Ensure this matches the session property name
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);  // Changed to 400 to indicate client-side error
  }
});

// Get comments for a post
router.get('/post/:id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.id
      }
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
