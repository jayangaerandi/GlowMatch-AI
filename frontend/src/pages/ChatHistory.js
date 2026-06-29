import { useEffect, useState } from "react";
import axios from "axios";

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

  }, []);

  const fetchHistory = async () => {

    try {

      const token =
      localStorage.getItem("token");

      console.log("TOKEN =", token);

      const response = await axios.get(
        `http://127.0.0.1:5001/chat-history/${user.email}`,

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
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h2>
          My AI Beauty Consultations
        </h2>

        <p>
          Please login to view your chat history.
        </p>
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

    <div style={{ padding: "20px" }}>

      <h1>
        My AI Beauty Consultations
      </h1>

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

export default ChatHistory;