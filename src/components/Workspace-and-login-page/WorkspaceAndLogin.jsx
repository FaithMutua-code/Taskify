import React, { useState } from 'react';
import './Workspace.css';
import { motion } from 'framer-motion';

const Workspace = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Signup Data:', signupData);
    // Add signup logic here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    // Add login logic here
  };

  return (
    <motion.div
      className="workspace-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="workspace-card">
        {!showLogin ? (
          <form onSubmit={handleSignupSubmit} className="workspace-form">
            <h2>Create Workspace</h2>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={signupData.firstName}
              onChange={handleSignupChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={signupData.lastName}
              onChange={handleSignupChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />

            <button type="submit" className="workspace-button">
              Create Workspace
            </button>

            <p className="workspace-toggle">Already have an account?</p>
            <button
              type="button"
              className="workspace-button secondary"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="workspace-form">
            <h2>Login</h2>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button type="submit" className="workspace-button">
              Login
            </button>

            <p className="workspace-toggle">New here?</p>
            <button
              type="button"
              className="workspace-button secondary"
              onClick={() => setShowLogin(false)}
            >
              Create Workspace
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Workspace;
