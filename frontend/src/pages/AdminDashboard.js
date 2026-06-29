import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem( "adminToken");

      console.log("TOKEN =", token);

      const response = await axios.get(
        "http://127.0.0.1:5001/admin-dashboard",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!stats) {

    return <h2>Loading...</h2>;

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>
        👨‍💼 Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <div style={card}>
          <h3>👥 Users</h3>
          <h1>{stats.users}</h1>
        </div>

        <div style={card}>
          <h3>📸 Analyses</h3>
          <h1>{stats.analyses}</h1>
        </div>

        <div style={card}>
          <h3>💬 Chats</h3>
          <h1>{stats.chats}</h1>
        </div>

        <div style={card}>
          <h3>❤️ Favorites</h3>
          <h1>{stats.favorites}</h1>
        </div>

      </div>

    </div>

  );
}

const card = {
  backgroundColor: "#f5d0e6",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center"
};

export default AdminDashboard;