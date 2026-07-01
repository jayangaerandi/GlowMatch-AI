import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        `${API}/register`,
        {
          name,
          email,
          password
        }
      );

      setMessage(
        response.data.message
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Registration Failed"
      );

    }
  };

  return (

  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#FFE8F3 0%,#F7E8FF 50%,#EEF5FF 100%)",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    }}
  >

    <div
      style={{
        width: "100%",
        maxWidth: "450px",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(12px)",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
            background:
              "linear-gradient(90deg,#ff4d8d,#9b5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          ✨ Create Account
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Join GlowMatch AI and discover
          <br />
          personalized beauty recommendations.
        </p>
      </div>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={inputStyle}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={inputStyle}
      />

      <br />
      <br />

      <div
       style={{
       position: "relative",
      }}
      >
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
        ...inputStyle,
        paddingRight: "50px",
        }}
      />
  

      <span
      onClick={() =>
      setShowPassword(!showPassword)
      }
       style={eyeStyle}
      >
      {showPassword ? "🙈" : "👁️"}
      </span>
      </div>



      <button
        onClick={handleRegister}
        style={buttonStyle}
      >
        Create Account
      </button>

            <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
          color:
            message === "Registration Successful"
              ? "green"
              : "#ff4d4f",
        }}
      >
        {message}
      </p>

    </div>

  </div>

  );

}

const inputStyle = {
  width: "100%",
  padding: "14px 15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const eyeStyle = {
  position: "absolute",
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "22px",
  userSelect: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(135deg,#ff85c0,#ff4d94)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;