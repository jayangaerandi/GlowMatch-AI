import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        `${API}/login`,

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

    }

    catch (error) {

      console.error(error);

      setMessage("Login Failed");

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
      padding: "40px",
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(12px)",
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
    ✨ Welcome Back
  </h1>

  <p
    style={{
      color: "#666",
      fontSize: "16px",
      lineHeight: "1.6",
    }}
  >
    Sign in to access your personalized
    <br />
    GlowMatch AI beauty experience.
  </p>
</div>

      {/* Email */}

      <input

        type="email"

        placeholder="Email Address"

        value={email}

        onChange={(e) =>

          setEmail(e.target.value)

        }

        style={inputStyle}

      />

      {/* Password */}

      <div

        style={{

          position: "relative",

          marginTop: "20px"

        }}

      >

        <input

          type={

            showPassword

              ? "text"

              : "password"

          }

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(

              e.target.value

            )

          }

          style={inputStyle}

        />

        <span

          onClick={() =>

            setShowPassword(

              !showPassword

            )

          }

          style={eyeStyle}

        >

          {showPassword ? "🙈" : "👁️"}

        </span>

      </div>

      {/* Forgot Password */}

      <div

        style={{

          textAlign: "right",

          marginTop: "10px"

        }}

      >

        <Link

          to="/forgot-password"

          style={{

            textDecoration: "none",

            color: "#ff4d94",

            fontWeight: "bold",

            fontSize: "14px"

          }}

        >

          Forgot Password?

        </Link>

      </div>

      {/* Login Button */}

      <button

        onClick={handleLogin}

        style={buttonStyle}

      >

        Login

      </button>

      {/* Message */}

      <p
       style={{
       textAlign: "center",
       color:
      message === "Login Successful"
        ? "green"
        : "#ff4d4f",
      fontWeight: "bold",
      marginTop: "20px",
      }}
      >

        {message}

      </p>

      <hr

        style={{

          margin: "30px 0"

        }}

      />

      {/* Register */}

      <p

        style={{

          textAlign: "center"

        }}

      >

        Don't have an account?

      </p>

      <div

        style={{

          textAlign: "center"

        }}

      >

        <Link

          to="/register"

          style={{

            textDecoration: "none",

            color: "#ff4d94",

            fontWeight: "bold"

          }}

        >

          Create an Account

        </Link>

      </div>

    </div>
    </div>

  );  

}

const inputStyle = {

  width: "100%",

  padding: "14px 50px 14px 15px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "16px",

  outline: "none",

  boxSizing: "border-box"

};

const eyeStyle = {

  position: "absolute",

  right: "15px",

  top: "50%",

  transform: "translateY(-50%)",

  cursor: "pointer",

  fontSize: "22px",

  userSelect: "none"

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

  cursor: "pointer"

};

export default Login;