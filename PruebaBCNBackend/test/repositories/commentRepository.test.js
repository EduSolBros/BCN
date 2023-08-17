const sequelize = require('../../db/database');
const CommentRepository = require('../../repositories/commentRepository');

describe('CommentRepository', () => {
  let commentRepository;

  beforeAll(() => {
    commentRepository = new CommentRepository(sequelize);
  });

  it('should create a comment', async () => {
    const commentData = {
      comment: 'Test Comment',
      userId: 1,
      flightId: 1,
      tags: ['tag1', 'tag2'],
    };

    const newComment = await commentRepository.create(commentData);

    expect(newComment.comment).toBe('Test Comment');
    expect(newComment.userId).toBe(1);
    expect(newComment.flightId).toBe(1);
    expect(newComment.tags).toEqual(['tag1', 'tag2']);
  });

  
});
