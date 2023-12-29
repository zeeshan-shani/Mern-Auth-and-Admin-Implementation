import { React, useState,useEffect } from "react";
import axios from "axios";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-all-users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-user/${userId}`);
      fetchUsers();
      alert("user deleted successfuly!");
    } catch (error) {
      console.log(error);
      alert("Error deleting user. Please try again.");
    }
  };
  return (
    <div>
      <div className="user-list-container">
        <h2 className="user-list-title">All Users</h2>
        <ul className="user-list">
          {users?.map((user) => (
            <li key={user._id} className="user-item">
              <strong>{user.name}</strong> - {user.email} -{" "}
              {user.jobDescription} - {user.selectedDate}
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers;
