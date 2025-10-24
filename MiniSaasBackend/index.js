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
const allowedOrigins = ['https://minisaas.onrender.com', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
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
