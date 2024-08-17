import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const id = uuidv4();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://todo-app-10-01f7.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, username, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseData(data);
      if (Cookies.get("id") !== undefined) {
        Cookies.remove("id");
      }
      Cookies.set("id", id, { expires: 30 });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h2 className="title">Sign Up</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {responseData && (
        <div className="success-message">{responseData.message}</div>
      )}
    </div>
  );
};

export default SignIn;
