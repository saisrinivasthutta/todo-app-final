import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

import "./index.css";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      todo_id: uuidv4(),
      user_id: Cookies.get("id"),
      title,
      description,
      status,
    };

    try {
      const response = await fetch(
        "https://todo-app-10-01f7.onrender.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Todo created:", data);

      // Navigate back to the home page after successful creation
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error creating todo:", err.message);
    }
  };

  return (
    <div className="create-todo-container">
      <form onSubmit={handleSubmit} className="create-todo-form">
        <h2 className="title">Create New Todo</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
