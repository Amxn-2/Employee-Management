const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new student
// @route   POST /api/v1/students/register
// @access  Public
const registerStudent = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { username }]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: 'Student with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const student = await Student.create({
      username,
      email,
      password: hashedPassword,
      fullName
    });

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, uuid: student.uuid },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const studentResponse = {
      _id: student._id,
      uuid: student.uuid,
      username: student.username,
      email: student.email,
      fullName: student.fullName,
      isActive: student.isActive,
      createdAt: student.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: studentResponse,
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login student
// @route   POST /api/v1/students/login
// @access  Public
const loginStudent = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find student by username or email
    const student = await Student.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if student is active
    if (!student.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, uuid: student.uuid },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const studentResponse = {
      _id: student._id,
      uuid: student.uuid,
      username: student.username,
      email: student.email,
      fullName: student.fullName,
      isActive: student.isActive,
      createdAt: student.createdAt
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: studentResponse,
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current student profile
// @route   GET /api/v1/students/profile
// @access  Private
const getStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.studentId).select('-password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile
}; 