const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  studentUUID: {
    type: String,
    required: [true, 'Student UUID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  role: {
    type: String,
    default: 'Employee'
  },
  salary: {
    type: Number,
    default: 0,
    min: [0, 'Salary cannot be negative']
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

employeeSchema.index({ studentUUID: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('Employee', employeeSchema); 