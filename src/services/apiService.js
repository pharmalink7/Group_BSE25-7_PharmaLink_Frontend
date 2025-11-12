
//Below is the backend url for the deployment environment
// const BASE_URL = 'https://pharmalink-x7j6.onrender.com/api';

  // Below is the backend url for the local
   const BASE_URL = 'http://127.0.0.1:8000/api'; 

//Below is the front end url for the staging environment
  // const BASE_URL = 'https://group-bse-25-7-pharma-link-frontend-mu.vercel.app/api';


// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const loginUser = async (credentials) => {
  try {
    // Correct URL is now /token/
    const response = await fetch(`${BASE_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), 
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    console.log('Login successful! Tokens received:', data);
    // Store tokens in localStorage
    if (data.access) {
      localStorage.setItem('accessToken', data.access);
    }
    if (data.refresh) {
      localStorage.setItem('refreshToken', data.refresh);
    }
    
    return data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


// export const registerUser = async (userData) => {
//   try {
//     // From the urls.py, the path is /api/users/ which likely points to a register view
//     const response = await fetch(`${BASE_URL}/users/register/`, { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // userData will be { username, email, password }
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // Django Rest Framework often sends specific field errors
//       const errorMessage = Object.values(data).join('\n');
//       throw new Error(errorMessage || 'Registration failed');
//     }
    
//     console.log('Registration successful:', data);
//     return data;

//   } catch (error) {
//     console.error("Registration error:", error);
//     throw error;
//   }
// };

// Medicine API functions
// includeAuth: if true, include auth token (useful for owner-specific endpoints)
// if false, omit token (public endpoints)
export const getAllMedicines = async (searchQuery = '', includeAuth = false) => {
  try {
    const url = searchQuery 
      ? `${BASE_URL}/medicines/?search=${encodeURIComponent(searchQuery)}`
      : `${BASE_URL}/medicines/`;
    
    // For public access (browse page), don't include auth token
    // For authenticated access (dashboard), include auth token
    const headers = includeAuth 
      ? getAuthHeaders() 
      : { 'Content-Type': 'application/json' };
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const contentType = response.headers.get('content-type') || '';
    const parseBody = async () => {
      if (contentType.includes('application/json')) {
        return await response.json();
      }
      const text = await response.text();
      return { detail: text };
    };

    const data = await parseBody();

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error('Server error while fetching medicines. Please try again later.');
      }
      const message = (data && (data.detail || data.error)) || 'Failed to fetch medicines';
      throw new Error(message);
    }
    
    return data;

  } catch (error) {
    console.error("Get medicines error:", error);
    throw error;
  }
};

export const getMyMedicines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/medicines/my_medicines/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = (data && (data.detail || data.error)) || 'Failed to fetch your medicines';
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("Get my medicines error:", error);
    throw error;
  }
};

export const addMedicine = async (medicineData) => {
  try {
    const response = await fetch(`${BASE_URL}/medicines/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(medicineData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = Object.values(data).join('\n') || 'Failed to add medicine';
      throw new Error(errorMessage);
    }
    
    return data;

  } catch (error) {
    console.error("Add medicine error:", error);
    throw error;
  }
};

export const updateMedicine = async (medicineId, medicineData) => {
  try {
    const response = await fetch(`${BASE_URL}/medicines/${medicineId}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(medicineData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = Object.values(data).join('\n') || 'Failed to update medicine';
      throw new Error(errorMessage);
    }
    
    return data;

  } catch (error) {
    console.error("Update medicine error:", error);
    throw error;
  }
};

export const deleteMedicine = async (medicineId) => {
  try {
    const response = await fetch(`${BASE_URL}/medicines/${medicineId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || 'Failed to delete medicine');
    }
    
    return { success: true };

  } catch (error) {
    console.error("Delete medicine error:", error);
    throw error;
  }
};

// Pharmacy API functions
export const getAllPharmacies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pharmacies/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to fetch pharmacies');
    }
    
    return data;

  } catch (error) {
    console.error("Get pharmacies error:", error);
    throw error;
  }
};

// User authentication helpers
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};

