import { useEffect, useState } from "react";
import axios from "axios";

import {Bar,Pie} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(

          "http://127.0.0.1:5001/admin-dashboard",

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      setStats(response.data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div
        style={{
          padding: "40px",
          textAlign: "center"
        }}
      >

        <h2>

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  if (!stats) {

    return (

      <div
        style={{
          padding: "40px"
        }}
      >

        Failed to load dashboard.

      </div>

    );

  }

  const barData = {

  labels: [

    "Users",

    "Analyses",

    "Chats",

    "Favorites"

  ],

  datasets: [

    {

      label: "GlowMatch AI",

      data: [

        stats.users,

        stats.analyses,

        stats.chats,

        stats.favorites

      ],

      backgroundColor: [

        "#4F46E5",

        "#EC4899",

        "#10B981",

        "#F59E0B"

      ],

      borderColor: [

        "#3730A3",

        "#BE185D",

        "#047857",

        "#B45309"

      ],

      borderWidth: 2,

      borderRadius: 12

    }

  ]

};

  const pieData = {

  labels: [

    "Users",

    "Analyses",

    "Chats",

    "Favorites"

  ],

  datasets: [

    {

      data: [

        stats.users,

        stats.analyses,

        stats.chats,

        stats.favorites

      ],

      backgroundColor: [

        "#6366F1",

        "#EC4899",

        "#10B981",

        "#F59E0B"

      ],

      borderColor: [

        "#ffffff",

        "#ffffff",

        "#ffffff",

        "#ffffff"

      ],

      borderWidth: 3,

      hoverOffset: 25

    }

  ]

};

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >

        👨‍💼 GlowMatch AI Admin Analytics

      </h1>

      {/* Dashboard Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <div style={card}

          onMouseEnter={(e) => {

              e.currentTarget.style.transform = "translateY(-8px)";

              e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(255,77,148,0.45)";

             

          }}

          onMouseLeave={(e) => {

              e.currentTarget.style.transform = "translateY(0px)";

              e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(255,77,148,0.35)";

          }}
        >

          <h3>👥 Users</h3>
          <h1>{stats.users}</h1>
        </div>

        <div style={card}

          onMouseEnter={(e) => {

              e.currentTarget.style.transform = "translateY(-8px)";

              e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(255,77,148,0.45)";

          }}

          onMouseLeave={(e) => {

              e.currentTarget.style.transform = "translateY(0px)";

              e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(255,77,148,0.35)";

          }}
          >

          <h3>📸 Analyses</h3>
          <h1>{stats.analyses}</h1>
        </div>

        <div style={card}

          onMouseEnter={(e) => {

              e.currentTarget.style.transform = "translateY(-8px)";

              e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(255,77,148,0.45)";

          }}

          onMouseLeave={(e) => {

              e.currentTarget.style.transform = "translateY(0px)";

              e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(255,77,148,0.35)";

          }}
          >

          <h3>💬 Chats</h3>
          <h1>{stats.chats}</h1>
        </div>

        <div style={card}

          onMouseEnter={(e) => {

              e.currentTarget.style.transform = "translateY(-8px)";

              e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(255,77,148,0.45)";

          }}

          onMouseLeave={(e) => {

              e.currentTarget.style.transform = "translateY(0px)";

              e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(255,77,148,0.35)";

          }}
          >

          <h3>❤️ Favorites</h3>
          <h1>{stats.favorites}</h1>
        </div>

      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "40px"
        }}
      >

        <div style={chartCard}>

          <h2
            style={{
              textAlign: "center"
            }}
          >

            📊 System Statistics

          </h2>

          <Bar data={barData}
           options={barOptions}
          />

        </div>

        <div style={chartCard}>

          <h2
            style={{
              textAlign: "center"
            }}
          >

            🥧 Overall Distribution

          </h2>

          <Pie data={pieData}
           options={pieOptions}
          />

        </div>

      </div>

      {/* Summary */}

      <div
        style={{
          marginTop: "50px",
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >

        <h2>

          📋 System Summary

        </h2>

        <p>

          ✔ Registered Users :
          <strong> {stats.users}</strong>

        </p>

        <p>

          ✔ Total AI Analyses :
          <strong> {stats.analyses}</strong>

        </p>

        <p>

          ✔ AI Chat Sessions :
          <strong> {stats.chats}</strong>

        </p>

        <p>

          ✔ Saved Favorites :
          <strong> {stats.favorites}</strong>

        </p>

      </div>

    </div>

  );

}

const barOptions = {

  responsive: true,

  animation: {
  duration: 1800
},

  plugins: {

    legend: {

      labels: {

        color: "#444",

        font: {

          size: 15,

          weight: "bold"

        }

      }

    }

  },

  scales: {

    y: {

      beginAtZero: true,

      ticks: {

        color: "#555"

      }

    },

    x: {

      ticks: {

        color: "#555"

      }

    }

  }

};

const pieOptions = {

  responsive: true,

  animation: {
  duration: 1800
},

  plugins: {

    legend: {

      position: "bottom",

      labels: {

        padding: 20,

        font: {

          size: 15,

          weight: "bold"

        }

      }

    }

  }

};

const card = {

  background: "linear-gradient(135deg,#4F46E5,#7C3AED)",

  color: "white",

  padding: "30px",

  borderRadius: "20px",

  textAlign: "center",

  boxShadow:
    "0 12px 30px rgba(255,77,148,0.35)",

  transition: "all 0.3s ease",

  cursor: "pointer"

};

const chartCard = {

  background: "#ffffff",

  padding: "30px",

  borderRadius: "20px",

  boxShadow:
    "0 12px 25px rgba(0,0,0,0.08)"

};

export default AdminDashboard;