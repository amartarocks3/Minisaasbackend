const express = require('express');
const mongoose = require('mongoose');
const leadsRouter = require('./routes/leads');
const authRouter = require('./routes/auth');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // If you need to send cookies/auth headers
}));

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  app.use('/api/leads', leadsRouter);  // Use leads routes with '/api/leads' prefix
  app.use('/api/auth', authRouter);    // Use auth routes with '/api/auth' prefix

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
