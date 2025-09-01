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