import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatHistory from "./pages/ChatHistory";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import ForgotPassword from "./pages/ForgotPassword";


function App() {

  document.body.style.margin = "0";
  document.body.style.overflowX = "hidden";

  const [menuOpen, setMenuOpen] = useState(false);

const [isMobile, setIsMobile] = useState(
  window.innerWidth <= 768
);

useEffect(() => {

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener("resize", handleResize);

}, []);

  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  const currentUser = admin || user;

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.reload();
  };

  return (

    <Router>

      <div>

        <nav
  style={{
    background:
      "linear-gradient(135deg,#ff4d8d,#9b5cff)",
    padding: "15px 25px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 999,
    boxShadow: "0 4px 15px rgba(0,0,0,.15)",
    width: "100%",
    boxSizing: "border-box",
    overflowX: "hidden"
  }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >

    <h2
      style={{
        margin: 0
      }}
    >
      ✨ GlowMatch AI
    </h2>

    {isMobile && (

      <button
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "28px",
          cursor: "pointer"
        }}
      >
        ☰
      </button>

    )}

  </div>

  {(!isMobile || menuOpen) && (

    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "15px",
        marginTop: "15px",
        alignItems: isMobile ? "flex-start" : "center"
      }}
    >

      <Link style={linkStyle} to="/">Home</Link>

      <Link style={linkStyle} to="/upload">Upload</Link>

      <Link style={linkStyle} to="/history">History</Link>

      <Link style={linkStyle} to="/dashboard">Dashboard</Link>

      <Link style={linkStyle} to="/chatbot">Chatbot</Link>

      <Link style={linkStyle} to="/chat-history">Chat History</Link>

      <Link style={linkStyle} to="/favorites">Favorites</Link>

      <Link style={linkStyle} to="/profile">Profile</Link>

      {!user && (
        <>
          <Link style={linkStyle} to="/login">Login</Link>

          <Link style={linkStyle} to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <span>
            👤 {user.name}
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              border: "none",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#ff4d8d",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </>
      )}

    </div>

  )}

</nav>

        <div
  style={{
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "15px"
  }}
>

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/upload"
              element={<Upload />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/chatbot"
              element={<Chatbot />}
            />

            <Route
              path="/chat-history"
              element={<ChatHistory />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword/>}
            /> 

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin-users"
              element={<AdminUsers />}
            />

          </Routes>

        </div>

      </div>

    </Router>

  );
}

const linkStyle = {

  color: "white",

  textDecoration: "none",

  fontWeight: "bold",

  fontSize: "16px"

};

export default App;