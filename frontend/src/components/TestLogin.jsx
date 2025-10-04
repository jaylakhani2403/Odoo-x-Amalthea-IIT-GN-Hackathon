import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/authSlice';

const TestLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, loginResponse, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: 'hardikthummar@gmail.com',
    password: '1234'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestLogin = async (e) => {
    e.preventDefault();
    
    console.log('Testing login with:', formData);
    console.log('API URL:', `${import.meta.env.VITE_BASE_URL}/auth/login?userName=${formData.username}&password=${formData.password}`);
    
    const result = await dispatch(loginUser({
      username: formData.username,
      password: formData.password
    }));
    
    console.log('Login result:', result);
  };

  const handleDirectAPI = async () => {
    try {
      const url = `http://localhost:8087/auth/login?userName=${formData.username}&password=${formData.password}`;
      console.log('Direct API call to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      alert(`Direct API Response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('Direct API Error:', error);
      alert(`Direct API Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Login API Testing Page</h1>
          
          {/* API Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">API Information</h3>
            <p className="text-sm text-blue-700">
              <strong>URL:</strong> http://localhost:8087/auth/login
            </p>
            <p className="text-sm text-blue-700">
              <strong>Method:</strong> POST
            </p>
            <p className="text-sm text-blue-700">
              <strong>Environment URL:</strong> {import.meta.env.VITE_BASE_URL || 'Not set'}
            </p>
          </div>

          {/* Test Form */}
          <form onSubmit={handleTestLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username/Email
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Testing...' : 'Test Redux Login'}
              </button>
              
              <button
                type="button"
                onClick={handleDirectAPI}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Test Direct API
              </button>
            </div>
          </form>

          {/* Results */}
          <div className="space-y-4">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h3 className="text-lg font-medium text-red-900 mb-2">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Display */}
            {loginResponse && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h3 className="text-lg font-medium text-green-900 mb-2">Login Response</h3>
                <pre className="text-sm text-green-700 whitespace-pre-wrap">
                  {JSON.stringify(loginResponse, null, 2)}
                </pre>
              </div>
            )}

            {/* Authentication Status */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Status</h3>
              <p className="text-sm text-gray-700">
                <strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
