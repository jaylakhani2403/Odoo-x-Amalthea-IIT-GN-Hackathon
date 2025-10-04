// src/components/Navbar.jsx
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  if (!user) return null;

  const baseLinks = [{ name: "Home", path: "/" }];

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Approval Rules", path: "/admin/rules" },
    { name: "All Expenses", path: "/admin/expenses" },
  ];

  const managerLinks = [
    { name: "Team Expenses", path: "/manager/team" },
    { name: "Pending Approvals", path: "/manager/approvals" },
  ];

  const employeeLinks = [
    { name: "Submit Expense", path: "/employee/submit" },
    { name: "Expense History", path: "/employee/history" },
  ];

  let linksToShow = baseLinks;
  if (user.role === "Admin") linksToShow = [...baseLinks, ...adminLinks];
  else if (user.role === "Manager") linksToShow = [...baseLinks, ...managerLinks];
  else if (user.role === "Employee") linksToShow = [...baseLinks, ...employeeLinks];

  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
      <div className="font-bold text-xl">Expense Manager</div>
      <div className="flex gap-4">
        {linksToShow.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:bg-blue-500 px-3 py-2 rounded-md"
          >
            {link.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
