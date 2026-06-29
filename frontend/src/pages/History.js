
import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      fetchHistory();
    } else {
      setLoading(false);
    }

  }, []);

  const fetchHistory = async () => {

    try {

      const token =
      localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        `http://127.0.0.1:5001/user-history/${user.email}`,

        {
          headers: {
            Authorization:
            `Bearer ${token}`
          }
        }

      );

      let data = response.data;

      if (typeof data === "string") {

        try {

          data = JSON.parse(data);

        } catch {

          data = [];
        }
      }

      if (Array.isArray(data)) {

        setHistory(data);

      } else {

        setHistory([]);
      }

    } catch (error) {

      console.error(
        "History Fetch Error:",
        error
      );

      setHistory([]);

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
          📜 Analysis History
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
          Your Analysis History stores every AI skin analysis you've completed.
          Review previous skin tone detections, beauty recommendations,
          skincare advice, and makeup suggestions anytime.
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
          <div style={{ fontSize: "60px" }}>📸</div>

          <h3>Skin Analysis</h3>

          <p>
            View every uploaded selfie and AI skin tone detection.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "60px" }}>💄</div>

          <h3>Beauty Recommendations</h3>

          <p>
            Revisit personalized foundation, lipstick and blush suggestions.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "60px" }}>📊</div>

          <h3>Track Your Progress</h3>

          <p>
            Compare your previous analyses and monitor your beauty journey.
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
          Please log in to access your complete analysis history,
          personalized beauty reports, and AI-powered recommendations.
        </p>

      </div>

    </div>

  </div>

);
  }

  if (loading) {

    return (

      <div style={{ padding: "20px" }}>

        <h2>Analysis History</h2>

        <p>
          Loading your history...
        </p>

      </div>

    );
  }

  return (

    <div
  style={{
    minHeight: "100vh",
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
      fontSize: "38px",
      marginBottom: "10px",
      background:
        "linear-gradient(90deg,#ff4d8d,#9b5cff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bold",
    }}
  >
    📜 My Skin Analysis History
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
      {" "}{user.name}
    </strong>
  </p>

  <p
    style={{
      color: "#777",
      fontSize: "15px",
    }}
  >
    Review all your previous skin analyses and personalized beauty recommendations.
  </p>
</div>

      {history.length === 0 ? (

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#fafafa",
            border: "1px solid #ddd"
          }}
        >
          No analysis history found.
        </div>

      ) : (

        history.map((item, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "25px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >

            <h2>
              Analysis #{index + 1}
            </h2>

            <p>
              <strong>Image:</strong>
              {" "}
              {item.image_name || "N/A"}
            </p>

            <p>
              <strong>
                Faces Detected:
              </strong>
              {" "}
              {item.faces_detected || 0}
            </p>

            <p>
              <strong>
                Skin Tone:
              </strong>
              {" "}
              {item.skin_tone || "Unknown"}
            </p>

            <hr />

            {/* FOUNDATION */}

            <h3>
              💄 Foundation
            </h3>

            {item.recommendation?.foundation
              ?.image && (

              <img
                src={
                  item.recommendation
                    .foundation.image
                }
                alt="Foundation"
                width="150"
                style={{
                  borderRadius: "10px"
                }}
              />

            )}

            <p>
              <strong>Name:</strong>
              {" "}
              {item.recommendation
                ?.foundation?.name || "N/A"}
            </p>

            <p>
              <strong>Brand:</strong>
              {" "}
              {item.recommendation
                ?.foundation?.brand ||
                "Unknown"}
            </p>

            <p>
              <strong>Rating:</strong>
              {" "}
              ⭐
              {item.recommendation
                ?.foundation?.rating ||
                "N/A"}
            </p>

            <p>
              <strong>Price:</strong>
              {" "}
              $
              {item.recommendation
                ?.foundation?.price ||
                "N/A"}
            </p>

            <hr />

            {/* LIPSTICK */}

            <h3>
              💋 Lipstick
            </h3>

            {item.recommendation?.lipstick
              ?.image && (

              <img
                src={
                  item.recommendation
                    .lipstick.image
                }
                alt="Lipstick"
                width="150"
                style={{
                  borderRadius: "10px"
                }}
              />

            )}

            <p>
              <strong>Name:</strong>
              {" "}
              {item.recommendation
                ?.lipstick?.name || "N/A"}
            </p>

            <p>
              <strong>Brand:</strong>
              {" "}
              {item.recommendation
                ?.lipstick?.brand ||
                "Unknown"}
            </p>

            <p>
              <strong>Rating:</strong>
              {" "}
              ⭐
              {item.recommendation
                ?.lipstick?.rating ||
                "N/A"}
            </p>

            <p>
              <strong>Price:</strong>
              {" "}
              $
              {item.recommendation
                ?.lipstick?.price ||
                "N/A"}
            </p>

            <hr />

            {/* BLUSH */}

            <h3>
              🌸 Blush
            </h3>

            {item.recommendation?.blush
              ?.image && (

              <img
                src={
                  item.recommendation
                    .blush.image
                }
                alt="Blush"
                width="150"
                style={{
                  borderRadius: "10px"
                }}
              />

            )}

            <p>
              <strong>Name:</strong>
              {" "}
              {item.recommendation
                ?.blush?.name || "N/A"}
            </p>

            <p>
              <strong>Brand:</strong>
              {" "}
              {item.recommendation
                ?.blush?.brand ||
                "Unknown"}
            </p>

            <p>
              <strong>Rating:</strong>
              {" "}
              ⭐
              {item.recommendation
                ?.blush?.rating ||
                "N/A"}
            </p>

            <p>
              <strong>Price:</strong>
              {" "}
              $
              {item.recommendation
                ?.blush?.price ||
                "N/A"}
            </p>

          </div>

        ))

      )}

    </div>

  );
}
const cardStyle = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(12px)",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,.1)",
};
export default History;  