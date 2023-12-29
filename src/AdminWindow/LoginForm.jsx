// LoginForm.js
import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [buttonPosition, setButtonPosition] = useState("normal");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonPosition("normal"); // Reset button position when user starts typing
  };

  const handleMouseEnter = () => {
    if (!(formData.name && formData.email)) {
      setButtonPosition("away");
    }
  };
  const handleMouseLeave = () => {
    setButtonPosition("normal");
  };

  const handleSubmit = async (e) => {
    if (!formData.name && !formData.email) {
      alert("Please fill in both name and email fields.");
      return;
    }
    e.preventDefault();
    // Check if both name and email are filled

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin-login",formData
      );
      if (response.data.success) {
        navigate("/allusers");
      } else {
        alert("Invalid credentials. Please complete the form first.");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${buttonPosition}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
