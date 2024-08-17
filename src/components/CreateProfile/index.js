import React, { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";

import "./index.css";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = Cookies.get("id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://todo-app-10-01f7.onrender.com/user-profiles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profile_id: uuidv4(),
            user_id: userId,
            name,
            bio,
            contact_info: contactInfo,
            created_at: "2024-8-16",
            updated_at: "2024-8-16",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Redirect to the home page after profile creation
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-profile-container">
      <h2 className="title">Create Profile</h2>
      <form onSubmit={handleSubmit} className="create-profile-form">
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Create Profile"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CreateProfile;
