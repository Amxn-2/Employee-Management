# Employee Management API

A REST API built with Node.js, Express, and MongoDB for managing employees with student authentication and UUID-based data separation.

## Features

- **Student Authentication System** - Registration, login, and JWT-based authentication
- **Automatic UUID Generation** - Each student gets a unique UUID upon registration
- **Employee CRUD Operations** - Full employee management with UUID-based isolation
- **Data Separation** - Students can only access their own employee data
- **Security Features** - Password hashing, JWT tokens, and input validation
- **MongoDB Integration** - Robust database with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `config.env` and update the MongoDB connection string
   - Add JWT_SECRET for enhanced security
   - Update other variables as needed

4. Start the server:
```bash
# Development mode (requires nodemon)
npm run dev

# Production mode
npm start
```

The server will start on port 5000 (or the port specified in your environment variables).

## Environment Variables

Create a `config.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
```

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Student Authentication

#### 1. Register Student
**POST** `/api/v1/students/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login Student
**POST** `/api/v1/students/login`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get Student Profile
**GET** `/api/v1/students/profile`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "isActive": true
  }
}
```

### Employee Management

#### 1. Add Employee
**POST** `/api/v1/employees`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "role": "Software Engineer",
  "salary": 75000,
  "status": "Active"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
    "studentUUID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Jane Smith",
    "email": "jane@company.com",
    "role": "Software Engineer",
    "salary": 75000,
    "dateOfJoining": "2024-01-01T00:00:00.000Z",
    "status": "Active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Get All Employees
**GET** `/api/v1/employees`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
      "studentUUID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Jane Smith",
      "email": "jane@company.com",
      "role": "Software Engineer",
      "salary": 75000,
      "dateOfJoining": "2024-01-01T00:00:00.000Z",
      "status": "Active"
    }
  ]
}
```

#### 3. Get Employee by ID
**GET** `/api/v1/employees/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
    "studentUUID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Jane Smith",
    "email": "jane@company.com",
    "role": "Software Engineer",
    "salary": 75000,
    "dateOfJoining": "2024-01-01T00:00:00.000Z",
    "status": "Active"
  }
}
```

#### 4. Update Employee
**PUT** `/api/v1/employees/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "salary": 80000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
    "studentUUID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Jane Smith Updated",
    "email": "jane@company.com",
    "role": "Software Engineer",
    "salary": 80000,
    "dateOfJoining": "2024-01-01T00:00:00.000Z",
    "status": "Active"
  }
}
```

#### 5. Delete Employee
**DELETE** `/api/v1/employees/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Employee deleted successfully"
}
```

## Data Models

### Student Schema
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| uuid | String | Yes | Auto-generated | Unique student identifier |
| username | String | Yes | - | Unique username (min 3 chars) |
| email | String | Yes | - | Unique email address |
| password | String | Yes | - | Hashed password (min 6 chars) |
| fullName | String | Yes | - | Student's full name |
| isActive | Boolean | No | true | Account status |

### Employee Schema
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| studentUUID | String | Yes | - | Student's UUID (indexed) |
| name | String | Yes | - | Employee name (trimmed) |
| email | String | Yes | - | Employee email (lowercase, trimmed) |
| role | String | No | "Employee" | Employee role |
| salary | Number | No | 0 | Employee salary (minimum: 0) |
| dateOfJoining | Date | No | Current date | Date when employee joined |
| status | String | No | "Active" | Status: "Active" or "Inactive" |

## Authentication & Security

### JWT Tokens
- Tokens are generated upon successful login/registration
- Tokens expire after 7 days
- All protected routes require valid JWT tokens

### Password Security
- Passwords are hashed using bcryptjs
- Salt rounds: 10
- Minimum password length: 6 characters

### Data Isolation
- Each student can only access their own employee data
- Student UUID is automatically included in all employee operations
- No cross-student data access is possible

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication failures
- Duplicate key errors
- Not found errors
- Database connection errors

All errors return a consistent JSON format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing the API

### Using cURL

```bash
# Register a new student
curl -X POST http://localhost:5000/api/v1/students/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/v1/students/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Add employee (use token from login)
curl -X POST http://localhost:5000/api/v1/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"name":"John Doe","email":"john@example.com","role":"Developer","salary":60000}'
```

### Using Postman
Import the provided Postman collection for easy testing.

## Project Structure

```
Backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── studentController.js # Student authentication operations
│   └── employeeController.js # Employee CRUD operations
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── errorHandler.js     # Error handling middleware
├── models/
│   ├── Student.js          # Student schema
│   └── Employee.js         # Employee schema
├── routes/
│   ├── students.js         # Student routes
│   └── employees.js        # Employee routes
├── config.env              # Environment variables
├── package.json            # Dependencies and scripts
├── server.js               # Main server file
└── README.md               
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- UUID-based data separation
- Input validation and sanitization
- CORS enabled
- Environment variable configuration
- Automatic token expiration

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB connection string
4. Set up proper logging
5. Use HTTPS in production
6. Implement rate limiting
7. Set up monitoring and health checks 




# Employee Management Frontend

A React.js frontend application that consumes the Employee CRUD API with Student UUID-based data separation.

## Features

