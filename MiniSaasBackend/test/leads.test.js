const request = require('supertest');
const express = require('express');
const leadsRouter = require('../routes/leads');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/api/leads', leadsRouter);

describe('Leads API', () => {
 let leadId;

beforeEach(async () => {
  const res = await request(app)
    .post('/api/leads')
    .send({ name: 'John Doe', email: 'john@example.com', message: 'Hi' });
  leadId = res.body._id;
});

it('should fetch all leads', async () => {
  const res = await request(app).get('/api/leads');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

it('should update a lead', async () => {
  const res = await request(app)
    .put(`/api/leads/${leadId}`)
    .send({ message: 'Updated message' });
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Updated message');
});

it('should delete a lead', async () => {
  const res = await request(app).delete(`/api/leads/${leadId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Lead deleted successfully');
});

});
