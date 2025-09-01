const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const validateStudentUUID = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.headers['x-student-uuid']) {
      // Fallback for backward compatibility
      const studentUUID = req.headers['x-student-uuid'];
      const student = await Student.findOne({ uuid: studentUUID });
      
      if (!student) {
        return res.status(401).json({
          success: false,
          error: 'Invalid Student UUID'
        });
      }
      
      req.studentId = student._id;
      req.studentUUID = student.uuid;
      return next();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get student from token
    const student = await Student.findById(decoded.studentId);
    if (!student) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token. Student not found.'
      });
    }

    // Check if student is active
    if (!student.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated.'
      });
    }

    // Add student info to request
    req.studentId = student._id;
    req.studentUUID = student.uuid;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired.'
      });
    }
    
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
};

module.exports = validateStudentUUID; 