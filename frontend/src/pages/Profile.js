import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Show / Hide Password
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {

    if (user?.email) {

      fetchProfile();

    } else {

      setLoading(false);

    }

  }, [user]);

  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(

        `${API}/profile/${user.email}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setProfile(response.data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  const changePassword = async () => {

    if (
      newPassword !== confirmPassword
    ) {

      setPasswordMessage(
        "Passwords do not match."
      );

      return;

    }

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.post(

        `${API}/change-password`,

        {

          email: user.email,

          current_password:
            currentPassword,

          new_password:
            newPassword

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

      setPasswordMessage(
        response.data.message
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    }

    catch (error) {

      console.error(error);

      setPasswordMessage(
        "Password update failed."
      );

    }

  };

  // Password Strength

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

  const strength =
    getPasswordStrength();

  if (!user) {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#FFE8F3 0%,#F7E8FF 50%,#EEF5FF 100%)",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              background:
                "linear-gradient(90deg,#ff4d8d,#9b5cff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            👤 My Profile
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#555",
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "20px auto",
            }}
          >
            Your GlowMatch AI Profile securely stores your personal information,
            beauty insights, AI consultation statistics, and account settings.
            You can also update your password to keep your account safe.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>👤</div>

            <h3>Personal Information</h3>

            <p>
              View and manage your account details and registered email address.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>📊</div>

            <h3>Beauty Insights</h3>

            <p>
              Track your AI skin analyses, beauty reports, and consultation
              statistics.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>🔒</div>

            <h3>Account Security</h3>

            <p>
              Change your password anytime to keep your GlowMatch AI account
              secure.
            </p>
          </div>

        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "25px",
            padding: "35px",
            textAlign: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,.1)",
          }}
        >

          <h2 style={{ color: "#ff4d8d" }}>
            🔒 Login Required
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#666",
              lineHeight: "1.7",
            }}
          >
            Please log in to access your profile, manage your account, view your
            beauty insights, and update your security settings.
          </p>

        </div>

      </div>

    </div>

  );

}

  if (loading) {

    return (

      <div style={{ padding: "40px" }}>

        <h2>

          Loading Profile...

        </h2>

      </div>

    );

  }

  return (

    <div
  style={{
    minHeight: "100vh",
    maxWidth: "850px",
    margin: "0 auto",
    padding: "40px",
    background:
      "linear-gradient(135deg,#FFE8F3 0%,#F7E8FF 50%,#EEF5FF 100%)",
    fontFamily: "Arial, sans-serif",
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
      fontSize: "40px",
      marginBottom: "12px",
      background:
        "linear-gradient(90deg,#ff4d8d,#9b5cff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bold",
    }}
  >
    👤 My GlowMatch Profile
  </h1>

  <p
    style={{
      fontSize: "18px",
      color: "#666",
      marginBottom: "5px",
    }}
  >
    Welcome back,
    <strong style={{ color: "#ff4d8d" }}>
      {" "}{profile?.name || user.name}
    </strong>
  </p>

  <p
    style={{
      color: "#777",
      fontSize: "15px",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    }}
  >
    Manage your account, view your beauty insights, and keep your GlowMatch AI profile secure.
  </p>
</div>

      <div

        style={{

          background: "rgba(255,255,255,0.82)",
          
          backdropFilter: "blur(12px)",

          padding: "30px",

          borderRadius: "18px",

          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)"

        }}

      >

        <p>

          <strong>Name:</strong>{" "}

          {profile?.name}

        </p>

        <p>

          <strong>Email:</strong>{" "}

          {profile?.email}

        </p>

        <hr />

        <h2
         style={{
         color: "#ff4d8d",
          marginBottom: "15px",
        }}
        >
          📊 Beauty Insights
        </h2>

        <p>

          <strong>Total Analyses:</strong>{" "}

          {profile?.total_analyses || 0}

        </p>

        <p>

          <strong>Total AI Consultations:</strong>{" "}

          {profile?.total_chats || 0}

        </p>

        <hr />

        <h2
        style={{
        color: "#9b5cff",
        marginBottom: "20px",
        }}
        >
          🔒 Change Password
        </h2>

        {/* Current Password */}

        <div

          style={{

            position: "relative",

            marginBottom: "20px"

          }}

        >

          <input

            type={
              showCurrent
                ? "text"
                : "password"
            }

            placeholder="Current Password"

            value={currentPassword}

            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }

            style={inputStyle}

          />

          <span

            onClick={() =>
              setShowCurrent(
                !showCurrent
              )
            }

            style={eyeStyle}

          >

            {showCurrent ? "🙈" : "👁️"}

          </span>

        </div>

        {/* New Password */}

        <div

          style={{

            position: "relative",

            marginBottom: "10px"

          }}

        >

          <input

            type={
              showNew
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
              setShowNew(
                !showNew
              )
            }

            style={eyeStyle}

          >

            {showNew ? "🙈" : "👁️"}

          </span>

        </div>

        <p

          style={{

            color: strength.color,

            fontWeight: "bold",

            marginBottom: "15px"

          }}

        >

          Password Strength:

          {" "}

          {strength.text}

        </p>

        <div

          style={{

            background: "#fff6fb",

            padding: "15px",

            borderRadius: "10px",

            marginBottom: "20px",

            fontSize: "14px"

          }}

        >

          <b>

            Password must contain:

          </b>

          <ul>

            <li>

              Minimum 8 characters

            </li>

            <li>

              One uppercase letter

            </li>

            <li>

              One number

            </li>

            <li>

              Special character recommended

            </li>

          </ul>

        </div>

        {/* Confirm Password */}

        <div

          style={{

            position: "relative",

            marginBottom: "20px"

          }}

        >

          <input

            type={
              showConfirm
                ? "text"
                : "password"
            }

            placeholder="Confirm New Password"

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
              setShowConfirm(
                !showConfirm
              )
            }

            style={eyeStyle}

          >

            {showConfirm ? "🙈" : "👁️"}

          </span>

        </div>

        <button

          onClick={changePassword}

          style={buttonStyle}

        >

          🔑 Change Password

        </button>

        <p

          style={{

            marginTop: "20px",

            color:

              passwordMessage ===
              "Password changed successfully"

                ? "green"

                : "red",

            fontWeight: "bold"

          }}

        >

          {passwordMessage}

        </p>

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

  padding: "15px",

  background:
    "linear-gradient(135deg,#ff85c0,#ff4d94)",

  color: "white",

  border: "none",

  borderRadius: "10px",

  fontSize: "17px",

  fontWeight: "bold",

  cursor: "pointer"

};

const cardStyle = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(12px)",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,.1)",
};

export default Profile;
