import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import AddUser from "./AddUser";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("users");

  const handleAddUser = async (user) => {
    const payload = {
      username: user.name,
      email: user.email,
      password: "1234", // default password
      role: user.role,
      country: "India",
      companyName: "odoo", // fix typo: campanyName → companyName
    };

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8087';
    try {
      const response = await fetch(`${baseUrl}/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Failed: ${response.status}`);

      const data = await response.json();

      // Add returned user or fallback to frontend-only user
      setUsers([...users, { ...user, id: data.id || Date.now(), status: "active" }]);
      alert("User added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <button
            className={`p-2 rounded ${selectedTab === "users" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedTab("users")}
          >
            Users
          </button>
          <button
            className={`p-2 rounded ${selectedTab === "requests" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedTab("requests")}
          >
            Requests
          </button>
          <button className="p-2 rounded hover:bg-gray-200">Reports</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div>
            <span className="mr-4">Admin</span>
            <button 
              onClick={() => dispatch(logout())}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs Content */}
        {selectedTab === "users" && (
          <div className="grid grid-cols-2 gap-6">
            {/* Add User */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Add New User</h2>
              <AddUser onAdd={handleAddUser} />
            </div>

            {/* Users List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Users List</h2>
              <table className="min-w-full bg-white shadow-md rounded">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Role</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="text-center">
                        <td className="py-2 px-4 border">{user.id}</td>
                        <td className="py-2 px-4 border">{user.name}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                        <td className="py-2 px-4 border capitalize">{user.role}</td>
                        <td className="py-2 px-4 border">{user.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No users added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "requests" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Requests Flow</h2>
            <p className="text-gray-600">Manage approvals for employee requests here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
