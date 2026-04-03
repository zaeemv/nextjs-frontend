
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
// Uses OAuth2 password flow format (form-encoded) as expected by FastAPI.
// The token is stored in localStorage for use in subsequent requests.
export async function login({ username, password }: { username: string; password: string }) {
  // Create form-encoded data for OAuth2 password flow
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');

  const res = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const { access_token } = res.data;
  if (access_token) {
    localStorage.setItem('token', access_token);
  }
  return res.data;
}

// Registers a new user with the backend.
// Expects username, email, full_name, and password in the request body.
export async function signup({ username, email, full_name, password }: { username: string; email: string; full_name: string; password: string }) {
  const res = await api.post('/auth/register', { username, email, full_name, password });
  return res.data;
}

// Logs out the current user by removing the JWT token from localStorage.
export async function logout() {
  localStorage.removeItem('token');
  // Optionally, you can also notify the backend if needed
  return { message: 'Logged out' };
}

// Fetches the currently authenticated user's info using the JWT token.
// Sends token in request body via POST request.
export async function getCurrentUser(token?: string | null) {
  try {
    const tokenToUse = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    if (!tokenToUse) {
      return null;
    }
    const res = await api.post('/auth/validate', { token: tokenToUse });
    return res.data;
  } catch {
    return null;
  }
}

export default api;