import React, { useEffect, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import { useDispatch } from 'react-redux';
import { setUser, selectUser, setQr } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user != null && user.isAdmin) {
      navigate('/admin-view')
    } else if (user != null) {
      navigate('/search-page')
    }
  }, [])

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
    const data = {
      email: email,
      password: password
    }

    axios({
      url: 'http://localhost:5000/v1/auth/user/login',
      method: 'POST',
      data: data,
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          if(!response.data.user.isVerfied){
            toast.error("Admin hasn't verified your account yet", {
              position : toast.POSITION.BOTTOM_LEFT
            })
          }
          dispatch(setUser(response.data.user))
          dispatch(setQr({
            QrCode : response.data.QrCode,
            code : response.data.code
          }))
          navigate('/two-auth')
          console.log("Successfully Login");
          toast.success('Logged In successfully', {
            position: toast.POSITION.BOTTOM_LEFT
          })
        } else {
          console.log("Error occured while loggin in", response.data.message);
          toast.error("Error occured while loggin in", {
            position: toast.POSITION.BOTTOM_LEFT
          })
        }
      }).catch(e => {
        toast.error("Error occured while loggin in", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      })

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
        <button className="signup-button" onClick={handleLogin}>
          Login
        </button>
        <pre>Don't have an account ? </pre>
        <Link to="/signup">
          <a>Sign Up</a>
        </Link>
        <pre>Having trouble recalling the password ? </pre>
        <Link to="/forgot-password">
          <a>Forgot Password</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;