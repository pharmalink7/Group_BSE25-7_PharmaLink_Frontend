
const BASE_URL = 'http://127.0.0.1:8000/api';

export const loginUser = async (credentials) => {
  try {
    // Correct URL is now /token/
    const response = await fetch(`${BASE_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), // e.g., { username: '...', password: '...' }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    console.log('Login successful! Tokens received:', data);
    // When successful, data will be: { "access": "...", "refresh": "..." }
    
    return data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const registerUser = async (userData) => {
  try {
    // From the urls.py, the path is /api/users/ which likely points to a register view
    const response = await fetch(`${BASE_URL}/users/register/`, { // Assuming this is the endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // userData will be { username, email, password }
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Django Rest Framework often sends specific field errors
      const errorMessage = Object.values(data).join('\n');
      throw new Error(errorMessage || 'Registration failed');
    }
    
    console.log('Registration successful:', data);
    return data;

  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

