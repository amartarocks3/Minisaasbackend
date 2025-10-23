const express = require('express');
const mongoose = require('mongoose');
const leadsRouter = require('./routes/leads');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  app.use('/api/leads', leadsRouter);  // Use leads routes with '/api/leads' prefix

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
