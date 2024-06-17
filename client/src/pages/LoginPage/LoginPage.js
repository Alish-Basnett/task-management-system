import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"; // Import Axios for HTTP requests
import "./LoginPage.css";

const LoginPage = ({ onClose, openSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Pro Manage - Login"; // Set your desired title here
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      // Check if response is defined and has data
      if (response && response.data) {
        console.log("Login response:", response.data);
        // Assuming successful login, you can close the popup or redirect
        onClose();
      } else {
        console.error("Empty response received");
        setErrorMessage("Empty response received"); // Example: Set an error message
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data || error.message); // Example: Set error message from API response or error message
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="popup-inner">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            placeholder="Username or Email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="btn login-btn">
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="forgot-password">
        <span className="link">Forgot Password?</span>
      </div>

      <p>
        Don't have an account?{" "}
        <span className="link" onClick={openSignup}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
