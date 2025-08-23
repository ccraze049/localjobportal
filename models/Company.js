
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  district: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  whatsapp: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  openings: {
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', companySchema);
