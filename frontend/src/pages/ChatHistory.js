import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function ChatHistory() {

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

  }, [user]);

  const fetchHistory = async () => {

    try {

      const token =
      localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        `${API}/chat-history/${user.email}`,

        {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }
      
      );

      console.log(response.data);

      setHistory(response.data);

    } catch (error) {

      console.error(
        "Chat History Error:",
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
            💬 AI Beauty Consultations
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
            Your AI Beauty Consultation History stores every conversation you've
            had with the GlowMatch AI Beauty Assistant. Review personalized
            skincare advice, makeup recommendations, beauty tips, and previous
            AI consultations whenever you need them.
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
            <div style={{ fontSize: "60px" }}>💬</div>

            <h3>AI Conversations</h3>

            <p>
              Access all your previous beauty consultations with GlowMatch AI.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>💄</div>

            <h3>Beauty Advice</h3>

            <p>
              Review personalized makeup tips and product recommendations.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>✨</div>

            <h3>Skincare Guidance</h3>

            <p>
              Revisit skincare routines and AI-generated beauty suggestions at
              any time.
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
            Please log in to view your AI beauty consultation history, revisit
            previous conversations, and continue receiving personalized beauty
            recommendations from GlowMatch AI.
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
          My AI Beauty Consultations
        </h2>

        <p>
          Loading history...
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
    💬 My AI Beauty Consultations
  </h1>

  <p
    style={{
      color: "#666",
      fontSize: "17px",
    }}
  >
    Review all your previous beauty consultations and personalized AI recommendations.
  </p>
</div>

      {history.length === 0 ? (

        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        >
          No chat history found.
        </div>

      ) : (

        history.map((item, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.05)"
            }}
          >

            <div
              style={{
                marginBottom: "15px"
              }}
            >
              <h3
                style={{
                  color: "#ff4d94"
                }}
              >
                Your Question
              </h3>

              <p>
                {item.question}
              </p>
            </div>

            <hr />

            <div
              style={{
                marginTop: "15px"
              }}
            >
              <h3
                style={{
                  color: "#8e44ad"
                }}
              >
                GlowMatch AI Answer
              </h3>

              <p
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.7"
                }}
              >
                {item.answer}
              </p>
            </div>

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

export default ChatHistory;