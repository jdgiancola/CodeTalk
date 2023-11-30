const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId  // Ensure this matches the session property name
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);  // Changed to 400 to indicate client-side error
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId  // Optionally add this to restrict deletion to the creator
      }
    });
    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
