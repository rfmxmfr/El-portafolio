import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = ({ onClose }) => {
  const { login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-content">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-login-buttons">
            <button type="submit" className="admin-button">Login</button>
            <button type="button" onClick={onClose} className="admin-button secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
