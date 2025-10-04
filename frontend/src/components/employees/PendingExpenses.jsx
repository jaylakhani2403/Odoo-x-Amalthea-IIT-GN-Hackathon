import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut, ArrowLeft, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';

const PendingExpenses = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, role } = useAppSelector((state) => state.auth);
  
  const userData = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Employee",
  };

  const isAdmin = role?.toLowerCase() === 'admin';

  const [pendingExpenses, setPendingExpenses] = useState([
    {
      id: 1,
      fromDate: "2025-10-01",
      toDate: "2025-10-03",
      amount: 5000,
      currency: "INR",
      category: "Travel",
      description: "Business trip to Mumbai",
      status: "Pending with Manager",
      submittedDate: "2025-10-01",
      receipt: "receipt1.jpg",
      rejectionComment: null
    },
    {
      id: 2,
      fromDate: "2025-10-02",
      toDate: "2025-10-02",
      amount: 1500,
      currency: "INR",
      category: "Food",
      description: "Client lunch meeting",
      status: "Pending with CFO",
      submittedDate: "2025-10-02",
      receipt: "receipt2.jpg"
    },
    {
      id: 3,
      fromDate: "2025-09-28",
      toDate: "2025-09-30",
      amount: 8500,
      currency: "INR",
      category: "Accommodation",
      description: "Hotel stay for conference",
      status: "Pending with Manager",
      submittedDate: "2025-09-28",
      receipt: "receipt3.jpg"
    },
    {
      id: 4,
      fromDate: "2025-10-04",
      toDate: "2025-10-04",
      amount: 750,
      currency: "INR",
      category: "Office Supplies",
      description: "Stationery purchase",
      status: "Pending with Manager",
      submittedDate: "2025-10-04",
      receipt: "receipt4.jpg"
    }
  ]);

  const [stats] = useState({
    totalPending: 15750,
    pendingCount: 4,
    withManager: 3,
    withCFO: 1
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const getStatusColor = (status) => {
    if (status.includes("Manager")) return "bg-yellow-100 text-yellow-800";
    if (status.includes("CFO")) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  const handleViewReceipt = (receipt) => {
    alert(`Viewing receipt: ${receipt}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">
          Employee Panel
        </h2>
        <nav className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded"
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left text-blue-600 bg-blue-50 p-2 rounded font-medium"
          >
            Pending Expenses
          </button>
          <button
            onClick={() => navigate('/employee/expense-history')}
            className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded"
          >
            Expense History
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Pending Expenses
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingCount}</p>
                </div>
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">₹{stats.totalPending.toLocaleString()}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">With Manager</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.withManager}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">With CFO</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.withCFO}</p>
                </div>
                <Clock className="w-10 h-10 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Pending Expenses Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              My Pending Expenses
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Period</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Submitted</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingExpenses.length > 0 ? (
                    pendingExpenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">#{expense.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {expense.fromDate} to {expense.toDate}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {expense.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold">
                          {expense.currency} {expense.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{expense.description}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(expense.status)}`}>
                            {expense.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{expense.submittedDate}</td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => handleViewReceipt(expense.receipt)}
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-500">
                        No pending expenses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PendingExpenses;
