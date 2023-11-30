const router = require('express').Router();
const { Comment } = require('../models');

// Add a comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
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
