import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return false;

  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  };

  try {


    const decodedToken = parseJwt(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
