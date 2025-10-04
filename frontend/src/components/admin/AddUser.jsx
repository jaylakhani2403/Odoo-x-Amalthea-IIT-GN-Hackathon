import { useState } from "react";

const AddUser = ({ onAdd }) => {
  const [user, setUser] = useState({ name: "", email: "", role: "employee" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email) return;
    onAdd(user);
    setUser({ name: "", email: "", role: "employee" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-2">
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="director">Director</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add User
      </button>
    </form>
  );
};

export default AddUser;
