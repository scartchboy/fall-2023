import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (password === '') {
      setPasswordError('Password is required');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {emailError && <p className="error-message">{emailError}</p>}
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="password-toggle" onClick={toggleShowPassword}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
