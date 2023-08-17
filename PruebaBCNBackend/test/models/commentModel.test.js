const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Comment = require('../../models/commentModel');

describe('Comment Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reinicia la base de datos antes de las pruebas
  });

  it('should create a comment', async () => {
    const comment = await Comment.create({
      comment: 'Test Comment',
      userId: 1,
      flightId: 1,
      tags: ['tag1', 'tag2'],
    });

    expect(comment.comment).toBe('Test Comment');
    expect(comment.userId).toBe(1);
    expect(comment.flightId).toBe(1);
    expect(comment.tags).toEqual(['tag1', 'tag2']);
  });

  
});
