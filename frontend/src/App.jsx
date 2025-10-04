import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/authSlice';
import Login from './components/Login';
import EmployeeDashboard from './components/employees/EmployeeDashboard';
import PendingExpenses from './components/employees/PendingExpenses';
import ExpenseHistory from './components/employees/ExpenseHistory';
import AdminDashboard from './components/admin/AdminDashboard';
import CFODashboard from './components/cfo/CFODashboard';
import ExpenseTracking from './components/cfo/ExpenseTracking';
import ManagerDashboard from './components/manager/ManagerDashboard';
import TeamExpenseTracking from './components/manager/TeamExpenseTracking';
// import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loginResponse, role } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Log login response details when available
  useEffect(() => {
    if (loginResponse) {
      console.log('Login Response Details:', {
        user: user,
        token: loginResponse.token || loginResponse.accessToken,
        role: role,
        fullResponse: loginResponse
      });
    }
  }, [loginResponse, user, role]);

  // Determine default dashboard based on role
  const getDefaultDashboard = () => {
    if (!isAuthenticated) return '/login';
    const userRole = role?.toLowerCase() || 'employee';
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'cfo') return '/cfo/dashboard';
    if (userRole === 'manager') return '/manager/dashboard';
    return '/dashboard';
  };

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to={getDefaultDashboard()} replace /> : 
              <Login />
          } 
        />
        <Route 
          path="/dashboard" 
          element={<EmployeeDashboard />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={<AdminDashboard />} 
        />
        <Route 
          path="/cfo/dashboard" 
          element={<CFODashboard />} 
        />
        <Route 
          path="/cfo/expense-tracking" 
          element={<ExpenseTracking />} 
        />
        <Route 
          path="/manager/dashboard" 
          element={<ManagerDashboard />} 
        />
        <Route 
          path="/manager/team-expenses" 
          element={<TeamExpenseTracking />} 
        />
        <Route 
          path="/employee/pending-expenses" 
          element={<PendingExpenses />} 
        />
        <Route 
          path="/employee/expense-history" 
          element={<ExpenseHistory />} 
        />
        <Route path="/" element={<Navigate to={getDefaultDashboard()} replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
 
}

export default App
