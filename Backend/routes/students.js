const express = require('express');
const {
  registerStudent,
  loginStudent,
  getStudentProfile
} = require('../controllers/studentController');
const validateStudentUUID = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected routes (authentication required)
router.get('/profile', validateStudentUUID, getStudentProfile);

module.exports = router; 