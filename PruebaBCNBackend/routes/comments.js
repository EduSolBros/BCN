// routes/comments.js
const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:flightId', commentController.getCommentsByFlightId);

module.exports = router;