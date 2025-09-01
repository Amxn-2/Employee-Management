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
