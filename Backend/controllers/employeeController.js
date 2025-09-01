const Employee = require('../models/Employee');

// @desc    Add a new employee
// @route   POST /api/v1/employees
// @access  Public
const addEmployee = async (req, res, next) => {
  try {
    const employeeData = {
      ...req.body,
      studentUUID: req.studentUUID
    };
    
    const employee = await Employee.create(employeeData);
    
    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employees for a student UUID
// @route   GET /api/v1/employees
// @access  Public
const getEmployeesByStudentUUID = async (req, res, next) => {
  try {
    const employees = await Employee.find({ studentUUID: req.studentUUID }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID (only if it belongs to the student UUID)
// @route   GET /api/v1/employees/:id
// @access  Public
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const employee = await Employee.findOne({ _id: id, studentUUID: req.studentUUID });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found or does not belong to this student'
      });
    }
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee details (student UUID should not be updated)
// @route   PUT /api/v1/employees/:id
// @access  Public
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Remove studentUUID from request body to prevent updating it
    const { studentUUID: _, ...updateData } = req.body;
    
    const employee = await Employee.findOneAndUpdate(
      { _id: id, studentUUID: req.studentUUID },
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found or does not belong to this student'
      });
    }
    
    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an employee (only if it belongs to the student UUID)
// @route   DELETE /api/v1/employees/:id
// @access  Public
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const employee = await Employee.findOneAndDelete({ _id: id, studentUUID: req.studentUUID });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found or does not belong to this student'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployee,
  getEmployeesByStudentUUID,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
}; 