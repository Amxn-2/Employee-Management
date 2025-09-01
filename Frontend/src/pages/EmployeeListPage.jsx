import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmployeeList from '../components/EmployeeList';
import { employeeAPI } from '../services/api';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { student, logout } = useAuth();

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data || []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.response?.data?.error || 'Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handleEdit = (employeeId) => {
    navigate(`/employees/${employeeId}/edit`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(employeeId);
        // Refresh the list after deletion
        fetchEmployees();
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert(err.response?.data?.error || 'Failed to delete employee');
      }
    }
  };

  const handleAddNew = () => {
    navigate('/employees/add');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="text-red-600 text-lg mb-4">Error: {error}</div>
            <button
              onClick={fetchEmployees}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
              <p className="mt-2 text-gray-600">
                Welcome, {student?.fullName}! Your Student UUID: {student?.uuid}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Employee
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <EmployeeList
          employees={employees}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EmployeeListPage; 