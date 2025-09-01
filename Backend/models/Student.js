const mongoose = require('mongoose');
const crypto = require('crypto');

const studentSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID()
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate a new UUID if one doesn't exist
studentSchema.pre('save', function(next) {
  if (!this.uuid) {
    this.uuid = crypto.randomUUID();
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema); 