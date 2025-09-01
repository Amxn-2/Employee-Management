# Postman Collection Setup Guide

## How to Import the Collection

1. **Open Postman**
2. **Click "Import"** button (top left)
3. **Import the collection file**: `Employee_Management_API.postman_collection.json`
4. **Import the environment file**: `Employee_Management_API.postman_environment.json`

## Environment Setup

1. **Select Environment**: Choose "Employee Management API - Local" from the environment dropdown
2. **Verify Variables**: Ensure `base_url` is set to `http://localhost:5000`

## Testing Workflow

### Step 1: Health Check
- **Request**: `GET /` (Health Check)
- **Purpose**: Verify the API is running
- **Expected Response**: API information and available endpoints

### Step 2: Student Registration
- **Request**: `POST /api/v1/students/register`
- **Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```
- **Purpose**: Create a new student account
- **Expected Response**: Student data with JWT token
- **Auto-action**: Token is automatically saved to `auth_token` variable

### Step 3: Student Login
- **Request**: `POST /api/v1/students/login`
- **Body**:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```
- **Purpose**: Authenticate and get JWT token
- **Expected Response**: Student data with JWT token
- **Auto-action**: Token is automatically saved to `auth_token` variable

### Step 4: Create Employee
- **Request**: `POST /api/v1/employees`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "role": "Software Engineer",
  "salary": 75000,
  "status": "Active"
}
```
- **Purpose**: Add a new employee for the authenticated student
- **Expected Response**: Employee data with ID
- **Auto-action**: Employee ID is automatically saved to `employeeId` variable

### Step 5: Get All Employees
- **Request**: `GET /api/v1/employees`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Purpose**: Retrieve all employees for the authenticated student
- **Expected Response**: Array of employees

### Step 6: Get Employee by ID
- **Request**: `GET /api/v1/employees/{{employeeId}}`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Purpose**: Get specific employee details
- **Expected Response**: Employee data

### Step 7: Update Employee
- **Request**: `PUT /api/v1/employees/{{employeeId}}`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Body**:
```json
{
  "name": "Jane Smith Updated",
  "salary": 80000
}
```
- **Purpose**: Update employee information
- **Expected Response**: Updated employee data

### Step 8: Delete Employee
- **Request**: `DELETE /api/v1/employees/{{employeeId}}`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Purpose**: Remove employee
- **Expected Response**: Success message

### Step 9: Get Student Profile
- **Request**: `GET /api/v1/students/profile`
- **Headers**: `Authorization: Bearer {{auth_token}}`
- **Purpose**: Get authenticated student's profile
- **Expected Response**: Student data

## 🔧 Collection Features

### Auto-Token Management
- **Login/Register responses** automatically extract and save JWT tokens
- **Token is stored** in the `auth_token` environment variable
- **All protected requests** automatically use the stored token

### Auto-Employee ID Management
- **Create/Update responses** automatically extract and save employee IDs
- **Employee ID is stored** in the `employeeId` environment variable
- **Subsequent requests** automatically use the stored ID

### Pre-request Scripts
The collection includes scripts that:
- Extract tokens from authentication responses
- Extract employee IDs from create/update responses
- Automatically populate environment variables

## 📋 Test Data Examples

### Student Registration Examples
```json
{
  "username": "alice_dev",
  "email": "alice@tech.com",
  "password": "secure123",
  "fullName": "Alice Developer"
}
```

```json
{
  "username": "bob_manager",
  "email": "bob@company.com",
  "password": "manager456",
  "fullName": "Bob Manager"
}
```

### Employee Examples
```json
{
  "name": "Mike Johnson",
  "email": "mike@company.com",
  "role": "Product Manager",
  "salary": 85000,
  "status": "Active"
}
```

```json
{
  "name": "Sarah Wilson",
  "email": "sarah@company.com",
  "role": "UX Designer",
  "salary": 70000,
  "status": "Active"
}
```

## 🧪 Testing Scenarios

### 1. **New Student Workflow**
1. Register new student
2. Login with credentials
3. Create first employee
4. View all employees
5. Update employee
6. Delete employee

### 2. **Multiple Students Test**
1. Register Student A
2. Register Student B
3. Login as Student A
4. Create employees for Student A
5. Login as Student B
6. Verify Student B sees no employees
7. Create employees for Student B
8. Verify data separation

### 3. **Authentication Tests**
1. Try to access protected routes without token
2. Try to access protected routes with invalid token
3. Verify proper error responses

### 4. **Data Validation Tests**
1. Try to create employee with missing required fields
2. Try to create student with duplicate email/username
3. Try to create employee with invalid email format
4. Verify proper validation error messages

## Common Issues & Solutions

### Issue: "Route not found"
- **Solution**: Ensure backend server is running on port 5000
- **Check**: Verify `base_url` environment variable

### Issue: "Unauthorized" errors
- **Solution**: Ensure you've completed login/registration first
- **Check**: Verify `auth_token` environment variable is set

### Issue: "Employee not found"
- **Solution**: Ensure you're using the correct `employeeId`
- **Check**: Verify the employee was created successfully

### Issue: "Student with this email already exists"
- **Solution**: Use different email/username for testing
- **Alternative**: Delete existing student from database

## Response Validation

### Successful Responses
- **Status**: 200 (OK) or 201 (Created)
- **Format**: `{"success": true, "data": {...}}`

### Error Responses
- **Status**: 400, 401, 404, 500
- **Format**: `{"success": false, "error": "Error message"}`

### Common Status Codes
- **200**: Success (GET, PUT, DELETE)
- **201**: Created (POST)
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **404**: Not Found (resource doesn't exist)
- **500**: Internal Server Error

## 🔒 Security Testing

### Token Validation
- Test with expired tokens
- Test with malformed tokens
- Test with tokens from different students

### Data Isolation
- Verify students can't access other students' data
- Test UUID-based separation
- Verify employee operations are scoped correctly

## Notes

- **Environment variables** are automatically managed by the collection
- **Pre-request scripts** handle token and ID extraction
- **All requests** include proper headers and authentication
- **Test data** can be modified in the request bodies
- **Variables** are automatically populated for convenience