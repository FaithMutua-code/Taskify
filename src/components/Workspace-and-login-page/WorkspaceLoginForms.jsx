import React, { useState } from 'react';
import './Workspace.css';  // Make sure this file exists and contains your CSS
import { motion } from 'framer-motion';

const WorkspaceLoginForms = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '', // Avatar image data
    role:'',
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignupData({ ...signupData, avatar: reader.result });
      };
      reader.readAsDataURL(file); // Convert image to data URL and store it in the state
    }
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

            <div className="avatar-container">
              <div className="avatar-slot">
                {signupData.avatar ? (
                  <img
                    src={signupData.avatar} // Display uploaded avatar if available
                    alt="Avatar"
                    className="avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">+</div> // Placeholder for empty state
                )}
              </div>
              <span className="change-avatar">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                  id="avatarInput"
                />
                <label htmlFor="avatarInput">Change</label>
              </span>
            </div>

            <div className="name-fields">
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
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
          
            <label htmlFor="role">What best describes what you do?</label>
            <input
            type="text"
            name="role"
            placeholder="e.g. Developer"
            value={signupData.role}
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

export default WorkspaceLoginForms;
