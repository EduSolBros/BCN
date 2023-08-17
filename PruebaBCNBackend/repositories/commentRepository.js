const Comment = require('../models/commentModel');

class CommentRepository {
  constructor(database) {
    this.database = database;
  }

  findByUserAndFlight = async (userId, flightId) => {
    const comment = await Comment.findOne({
      where: { userId, flightId },
    });
    return comment;
  }

  create = async (commentData) => {
    const newComment = await Comment.create(commentData);
    return newComment;
  }

  findByFlightId = async (flightId) => {
    const comments = await Comment.findAll({
      where: { flightId },
    });
    return comments;
  }

  async getUniqueFlightIds() {
    const comments = await Comment.findAll({
      attributes: ['flightId'],
      group: ['flightId'],
    });

    const flightIds = comments.map(comment => comment.flightId);
    return flightIds;
  }
  async updateComment(commentId, updatedData) {
    const [rowsUpdated, updatedComments] = await Comment.update(updatedData, {
      where: { id: commentId },
      returning: true,
    });
    
    if (updatedComments.length === 0) {
      return null;
    }

    return updatedComments;
  }
}

module.exports = CommentRepository;