- **Employee List Page** - Display all employees linked to the logged-in student UUID
- **Add Employee Page** - Form to add new employees with validation
- **Edit Employee Page** - Pre-fill and edit existing employee details
- **Employee Details Page** - Display comprehensive employee information
- **Student UUID Integration** - Automatic Student UUID header inclusion in all API requests
- **Form Validation** - Client-side validation for required fields and email format
- **Error Handling** - Comprehensive error handling and user feedback
- **Responsive Design** - Clean, modern UI with Tailwind CSS
- **Navigation** - Seamless navigation between different pages

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── EmployeeForm.jsx      # Reusable form component for add/edit
│   │   ├── EmployeeList.jsx      # Table view of employees
│   │   └── EmployeeDetails.jsx  # Detailed employee information display
│   ├── pages/
│   │   ├── EmployeeListPage.jsx    # Main employee listing page
│   │   ├── AddEmployeePage.jsx     # Add new employee page
│   │   ├── EditEmployeePage.jsx    # Edit existing employee page
│   │   └── EmployeeDetailsPage.jsx # Employee details view
│   ├── services/
│   │   └── api.js                 # API service with Student UUID integration
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Tailwind CSS imports
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## Student Authentication & UUID System

The application now includes a complete student authentication system:

### Student Registration
- Students can create accounts with username, email, password, and full name
- Each student is automatically assigned a unique UUID upon registration
- Username and email must be unique across all students

### Student Login
- Students can log in using their username/email and password
- JWT tokens are used for secure authentication
- Sessions persist until logout or token expiration

### UUID Assignment
- UUIDs are automatically generated using crypto.randomUUID()
- Each student gets a unique identifier that cannot be changed
- UUIDs are used to separate employee data between students

## API Integration

The frontend integrates with the backend API using the following endpoints:

### Student Authentication
- `POST /api/v1/students/register` - Register new student
- `POST /api/v1/students/login` - Login student
- `GET /api/v1/students/profile` - Get student profile

### Employee Management
- `GET /api/v1/employees` - Get all employees for the authenticated student
- `GET /api/v1/employees/:id` - Get specific employee by ID
- `POST /api/v1/employees` - Create new employee
- `PUT /api/v1/employees/:id` - Update existing employee
- `DELETE /api/v1/employees/:id` - Delete employee

### Authentication
- JWT tokens are automatically included in the Authorization header
- All employee operations are scoped to the authenticated student's UUID
- Automatic token refresh and session management

## Pages Overview

### 1. Login Page (`/login`)
- Student authentication with username/email and password
- Form validation and error handling
- Link to registration page for new students

### 2. Registration Page (`/register`)
- Student account creation with full validation
- Username, email, password, and full name fields
- Password confirmation and strength requirements
- Link to login page for existing students

### 3. Employee List Page (`/employees`)
- Displays all employees for the authenticated student
- Shows student's full name and assigned UUID
- Action buttons for View, Edit, and Delete
- "Add Employee" button to create new employees
- Logout button for session management
- Loading states and error handling

### 2. Add Employee Page (`/employees/add`)
- Form with validation for all employee fields
- Required fields: Name, Email
- Optional fields: Role, Salary, Status
- Client-side validation with error messages
- Cancel button to return to employee list

### 3. Edit Employee Page (`/employees/:id/edit`)
- Pre-filled form with existing employee data
- Same validation as Add Employee page
- Updates employee information via API
- Cancel button to return to employee details

### 4. Employee Details Page (`/employees/:id`)
- Comprehensive employee information display
- Formatted salary and date display
- Action buttons for Edit and Delete
- Back button to return to employee list

## Form Validation

The application includes comprehensive form validation:

- **Name**: Required field
- **Email**: Required field with email format validation
- **Salary**: Must be non-negative number
- **Role**: Optional field with default "Employee"
- **Status**: Dropdown with "Active" and "Inactive" options

## Error Handling

The application handles various error scenarios:

- **API Errors**: Displays meaningful error messages from the backend
- **Network Errors**: Shows connection error messages
- **Validation Errors**: Real-time form validation with error highlighting
- **Loading States**: Shows loading spinners during API calls
- **Empty States**: Displays appropriate messages when no data is available

## Styling

The application uses Tailwind CSS for styling:

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional appearance
- **Color-coded Status**: Green for Active, Red for Inactive employees
- **Hover Effects**: Interactive elements with hover states
- **Loading Animations**: Smooth loading spinners

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dependencies

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.jsx`
4. Add API methods in `src/services/api.js`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow responsive design principles
- Maintain consistent color scheme
- Use semantic HTML elements

## Testing the Application

1. **Start the Backend**: Ensure the backend API is running on port 5000
2. **Start the Frontend**: Run `npm run dev`
3. **Navigate to**: `http://localhost:5173`
4. **Test Features**:
   - View employee list
   - Add new employee
   - Edit existing employee
   - View employee details
   - Delete employee

## Troubleshooting

### Common Issues

1. **API Connection Error**: Ensure backend is running on port 5000
2. **Student UUID Error**: Check the UUID in `src/services/api.js`
3. **Styling Issues**: Verify Tailwind CSS is properly configured
4. **Build Errors**: Check for missing dependencies

### Debug Mode

Enable debug logging by checking the browser console for API request/response details.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Deploy the contents of `dist/` to your web server

## Contributing

1. Follow the existing code structure
2. Use meaningful component and variable names
3. Add proper error handling
4. Test all CRUD operations
5. Ensure responsive design

## License

This project is for educational purposes.
