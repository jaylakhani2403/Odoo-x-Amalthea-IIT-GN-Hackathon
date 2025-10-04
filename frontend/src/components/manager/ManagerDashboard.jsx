import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { CheckCircle, XCircle, Clock, DollarSign, TrendingUp, Users } from "lucide-react";

const ManagerDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, role } = useAppSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      employeeName: "Alice Johnson",
      amount: 4500,
      currency: "INR",
      category: "Travel",
      date: "2025-10-01",
      description: "Client visit to Delhi",
      status: "pending"
    },
    {
      id: 2,
      employeeName: "Bob Williams",
      amount: 2800,
      currency: "INR",
      category: "Food",
      date: "2025-10-02",
      description: "Team lunch meeting",
      status: "pending"
    },
    {
      id: 3,
      employeeName: "Carol Davis",
      amount: 8500,
      currency: "INR",
      category: "Accommodation",
      date: "2025-10-03",
      description: "Conference hotel booking",
      status: "pending"
    },
    {
      id: 4,
      employeeName: "David Brown",
      amount: 1500,
      currency: "INR",
      category: "Office Supplies",
      date: "2025-10-04",
      description: "Stationery purchase",
      status: "pending"
    }
  ]);

  const [stats, setStats] = useState({
    totalPending: 17300,
    totalApproved: 85000,
    totalRejected: 3200,
    pendingCount: 4,
    teamSize: 12
  });

  const handleApprove = (id) => {
    const approved = pendingApprovals.find(req => req.id === id);
    setPendingApprovals(pendingApprovals.filter(req => req.id !== id));
    setStats({
      ...stats,
      pendingCount: stats.pendingCount - 1,
      totalPending: stats.totalPending - approved.amount
    });
    alert(`Expense approved and forwarded to CFO for final approval!`);
  };

  const handleReject = (id) => {
    const rejected = pendingApprovals.find(req => req.id === id);
    setPendingApprovals(pendingApprovals.filter(req => req.id !== id));
    setStats({
      ...stats,
      pendingCount: stats.pendingCount - 1,
      totalPending: stats.totalPending - rejected.amount
    });
    alert("Expense rejected!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Manager Panel</h2>
        <nav className="flex flex-col gap-2">
          <button
            className={`p-2 rounded text-left ${selectedTab === "pending" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedTab("pending")}
          >
            Pending Approvals
          </button>
          <button
            className={`p-2 rounded text-left ${selectedTab === "team" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => navigate("/manager/team-expenses")}
          >
            Team Expenses
          </button>
          <button className="p-2 rounded text-left hover:bg-gray-200">
            Team Reports
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
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingCount}</p>
              </div>
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Amount</p>
                <p className="text-xl font-bold text-yellow-600">₹{stats.totalPending.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-xl font-bold text-green-600">₹{stats.totalApproved.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-xl font-bold text-red-600">₹{stats.totalRejected.toLocaleString()}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Team Size</p>
                <p className="text-2xl font-bold text-blue-600">{stats.teamSize}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Approvals Table */}
        {selectedTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Expense Approvals</h2>
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
                  {pendingApprovals.length > 0 ? (
                    pendingApprovals.map((request) => (
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
                        No pending approvals at the moment.
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

export default ManagerDashboard;
