import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/authSlice';
import Login from './components/Login';
import EmployeeDashboard from './components/employees/EmployeeDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
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
    return userRole === 'admin' ? '/admin/dashboard' : '/dashboard';
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
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
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
  // return (
  //   <Router>
  //     <div className="App">
  //       <Routes>
  //         <Route 
  //           path="/login" 
  //           element={
  //             isAuthenticated ? 
  //               <Navigate to="/dashboard" replace /> : 
  //               <Login onLogin={handleLogin} />
  //           } 
  //         />
  //         <Route 
  //           path="/dashboard" 
  //           element={
  //             isAuthenticated ? 
  //               <EmployeeDashboard onLogout={handleLogout} /> : 
  //               <Navigate to="/login" replace />
  //           } 
  //         />
  //         <Route 
  //           path="/" 
  //           element={<Navigate to="/login" replace />} 
  //         />
  //       </Routes>
  //     </div>
  //   </Router>
  // )
}

export default App
