import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { ArrowLeft, TrendingUp, PieChart, BarChart3, Users } from "lucide-react";

const TeamExpenseTracking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Sample team expense data
  const [expenseData, setExpenseData] = useState({
    byCategory: [
      { category: "Travel", amount: 28000, percentage: 35 },
      { category: "Food", amount: 20000, percentage: 25 },
      { category: "Accommodation", amount: 24000, percentage: 30 },
      { category: "Office Supplies", amount: 8000, percentage: 10 }
    ],
    byMonth: [
      { month: "Jan", amount: 75000 },
      { month: "Feb", amount: 82000 },
      { month: "Mar", amount: 90000 },
      { month: "Apr", amount: 85000 },
      { month: "May", amount: 95000 },
      { month: "Jun", amount: 88000 },
      { month: "Jul", amount: 92000 },
      { month: "Aug", amount: 98000 },
      { month: "Sep", amount: 94000 },
      { month: "Oct", amount: 80000 },
      { month: "Nov", amount: 0 },
      { month: "Dec", amount: 0 }
    ],
    byEmployee: [
      { name: "Alice Johnson", amount: 12500, expenses: 8 },
      { name: "Bob Williams", amount: 10200, expenses: 6 },
      { name: "Carol Davis", amount: 15800, expenses: 10 },
      { name: "David Brown", amount: 8900, expenses: 5 },
      { name: "Emma Wilson", amount: 11600, expenses: 7 },
      { name: "Frank Miller", amount: 9400, expenses: 4 },
      { name: "Grace Lee", amount: 13200, expenses: 9 },
      { name: "Henry Taylor", amount: 7800, expenses: 3 }
    ],
    totalExpenses: 80000,
    totalEmployees: 12,
    averagePerEmployee: 6667
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
              onClick={() => navigate("/manager/dashboard")}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold">Team Expense Tracking</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{user?.userName || "Manager"}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Team Expenses</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{expenseData.totalExpenses.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-green-600">{expenseData.totalEmployees}</p>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg per Member</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{expenseData.averagePerEmployee.toLocaleString()}
                </p>
              </div>
              <PieChart className="w-10 h-10 text-purple-600" />
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
                      ₹{item.amount.toLocaleString()} ({item.percentage}%)
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

        {/* Employee-wise Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Team Member Expenses - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No. of Expenses</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Average</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenseData.byEmployee.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{employee.name}</td>
                    <td className="py-3 px-4 text-sm">₹{employee.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{employee.expenses}</td>
                    <td className="py-3 px-4 text-sm">
                      ₹{Math.round(employee.amount / employee.expenses).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
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

export default TeamExpenseTracking;
