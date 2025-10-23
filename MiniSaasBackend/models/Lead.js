const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true },         // For example: 'new', 'contacted', 'converted'
  createdAt: { type: Date, default: Date.now },
  aiMessage: { type: String, default: null },        // Optional field
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
