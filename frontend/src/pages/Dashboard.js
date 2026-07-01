import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/user-dashboard/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        textAlign: "center",
        marginBottom: "50px",
      }}
    >
      <h1
        style={{
          fontSize: "46px",
          background:
            "linear-gradient(90deg,#ff4d8d,#9b5cff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ✨ Welcome to GlowMatch AI
      </h1>

      <p
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          fontSize: "18px",
          color: "#555",
          lineHeight: "1.8",
        }}
      >
        GlowMatch AI is an intelligent beauty assistant designed to help you
        discover the perfect makeup products based on your unique skin tone.
        Upload your selfie, receive AI-powered skin analysis, personalized
        skincare advice, beauty consultations, and product recommendations
        tailored just for you.
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "25px",
      }}
    >
      <div style={cardStyle}>
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
          alt="Skin Analysis"
          style={imageStyle}
        />

        <h3>🤖 AI Skin Analysis</h3>

        <p>
          Detect your skin tone and receive personalized beauty
          recommendations within seconds.
        </p>
      </div>

      <div style={cardStyle}>
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
          alt="Makeup"
          style={imageStyle}
        />

        <h3>💄 Makeup Recommendations</h3>

        <p>
          Get AI-selected foundations, lipsticks, and blush products that
          perfectly complement your skin tone.
        </p>
      </div>

      <div style={cardStyle}>
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500"
          alt="Beauty Assistant"
          style={imageStyle}
        />

        <h3>💬 Beauty Assistant</h3>

        <p>
          Chat with GlowMatch AI to receive expert skincare routines,
          beauty tips, and makeup advice anytime.
        </p>
      </div>
    </div>

    <div
      style={{
        marginTop: "60px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#ff4d8d" }}>
        🔐 Login to Unlock Your Personalized Dashboard
      </h2>

      <p
        style={{
          color: "#666",
          fontSize: "17px",
        }}
      >
        View your analysis history, favorite products, AI consultations,
        beauty insights, and download professional beauty reports.
      </p>
    </div>
  </div>
);
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>✨ GlowMatch AI Dashboard</h1>
        <p>
          Welcome back,
          <span style={{ color: "#ff4d8d", fontWeight: "bold" }}>
            {" "}
            {user.name}
          </span>
        </p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <span style={styles.icon}>📊</span>
          <h3>Total Analyses</h3>
          <h1>{stats?.total || 0}</h1>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🤍</span>
          <h3>Fair Skin</h3>
          <h1>{stats?.fair || 0}</h1>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🌸</span>
          <h3>Medium Skin</h3>
          <h1>{stats?.medium || 0}</h1>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>☀️</span>
          <h3>Tan Skin</h3>
          <h1>{stats?.tan || 0}</h1>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>🟤</span>
          <h3>Deep Skin</h3>
          <h1>{stats?.deep || 0}</h1>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "15px",
  marginBottom: "15px",
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg, #ffe6f2 0%, #f7d9ff 50%, #e7f0ff 100%)",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    transition: "0.3s",
    cursor: "pointer",
  },

  icon: {
    fontSize: "45px",
    display: "block",
    marginBottom: "15px",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#ffe6f2,#f7d9ff,#e7f0ff)",
    fontFamily: "Arial",
  },
};

export default Dashboard;