import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateProfile from "./components/CreateProfile";
import CreateTodo from "./components/CreateTodo";
import Notfound from "./components/Notfound";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/create-profile" element={<CreateProfile />} />
      <Route exact path="/create-todo" element={<CreateTodo />} />
      <Route path="/not-found" element={<Notfound />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
