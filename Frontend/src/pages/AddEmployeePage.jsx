import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { employeeAPI } from '../services/api';

const AddEmployeePage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      await employeeAPI.create(formData);
      navigate('/employees');
    } catch (err) {
      console.error('Error creating employee:', err);
      setError(err.response?.data?.error || 'Failed to create employee');
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to Employee List
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* Form */}
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default AddEmployeePage; 