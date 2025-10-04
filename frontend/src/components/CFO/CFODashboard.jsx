import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { CheckCircle, XCircle, Clock, DollarSign, TrendingUp, Users } from "lucide-react";

const CFODashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, role } = useAppSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      amount: 5000,
      currency: "INR",
      category: "Travel",
      date: "2025-10-01",
      description: "Business trip to Mumbai",
      status: "pending"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      amount: 3500,
      currency: "INR",
      category: "Food",
      date: "2025-10-02",
      description: "Client dinner meeting",
      status: "pending"
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      amount: 12000,
      currency: "INR",
      category: "Accommodation",
      date: "2025-10-03",
      description: "Hotel stay for conference",
      status: "pending"
    }
  ]);

  const [stats, setStats] = useState({
    totalPending: 20500,
    totalApproved: 150000,
    totalRejected: 5000,
    pendingCount: 3
  });

  const handleApprove = (id) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    setStats({
      ...stats,
      pendingCount: stats.pendingCount - 1
    });
    alert("Expense approved successfully!");
  };

  const handleReject = (id) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    setStats({
      ...stats,
      pendingCount: stats.pendingCount - 1
    });
    alert("Expense rejected!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-indigo-600">CFO Panel</h2>
        <nav className="flex flex-col gap-2">
          <button
            className={`p-2 rounded text-left ${selectedTab === "pending" ? "bg-indigo-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedTab("pending")}
          >
            Pending Requests
          </button>
          <button
            className={`p-2 rounded text-left ${selectedTab === "tracking" ? "bg-indigo-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => navigate("/cfo/expense-tracking")}
          >
            Expense Tracking
          </button>
          <button className="p-2 rounded text-left hover:bg-gray-200">
            Reports
          </button>
          <button className="p-2 rounded text-left hover:bg-gray-200">
            Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">CFO Dashboard</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingCount}</p>
              </div>
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-600">₹{stats.totalPending.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved (Month)</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalApproved.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected (Month)</p>
                <p className="text-2xl font-bold text-red-600">₹{stats.totalRejected.toLocaleString()}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
        </div>

        {/* Pending Requests Table */}
        {selectedTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Expense Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Employee</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{request.id}</td>
                        <td className="py-3 px-4 text-sm font-medium">{request.employeeName}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {request.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold">
                          {request.currency} {request.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{request.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{request.description}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-xs font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
                        No pending requests at the moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CFODashboard;
