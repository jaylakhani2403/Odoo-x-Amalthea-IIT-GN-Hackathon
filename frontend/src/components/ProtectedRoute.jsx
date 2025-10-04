import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props
 * @param {React.Component} props.children - Component to render if authorized
 * @param {Array<string>} props.allowedRoles - Array of roles that can access this route
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no role restrictions, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Normalize role for comparison (case-insensitive)
  const userRole = role?.toLowerCase() || 'employee';
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

  // Check if user's role is in allowed roles
  if (normalizedAllowedRoles.includes(userRole)) {
    return children;
  }

  // If user doesn't have permission, redirect to their default dashboard
  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (userRole === 'cfo') {
    return <Navigate to="/cfo/dashboard" replace />;
  } else if (userRole === 'manager') {
    return <Navigate to="/manager/dashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default ProtectedRoute;
