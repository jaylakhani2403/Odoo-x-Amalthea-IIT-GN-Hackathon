import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut, ArrowLeft, TrendingUp, PieChart, BarChart3, DollarSign } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';

const ExpenseHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, role } = useAppSelector((state) => state.auth);
  
  const userData = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Employee",
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Sample expense history data
  const [expenseData] = useState({
    byCategory: [
      { category: "Travel", amount: 18000, percentage: 40, count: 5 },
      { category: "Food", amount: 9000, percentage: 20, count: 8 },
      { category: "Accommodation", amount: 13500, percentage: 30, count: 3 },
      { category: "Office Supplies", amount: 4500, percentage: 10, count: 6 }
    ],
    byMonth: [
      { month: "Jan", amount: 3500 },
      { month: "Feb", amount: 4200 },
      { month: "Mar", amount: 5100 },
      { month: "Apr", amount: 4800 },
      { month: "May", amount: 6200 },
      { month: "Jun", amount: 5500 },
      { month: "Jul", amount: 4900 },
      { month: "Aug", amount: 5800 },
      { month: "Sep", amount: 6500 },
      { month: "Oct", amount: 4500 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 }
    ],
    byStatus: [
      { status: "Approved", amount: 35000, count: 18, percentage: 77.78 },
      { status: "Rejected", amount: 5000, count: 3, percentage: 11.11 },
      { status: "Pending", amount: 5000, count: 4, percentage: 11.11 }
    ],
    allExpenses: [
      {
        id: 1,
        date: "2025-09-15",
        category: "Travel",
        amount: 5000,
        status: "Approved",
        approvedBy: "Manager",
        description: "Client visit",
        rejectionComment: null
      },
      {
        id: 2,
        date: "2025-09-20",
        category: "Food",
        amount: 1200,
        status: "Approved",
        approvedBy: "Manager",
        description: "Team lunch",
        rejectionComment: null
      },
      {
        id: 3,
        date: "2025-09-25",
        category: "Accommodation",
        amount: 8500,
        status: "Approved",
        approvedBy: "CFO",
        description: "Conference hotel",
        rejectionComment: null
      },
      {
        id: 4,
        date: "2025-09-28",
        category: "Office Supplies",
        amount: 750,
        status: "Rejected",
        approvedBy: "Manager",
        description: "Stationery",
        rejectionComment: "Exceeds monthly stationery budget. Please submit smaller amounts."
      },
      {
        id: 5,
        date: "2025-10-01",
        category: "Travel",
        amount: 4500,
        status: "Pending",
        approvedBy: "-",
        description: "Business trip",
        rejectionComment: null
      }
    ],
    totalExpenses: 45000,
    totalApproved: 35000,
    totalRejected: 5000,
    totalPending: 5000
  });

  const years = [2023, 2024, 2025];
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];

  const categoryColors = {
    "Travel": "bg-blue-500",
    "Food": "bg-green-500",
    "Accommodation": "bg-purple-500",
    "Office Supplies": "bg-orange-500"
  };

  const statusColors = {
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
    "Pending": "bg-yellow-100 text-yellow-800"
  };

  const maxAmount = Math.max(...expenseData.byMonth.map(m => m.amount));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold">My Expense History</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter by Period</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{expenseData.totalExpenses.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{expenseData.totalApproved.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  ₹{expenseData.totalRejected.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ₹{expenseData.totalPending.toLocaleString()}
                </p>
              </div>
              <PieChart className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Expenses by Category</h2>
            <div className="space-y-4">
              {expenseData.byCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-gray-600">
                      ₹{item.amount.toLocaleString()} ({item.count} expenses)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${categoryColors[item.category]} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie Chart */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {expenseData.byCategory.reduce((acc, item, index) => {
                    const colors = ["#3b82f6", "#10b981", "#a855f7", "#f97316"];
                    const startAngle = acc.angle;
                    const angle = (item.percentage / 100) * 360;
                    const endAngle = startAngle + angle;
                    
                    const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);
                    
                    const largeArc = angle > 180 ? 1 : 0;
                    
                    acc.paths.push(
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={colors[index]}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    );
                    
                    acc.angle = endAngle;
                    return acc;
                  }, { angle: 0, paths: [] }).paths}
                </svg>
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Monthly Trend ({selectedYear})</h2>
            <div className="space-y-3">
              {expenseData.byMonth.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${item.amount > 0 ? (item.amount / maxAmount) * 100 : 0}%` }}
                    >
                      {item.amount > 0 && (
                        <span className="text-white text-xs font-semibold">
                          ₹{(item.amount / 1000).toFixed(1)}K
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-24 text-sm text-gray-600 text-right">
                    ₹{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Expenses by Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {expenseData.byStatus.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{item.status}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[item.status]}`}>
                    {item.count} expenses
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{item.amount.toLocaleString()}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.status === 'Approved' ? 'bg-green-500' : item.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'} h-2 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Expenses Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Approved By</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenseData.allExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">#{expense.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.date}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">₹{expense.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.description}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[expense.status]}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.approvedBy}</td>
                    <td className="py-3 px-4 text-sm">
                      {expense.rejectionComment ? (
                        <div className="text-red-600 italic text-xs">
                          "{expense.rejectionComment}"
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHistory;
