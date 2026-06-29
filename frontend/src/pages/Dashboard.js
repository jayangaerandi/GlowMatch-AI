import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }

  }, []);

  const fetchStats = async () => {

  try {

    const token =
      localStorage.getItem("token");

      console.log("TOKEN =", token);

    const response = await axios.get(

      `http://127.0.0.1:5001/user-dashboard/${user.email}`,

      {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    setStats(response.data);

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

  } finally {

    setLoading(false);

  }
};

  if (!user) {

    return (

      <div
        style={{
          padding: "40px",
          textAlign: "center"
        }}
      >

        <h2>
          GlowMatch AI Dashboard
        </h2>

        <p>
          Please login to view your dashboard.
        </p>

      </div>

    );
  }

  if (loading) {

    return (

      <div
        style={{
          padding: "40px"
        }}
      >

        <h2>
          GlowMatch AI Dashboard
        </h2>

        <p>
          Loading Dashboard...
        </p>

      </div>

    );
  }

  return (

    <div style={{ padding: "20px" }}>

      <h2>
        GlowMatch AI Dashboard
      </h2>

      <p>
        Welcome back, {user.name}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Analyses</h3>
          <h1>{stats?.total || 0}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Fair Skin</h3>
          <h1>{stats?.fair || 0}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Medium Skin</h3>
          <h1>{stats?.medium || 0}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Tan Skin</h3>
          <h1>{stats?.tan || 0}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Deep Skin</h3>
          <h1>{stats?.deep || 0}</h1>
        </div>

      </div>

    </div>

  );
}

const cardStyle = {
  backgroundColor: "#f5d0e6",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

export default Dashboard;