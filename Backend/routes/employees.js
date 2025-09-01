const express = require('express');
const {
  addEmployee,
  getEmployeesByStudentUUID,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const validateStudentUUID = require('../middleware/auth');

const router = express.Router();

// Apply Student UUID validation to all routes
router.use(validateStudentUUID);

// Add a new employee
router.post('/', addEmployee);

// Get all employees for a student UUID
router.get('/', getEmployeesByStudentUUID);

// Get single employee by ID (only if it belongs to the student UUID)
router.get('/:id', getEmployeeById);

// Update employee details (student UUID should not be updated)
router.put('/:id', updateEmployee);

// Delete an employee (only if it belongs to the student UUID)
router.delete('/:id', deleteEmployee);

module.exports = router; 