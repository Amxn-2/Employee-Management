const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/students', require('./routes/students'));
app.use('/api/v1/employees', require('./routes/employees'));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Employee Management API is running',
    version: '1.0.0',
    endpoints: {
      'POST /api/v1/students/register': 'Register a new student',
      'POST /api/v1/students/login': 'Login student',
      'GET /api/v1/students/profile': 'Get student profile',
      'POST /api/v1/employees': 'Add a new employee',
      'GET /api/v1/employees': 'Get all employees for a student UUID',
      'GET /api/v1/employees/:id': 'Get single employee by ID',
      'PUT /api/v1/employees/:id': 'Update employee details',
      'DELETE /api/v1/employees/:id': 'Delete an employee'
    },
    authentication: {
      'Bearer Token': 'Required for protected routes (Authorization: Bearer <token>)',
      'X-Student-UUID': 'Alternative for backward compatibility'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 