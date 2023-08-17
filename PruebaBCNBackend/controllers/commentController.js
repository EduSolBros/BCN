// controllers/commentController.js
const CommentService = require('../services/commentServices');

class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  createComment = async (req, res) => {
    try {
      const { comment, userId, flightId, tags } = req.body;

      if (!comment || !userId || !flightId) {
        return res.status(400).json({ error: 'Comment, userId, and flightId are mandatory fields.' });
      }
    
      // Verificar si el usuario ya ha comentado en este vuelo
      const existingComment = await this.commentService.getCommentByUserAndFlight(userId, flightId);

      if (existingComment) {
        return res.status(409).json({ error: 'The user has already commented on this flight.' });
      }

      const newComment = await this.commentService.createComment({
        comment,
        userId,
        flightId,
        tags,
      });

      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while creating the comment.' });
    }
  }

  getCommentsByFlightId = async (req, res) => {
    try {
      const { flightId } = req.params;

      const comments = await this.commentService.getCommentsByFlightId(flightId);

      return res.json(comments);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while retrieving comments.' });
    }
  }

  updateComment = async (req, res) =>{
    try {
      
      const { commentId } = req.params;
      const { comment, tags } = req.body;
      

      if (!comment || !commentId) {
        return res.status(400).json({ error: 'Comment and commentId are mandatory fields.' });
      }
      
      const updatedComment = await this.commentService.updateComment(commentId, {
        comment,
        tags,
      });

      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found.' });
      }

      return res.status(200).json(updatedComment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while updating the comment.' });
    }
  }
}

module.exports = CommentController;


