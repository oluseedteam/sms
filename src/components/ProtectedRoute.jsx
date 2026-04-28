import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, blockedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'student') return <Navigate to="/student" replace />;
    if (role === 'teacher') return <Navigate to="/teacher" replace />;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/login" replace />;
  }

  if (blockedRoles && blockedRoles.includes(role)) {
    if (role === 'student') return <Navigate to="/student" replace />;
    if (role === 'teacher') return <Navigate to="/teacher" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
