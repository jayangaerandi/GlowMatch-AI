import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async () => {

    try {

      const response = await axios.post(
        `${API}/admin-login`,
        {
          email,
          password
        }
      );

      if (response.data.success) {

        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        navigate("/admin-dashboard");

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Admin Login Failed");

    }
  };

  return (

    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px"
      }}
    >

      <h2>👨‍💼 Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={loginAdmin}
        style={buttonStyle}
      >
        Login
      </button>

    </div>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#722ed1",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminLogin;