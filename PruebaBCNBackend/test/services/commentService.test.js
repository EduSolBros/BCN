const CommentService = require('../../services/commentServices');

describe('CommentService', () => {
  let commentService;
  let mockCommentRepository;

  beforeAll(() => {
    mockCommentRepository = {
        create: jest.fn(),
        findByUserAndFlight: jest.fn(),
      };
  
      commentService = new CommentService(mockCommentRepository);
  });

  it('should create a comment', async () => {
    const commentData = {
      comment: 'Test Comment',
      userId: 1,
      flightId: 1,
      tags: ['tag1', 'tag2'],
    };

    const mockNewComment = { ...commentData, id: 1 };
    mockCommentRepository.create.mockResolvedValue(mockNewComment);

    const newComment = await commentService.createComment(commentData);

    expect(newComment).toEqual(mockNewComment);
  });

  it('should get comment by user and flight', async () => {
    const userId = 1;
    const flightId = 1;

    const mockComment = {
      id: 1,
      comment: 'Test Comment',
      userId,
      flightId,
    };

    mockCommentRepository.findByUserAndFlight.mockResolvedValue(mockComment);

    const comment = await commentService.getCommentByUserAndFlight(userId, flightId);

    expect(comment).toEqual(mockComment);
  });

  it('should return null when comment by user and flight is not found', async () => {
    const userId = 1;
    const flightId = 1;

    mockCommentRepository.findByUserAndFlight.mockResolvedValue(null);

    const comment = await commentService.getCommentByUserAndFlight(userId, flightId);

    expect(comment).toBeNull();
  });
});
