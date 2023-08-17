class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  getCommentByUserAndFlight = async (userId, flightId) => {
    const comment = await this.commentRepository.findByUserAndFlight(userId, flightId);
    return comment;
  }

  createComment = async (commentData) => {
    const newComment = await this.commentRepository.create(commentData);
    return newComment;
  }

  getCommentsByFlightId = async (flightId) => {
    const comments = await this.commentRepository.findByFlightId(flightId);
    return comments;
  }

  async getUniqueFlightIds() {
    const flightIds = await this.commentRepository.getUniqueFlightIds();
    return flightIds;
  }

  async updateComment(commentId, updatedData) {
    console.log('UPDATE: ');
    console.log(commentId,updatedData);
    const updatedComment = await this.commentRepository.updateComment(commentId, updatedData);
    return updatedComment;
  }

}

module.exports = CommentService;


