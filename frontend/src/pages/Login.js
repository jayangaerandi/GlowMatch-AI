import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5001/login",
        {
          email,
          password
        }
      );

      setMessage(response.data.message);

      if (response.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        console.log("USER:", response.data.user);
        console.log("TOKEN:", response.data.token);

        navigate("/");

      }

    } catch (error) {

      console.error(error);
      setMessage("Login Failed");

    }

  };

  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "400px",
        margin: "auto"
      }}
    >

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      {/* Password Field */}

      <div
        style={{
          position: "relative",
          width: "100%",
          marginBottom: "20px"
        }}
      >

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 50px 14px 15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        <span
          onClick={() =>
            setShowPassword(!showPassword)
          }
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "22px",
            userSelect: "none"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>

      </div>

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#ff4d94",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        Login
      </button>

      <p
        style={{
          marginTop: "20px",
          color: "red",
          textAlign: "center"
        }}
      >
        {message}
      </p>

    </div>

  );
}

export default Login;
