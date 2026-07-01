console.log("API =", API);

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleReset = async () => {

    if (newPassword !== confirmPassword) {

      setMessage("Passwords do not match");

      return;

    }

    try {

      const response = await axios.post(

        `${API}/forgot-password`,

        {

          email,

          new_password: newPassword

        }

      );

      setMessage(response.data.message);

      setNewPassword("");

      setConfirmPassword("");

    }

    catch (error) {

  console.error(error);

  console.log(error.response);

  if (error.response) {
    setMessage(error.response.data.message);
  } else {
    setMessage(error.message);
  }

}

  };

  const getPasswordStrength = () => {

    if (newPassword.length < 6)

      return {

        text: "Weak",

        color: "red"

      };

    if (

      /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(
        newPassword
      )

    )

      return {

        text: "Strong",

        color: "green"

      };

    return {

      text: "Medium",

      color: "orange"

    };

  };

  const strength = getPasswordStrength();

  return (

    <div

      style={{

        maxWidth: "450px",

        margin: "50px auto",

        background: "#fff",

        padding: "35px",

        borderRadius: "18px",

        boxShadow: "0 8px 20px rgba(0,0,0,0.12)"

      }}

    >

      <h1

        style={{

          textAlign: "center",

          color: "#ff4d94",

          marginBottom: "30px"

        }}

      >

        🔑 Forgot Password

      </h1>

      {/* Email */}

      <input

        type="email"

        placeholder="Registered Email"

        value={email}

        onChange={(e) =>

          setEmail(e.target.value)

        }

        style={inputStyle}

      />

      {/* New Password */}

      <div

        style={{

          position: "relative",

          marginTop: "20px"

        }}

      >

        <input

          type={
            showNewPassword
              ? "text"
              : "password"
          }

          placeholder="New Password"

          value={newPassword}

          onChange={(e) =>

            setNewPassword(

              e.target.value

            )

          }

          style={inputStyle}

        />

        <span

          onClick={() =>

            setShowNewPassword(

              !showNewPassword

            )

          }

          style={eyeStyle}

        >

          {showNewPassword ? "🙈" : "👁️"}

        </span>

      </div>

      <p

        style={{

          color: strength.color,

          fontWeight: "bold",

          marginTop: "10px"

        }}

      >

        Password Strength: {strength.text}

      </p>

      {/* Password Rules */}

      <div

        style={{

          background: "#fff6fb",

          padding: "15px",

          borderRadius: "10px",

          marginTop: "15px",

          fontSize: "14px"

        }}

      >

        <b>Password must contain:</b>

        <ul>

          <li>Minimum 8 characters</li>

          <li>One uppercase letter</li>

          <li>One number</li>

          <li>Special character recommended</li>

        </ul>

      </div>

      {/* Confirm Password */}

      <div

        style={{

          position: "relative",

          marginTop: "20px"

        }}

      >

        <input

          type={
            showConfirmPassword
              ? "text"
              : "password"
          }

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>

            setConfirmPassword(

              e.target.value

            )

          }

          style={inputStyle}

        />

        <span

          onClick={() =>

            setShowConfirmPassword(

              !showConfirmPassword

            )

          }

          style={eyeStyle}

        >

          {showConfirmPassword ? "🙈" : "👁️"}

        </span>

      </div>

      <button

        onClick={handleReset}

        style={buttonStyle}

      >

        Reset Password

      </button>

      <p

        style={{

          marginTop: "20px",

          textAlign: "center",

          color:

            message ===
            "Password updated successfully"

              ? "green"

              : "red",

          fontWeight: "bold"

        }}

      >

        {message}

      </p>

      <hr

        style={{

          margin: "30px 0"

        }}

      />

      <p

        style={{

          textAlign: "center"

        }}

      >

        Remember your password?

      </p>

      <div

        style={{

          textAlign: "center"

        }}

      >

        <Link

          to="/login"

          style={{

            textDecoration: "none",

            color: "#ff4d94",

            fontWeight: "bold"

          }}

        >

          Back to Login

        </Link>

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

export default ForgotPassword;