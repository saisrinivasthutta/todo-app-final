import React, { useEffect, useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);
  const navigate = useNavigate();
  const id = Cookies.get("id");
  console.log(id);

  const fetchUserProfile = useCallback(async () => {
    try {
      const url = `https://todo-app-10-01f7.onrender.com/user-profiles/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data !== undefined) {
        setNoUserFound(false);
        setUser(data);
        console.log(user);
      }
    } catch (err) {
      setNoUserFound(true);
      console.error("Error fetching user profile:", err.message);
    }
  }, [id]);

  const fetchTodos = useCallback(async () => {
    try {
      const url = `https://todo-app-10-01f7.onrender.com/todos/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  }, [id]);

  const memoizedUser = useMemo(() => user, [user]);
  const memoizedTodos = useMemo(() => todos, [todos]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    console.log("User data updated:", memoizedUser);
  }, [memoizedUser]);

  useEffect(() => {
    console.log("Todos data updated:", memoizedTodos);
  }, [memoizedTodos]);

  const handleLogout = () => {
    Cookies.remove("is_logged_in");
    navigate("/login", { replace: true });
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleCreateProfile = () => {
    navigate("/create-profile", { replace: true });
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const url = `https://todo-app-10-01f7.onrender.com/todos/${todoId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedTodos = todos.filter((todo) => todo.todo_id !== todoId);
      setTodos(updatedTodos);
      console.log("Todo deleted:", todoId);
    } catch (err) {
      console.log(todoId);
      console.error("Error deleting todo:", err.message);
    }
  };

  const handleCreateTodo = () => {
    navigate("/create-todo", { replace: true });
  };

  const handleUpdateTodo = async (todoId) => {
    try {
      const url = `https://todo-app-10-01f7.onrender.com/todos/${todoId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }), // Update the status as needed
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedTodos = todos.map((todo) =>
        todo.todo_id === todoId ? { ...todo, status: "Completed" } : todo
      );
      setTodos(updatedTodos);
      console.log("Todo updated:", todoId);
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const isLoggedIn = () => {
    if (Cookies.get("is_logged_in") === undefined) {
      navigate("/login", { replace: true });
    }
    return;
  };

  useEffect(() => isLoggedIn());

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <img
            className="logo-img"
            src="https://tse2.mm.bing.net/th?id=OIP.sGvrbMLAGx0ekmo6PYRNJAHaHa&pid=Api&P=0&h=180"
            alt="Todo App Logo"
          />
        </div>
        <div className="profile-logout">
          <button onClick={toggleProfile}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      {showProfile && (
        <div className="profile-container">
          {noUserFound ? (
            <div className="create-profile">
              <h2>No User Profile Found</h2>
              <button onClick={handleCreateProfile}>Create Profile</button>
            </div>
          ) : (
            <div className="profile-details">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-File.png"
                alt="profile-logo"
                className="profile-logo"
              />
              {user && (
                <div>
                  <p>Name: {user.name}</p>
                  <p>Bio: {user.bio}</p>
                  <p>Contact Info: {user.contact_info}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="todos-list">
        <h2 className="title">Todos</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.todo_id}>
              <div className="todo-item">
                <div>
                  <h3>{todo.title}</h3>
                  <p>Description: {todo.description}</p>
                  <p>Status: {todo.status}</p>
                  <p>Created At: {todo.created_at}</p>
                </div>
                <div className="delete-update">
                  <button onClick={() => handleDeleteTodo(todo.todo_id)}>
                    <img
                      className="delete-img"
                      src="http://www.clker.com/cliparts/L/8/M/t/O/G/delete-button-blue-hi.png"
                      alt="delete-todo"
                    />
                  </button>
                  <button onClick={() => handleUpdateTodo(todo.todo_id)}>
                    <img
                      className="delete-img"
                      src="https://freepngimg.com/download/update_button/25530-9-update-button-image.png"
                      alt="update-todo"
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="create-todo">
          <button className="create-todo-button" onClick={handleCreateTodo}>
            Create New Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
