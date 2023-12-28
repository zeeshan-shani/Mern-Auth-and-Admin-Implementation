import React, { useState } from 'react';
import axios from 'axios';

const AdminPopup = ({ onClose, onLogin }) => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin-login', adminData);
      if (response.data.success) {
        onLogin(); // Callback to handle successful login
        onClose(); // Close the popup
      } else {
        alert('Invalid credentials. Please complete the form first.');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="admin-popup">
      <h2>Admin Login</h2>
      <label>
        Enter Name:
        <input type="text" name="name" value={adminData.name} onChange={handleChange} />
      </label>
      <label>
        Enter Email:
        <input type="email" name="email" value={adminData.email} onChange={handleChange} />
      </label>
      <button onClick={handleLogin}>Login</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AdminPopup;