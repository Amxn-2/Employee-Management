import React from 'react';

const EmployeeDetails = ({ employee, onBack, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading employee details...</span>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-4">Employee not found</div>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to Employee List
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={onBack}
                className="px-3 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-sm"
              >
                Back
              </button>
              <button
                onClick={() => onEdit(employee._id)}
                className="px-3 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(employee._id)}
                className="px-3 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Employee Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Name
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {employee.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-lg text-gray-900">
                  {employee.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Role
                </label>
                <p className="text-lg text-gray-900">
                  {employee.role}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Salary
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatSalary(employee.salary)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Status
                </label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  employee.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Date of Joining
                </label>
                <p className="text-lg text-gray-900">
                  {formatDate(employee.dateOfJoining)}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Employee ID
                </label>
                <p className="text-sm text-gray-600 font-mono">
                  {employee._id}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Student UUID
                </label>
                <p className="text-sm text-gray-600 font-mono">
                  {employee.studentUUID}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Created
                </label>
                <p className="text-sm text-gray-600">
                  {formatDate(employee.createdAt)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </label>
                <p className="text-sm text-gray-600">
                  {formatDate(employee.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails; 