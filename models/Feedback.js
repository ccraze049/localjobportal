
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: true,
    enum: ['good', 'bad']
  },
  type: {
    type: String,
    required: true,
    enum: ['company_deletion', 'company_search_not_found']
  },
  companyName: {
    type: String,
    default: null
  },
  district: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
