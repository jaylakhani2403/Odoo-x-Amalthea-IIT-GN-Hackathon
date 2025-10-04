import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import EmployeeDashboard from './components/employees/EmployeeDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    // In a real app, you would validate credentials with a backend
    console.log('User logged in:', userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<EmployeeDashboard onLogout={handleLogout} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
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
