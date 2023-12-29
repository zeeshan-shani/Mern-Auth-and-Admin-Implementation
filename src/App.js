// src/App.js

import React from 'react';
import UserForm from './UserForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./AdminWindow/LoginForm";
import AllUsers from "./AdminWindow/AllUsers";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/allusers" element={<AllUsers />} />
    </Routes>
  </Router>
  );
}

export default App;
