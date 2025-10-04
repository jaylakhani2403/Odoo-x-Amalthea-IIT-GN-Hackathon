import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { ArrowLeft, TrendingUp, PieChart, BarChart3 } from "lucide-react";

const ExpenseTracking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Sample expense data
  const [expenseData, setExpenseData] = useState({
    byCategory: [
      { category: "Travel", amount: 45000, percentage: 30 },
      { category: "Food", amount: 30000, percentage: 20 },
      { category: "Accommodation", amount: 40000, percentage: 26.67 },
      { category: "Office Supplies", amount: 35000, percentage: 23.33 }
    ],
    byMonth: [
      { month: "Jan", amount: 120000 },
      { month: "Feb", amount: 135000 },
      { month: "Mar", amount: 150000 },
      { month: "Apr", amount: 140000 },
      { month: "May", amount: 160000 },
      { month: "Jun", amount: 145000 },
      { month: "Jul", amount: 155000 },
      { month: "Aug", amount: 170000 },
      { month: "Sep", amount: 165000 },
      { month: "Oct", amount: 150000 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 }
    ],
    totalExpenses: 150000,
    totalEmployees: 45,
    averagePerEmployee: 3333
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

  // Calculate max amount for bar chart scaling
  const maxAmount = Math.max(...expenseData.byMonth.map(m => m.amount));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cfo/dashboard")}
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold">Expense Tracking & Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{user?.userName || "CFO"}</span>
            <button 
              onClick={() => dispatch(logout())}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-indigo-600">
                  ₹{expenseData.totalExpenses.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Employees</p>
                <p className="text-2xl font-bold text-blue-600">{expenseData.totalEmployees}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg per Employee</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{expenseData.averagePerEmployee.toLocaleString()}
                </p>
              </div>
              <PieChart className="w-10 h-10 text-green-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown - Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Expenses by Category</h2>
            <div className="space-y-4">
              {expenseData.byCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-gray-600">
                      ₹{item.amount.toLocaleString()} ({item.percentage.toFixed(1)}%)
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

            {/* Pie Chart Visualization */}
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

          {/* Monthly Trend - Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Monthly Expense Trend ({selectedYear})</h2>
            <div className="space-y-3">
              {expenseData.byMonth.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${item.amount > 0 ? (item.amount / maxAmount) * 100 : 0}%` }}
                    >
                      {item.amount > 0 && (
                        <span className="text-white text-xs font-semibold">
                          ₹{(item.amount / 1000).toFixed(0)}K
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

        {/* Detailed Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Detailed Breakdown - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Percentage</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenseData.byCategory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{item.category}</td>
                    <td className="py-3 px-4 text-sm">₹{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{item.percentage.toFixed(1)}%</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +5.2%
                      </span>
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

export default ExpenseTracking;
