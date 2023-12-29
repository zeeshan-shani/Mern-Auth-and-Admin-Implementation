import axios from "axios";
import React, { useState, useEffect } from "react";
import "./UserForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobDescription: "",
    selectedDate: new Date(),
  });
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); // State to control the display of the AdminPopup

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-all-users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, selectedDate: date });
  };
  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/save-user", formData);
      setFormData({
        name: "",
        email: "",
        jobDescription: "",
        selectedDate: new Date(),
      });
      alert("User information saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving user information. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-user/${userId}`);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting user. Please try again.");
    }
  };

  // Function to handle the Admin button click
  const handleAdminClick = () => {
    navigate('/loginform');
  };

  return (
    <div className="user-form-container">
      <h1 className="form-title">MERN Email App</h1>

      <form onSubmit={handleSubmit} className="user-form">
        {/* ... (previous form fields) */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Describe your job"
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectedDate">Date and Time:</label>
          <DatePicker
            selected={formData.selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {/* <button onClick={handleShowUsers} className="show-users-button">
        Show All Users
      </button> */}

      <button target="blank" onClick={handleAdminClick} className="show-users-button">
        Admin
      </button>

      {showUsers && (
        <div className="user-list-container">
          <h2 className="user-list-title">All Users</h2>
          <ul className="user-list">
            {users.map((user) => (
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
      )}
    </div>
  );
};

export default UserForm;
