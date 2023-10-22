jest.mock('../middleware/middleware', () => {
  return (req, res, next) => next();
});

const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

describe('Todo API', () => {


  const getTestToken = () => {
    return 'Bearer YOUR_JWT_TOKEN'; 
  };

  test('should fetch all todos successfully', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', getTestToken());

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('todos');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
