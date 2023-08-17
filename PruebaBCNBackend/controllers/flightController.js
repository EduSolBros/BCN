
const CommentService = require('../services/commentServices');

class FlightController {
    constructor(commentService) {
      this.commentService = commentService;
    }
  
    getFlightsByCommentFlightIds = async (req, res) => {
      try {
        const flightIds = await this.commentService.getUniqueFlightIds();
        return res.status(200).json({ flightIds });
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching flights.' });
      }
    }
  }
  
  module.exports = FlightController;
    