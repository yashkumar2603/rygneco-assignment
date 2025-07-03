import React, { useState } from 'react';
import { setUsername } from '../utils/localStorage';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim());
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUser(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
