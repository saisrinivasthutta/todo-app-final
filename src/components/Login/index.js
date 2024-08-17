import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://todo-app-10-01f7.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle successful login
      Cookies.set("is_logged_in", true, { expires: 30 });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in");
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h2 className="title">Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="sign-up-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
