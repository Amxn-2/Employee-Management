import api from './api';

// Student API functions
export const studentAPI = {
  // Register new student
  register: async (studentData) => {
    const response = await api.post('/students/register', studentData);
    return response.data;
  },

  // Login student
  login: async (credentials) => {
    const response = await api.post('/students/login', credentials);
    return response.data;
  },

  // Get student profile
  getProfile: async () => {
    const response = await api.get('/students/profile');
    return response.data;
  },
};

export default studentAPI; 