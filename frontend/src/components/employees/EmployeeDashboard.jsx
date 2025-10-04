import { useState } from "react";
import { UserCircle, LogOut, PlusCircle } from "lucide-react";

const EmployeeDashboard = ({ onLogout }) => {
  const [user] = useState({
    name: "John Doe",
    email: "john.dojjsje@example.com",
    role: "Employee",
  });

  const [expense, setExpense] = useState({
    fromDate: "",
    toDate: "",
    amount: "",
    currency: "INR",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleLogout = () => {
    onLogout();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setExpense({ ...expense, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Submitted:", expense);
    alert("Expense submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">
          Employee Panel
        </h2>
        <nav className="space-y-3">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Submit Expense
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Expense History
          </a>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Employee Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PlusCircle className="w-5 h-5 mr-2 text-blue-600" /> Submit New
              Expense
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={expense.fromDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={expense.toDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={expense.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={expense.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={expense.description}
                  onChange={handleChange}
                  placeholder="Describe the expense..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Receipt
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 rounded-lg shadow-md w-40 h-40 object-cover"
                  />
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Submit Expense
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
