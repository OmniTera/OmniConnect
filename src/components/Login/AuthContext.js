// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Add OTP verification state

  const login = (userData) => {
    setUser(userData);
    setIsOtpVerified(false); // Reset OTP verification on new login
  };

  const logout = () => {
    setUser(null);
    setIsOtpVerified(false); // Reset OTP verification on logout
  };

  const isAuthenticated = () => {
    return user !== null && isOtpVerified; // Check both user authentication and OTP verification
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, setUser, setIsOtpVerified }}>
      {children}
    </AuthContext.Provider>
  );
};
