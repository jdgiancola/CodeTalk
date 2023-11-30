const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const commentRoutes = require('./api/commentRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/signup', userRoutes); // Add this line for the /signup route
router.use('/', homeRoutes);

module.exports = router;
