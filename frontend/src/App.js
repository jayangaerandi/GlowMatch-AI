import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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
            padding: "20px",
            background: "#f5d0e6",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >

          <Link to="/">Home</Link>

          <Link to="/upload">Upload</Link>

          <Link to="/history">History</Link>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/chatbot">Chatbot</Link>

          <Link to="/chat-history">Chat History</Link>

          <Link to="/profile">Profile</Link>

          <Link to="/favorites">Favorites</Link>

          {!user && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span
                style={{
                  marginLeft: "auto",
                  fontWeight: "bold"
                }}
              >
                Welcome, {user.name}
              </span>

              <span
                style={{
                  color: "#555",
                  fontSize: "14px"
                }}
              >
                ({user.email})
              </span>

              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#ff6b81",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Logout
              </button>
            </>
          )}

        </nav>

        <div style={{ padding: "20px" }}>

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

export default App;