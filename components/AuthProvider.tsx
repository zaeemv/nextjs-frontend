
"use client"
// AuthProvider.tsx
// This component provides authentication state and functions (login, signup, logout)
// to the rest of the app using React Context. It wraps your app and allows any child
// component to access the current user and auth actions via the useAuth() hook.
// This version uses JWT tokens for authentication, storing the token in localStorage
// and sending it as a Bearer token for protected endpoints.
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getCurrentUser } from '../lib/api';


// The shape of the authentication context.
interface AuthContextType {
  user: any; // The current authenticated user object, or null if not logged in.
  login: (data: { username: string; password: string }) => Promise<void>; // Function to log in
  signup: (data: { username: string; email: string; full_name: string; password: string }) => Promise<void>; // Function to sign up
  logout: () => Promise<void>; // Function to log out
}


// Create the React Context for authentication.
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// AuthProvider wraps your app and manages authentication state.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // On mount, check if the user is already authenticated (by checking for a JWT token).
  useEffect(() => {
    // If no token, user is not authenticated
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      setUser(null);
      return;
    }
    getCurrentUser().then(setUser).catch(() => setUser(null));
  }, []);

  // Calls the login API and updates user state on success.
  // Expects username and password.
  const login = async (data: { username: string; password: string }) => {
    await apiLogin(data);
    const user = await getCurrentUser();
    setUser(user);
  };

  // Calls the signup API and updates user state on success.
  // Expects username, email, full_name, and password.
  const signup = async (data: { username: string; email: string; full_name: string; password: string }) => {
    await apiSignup(data);
    const user = await getCurrentUser();
    setUser(user);
  };

  // Calls the logout API and clears user state and JWT token.
  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  // Provide the user and auth functions to all children.
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// Custom hook to access the authentication context.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}


// Usage:
// 1. Wrap <AuthProvider> around your app in app/layout.tsx.
// 2. In login/signup pages, use const { login, signup } = useAuth();
//    Call login/signup on form submit.
// 3. Use user from context to check auth state.
