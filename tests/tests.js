const request = require('supertest');
const app = require('../app'); // Replace with the actual path to your Express app

describe('Question API Tests', () => {
  let createdQuestionId;

  // Test the creation of a new question
  it('should create a new question', async () => {
    const response = await request(app)
      .post('/addquestion')
      .send({
        question_id: 100, // Replace with a unique question_id
        category: 'test_category',
        question_text: 'This is a test question?',
        options: [
          { option_id: 1, option_text: 'Option A' },
          { option_id: 2, option_text: 'Option B' },
          { option_id: 3, option_text: 'Option C' },
          { option_id: 4, option_text: 'Option D' },
        ],
        correct_option_id: 3,
      })
      .expect(201);

    createdQuestionId = response.body._id;
  });

  // Test getting a question by question_id
  it('should get a question by question_id', async () => {
    await request(app)
      .get(`/question/${createdQuestionId}`)
      .expect(200);
  });

  // Test updating a question by question_id
  it('should update a question by question_id', async () => {
    await request(app)
      .put(`/question/update/${createdQuestionId}`)
      .send({
        category: 'updated_category',
      })
      .expect(200);
  });

  // Test deleting a question by question_id
  it('should delete a question by question_id', async () => {
    await request(app)
      .delete(`/question/delete/${createdQuestionId}`)
      .expect(204);
  });

  // Add more tests as needed for other scenarios

  // Close the server if needed
  afterAll(() => {
    // Replace with code to close the server connection if needed
  });
});
