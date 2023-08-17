

const CommentController = require('../../controllers/commentController');

describe('CommentController', () => {
  let commentController;

  beforeAll(() => {
    const mockCommentService = {
      createComment: jest.fn(),
      getCommentByUserAndFlight: jest.fn(),
    };

    commentController = new CommentController(mockCommentService);
  });

  it('should create a comment', async () => {
    const req = {
      body: {
        comment: 'Test Comment',
        userId: 1,
        flightId: 1,
        tags: ['tag1', 'tag2'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulamos que no existe ningún comentario previo para este usuario en este vuelo
    commentController.commentService.getCommentByUserAndFlight.mockResolvedValue(null);

    const mockNewComment = { ...req.body, id: 1 };
    commentController.commentService.createComment.mockResolvedValue(mockNewComment);

    await commentController.createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockNewComment);
  });

  it('should return 409 if user has already commented on the same flight', async () => {
    const req = {
      body: {
        comment: 'Test Comment',
        userId: 1,
        flightId: 1,
        tags: ['tag1', 'tag2'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulamos que ya existe un comentario previo para este usuario en este vuelo
    commentController.commentService.getCommentByUserAndFlight.mockResolvedValue({});

    await commentController.createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'The user has already commented on this flight.' });
  });

  // Agrega más pruebas según sea necesario
});