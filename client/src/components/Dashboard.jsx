// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const viewUserProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstname} {user.lastname} - {user.email}
            <button onClick={() => viewUserProfile(user._id)}>
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
