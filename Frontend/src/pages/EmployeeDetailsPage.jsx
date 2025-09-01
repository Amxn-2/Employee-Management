import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeDetails from '../components/EmployeeDetails';
import { employeeAPI } from '../services/api';

const EmployeeDetailsPage = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch employee data on component mount
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await employeeAPI.getById(id);
      setEmployee(response.data);
    } catch (err) {
      console.error('Error fetching employee:', err);
      setError(err.response?.data?.error || 'Failed to fetch employee');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/employees');
  };

  const handleEdit = (employeeId) => {
    navigate(`/employees/${employeeId}/edit`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(employeeId);
        navigate('/employees');
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert(err.response?.data?.error || 'Failed to delete employee');
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="text-red-600 text-lg mb-4">Error: {error}</div>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Employee List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmployeeDetails
          employee={employee}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EmployeeDetailsPage; 