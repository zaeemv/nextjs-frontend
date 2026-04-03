
// api.ts
// This file centralizes all API calls to the FastAPI backend.
// It provides functions for authentication (login, signup, logout, getCurrentUser)
// and for fetching customer data. This version uses JWT tokens for authentication.
// The JWT is stored in localStorage after login and sent as a Bearer token in the Authorization header for protected endpoints.
import axios from "axios";


// Create an Axios instance with the base URL of your FastAPI backend.

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your FastAPI backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});


// Fetches the list of customers from the backend.
// Requires a valid JWT token in the Authorization header.
// Accepts an optional token argument for explicit header control.
export const getCustomers = async (token?: string | null) => {
  // If a token is provided, use it in the Authorization header for this request
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;
  const res = await api.get('/customers/', config);
  return res.data;
};



// Auth API functions

// Sends login credentials to the backend and expects a JWT token in response.
// The token is stored in localStorage for use in subsequent requests.
export async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post('/login', { email, password });
  const { access_token } = res.data;
  if (access_token) {
    localStorage.setItem('token', access_token);
  }
  return res.data;
}

// Registers a new user with the backend.
export async function signup({ email, password }: { email: string; password: string }) {
  const res = await api.post('/register', { email, password });
  return res.data;
}

// Logs out the current user by removing the JWT token from localStorage.
export async function logout() {
  localStorage.removeItem('token');
  // Optionally, you can also notify the backend if needed
  return { message: 'Logged out' };
}

// Fetches the currently authenticated user's info using the JWT token.
export async function getCurrentUser() {
  try {
    const res = await api.get('/me');
    return res.data;
  } catch {
    return null;
  }
}

export default api;