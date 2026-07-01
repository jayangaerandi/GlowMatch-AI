import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Chatbot() {

  const user =
  JSON.parse(localStorage.getItem("user")) || {};

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {

    if (!question.trim() || loading) {
      return;
    }

    const userQuestion = question;

    setQuestion("");
    setLoading(true);

    try {

      const response = await axios.post(
        `${API}/chat`,
        {
         question: userQuestion,

         user_email: user?.email || null
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "user",
          text: userQuestion
        },
        {
          type: "bot",
          text: response.data.answer
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "user",
          text: userQuestion
        },
        {
          type: "bot",
          text: "Backend connection failed."
        }
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
  style={{
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#FFE8F3,#F8E7FF,#EEF5FF)",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  }}
>

      <div
  style={{
    textAlign: "center",
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      fontSize: "36px",
      marginBottom: "10px",
      background:
        "linear-gradient(90deg,#ff4d8d,#9b5cff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    ✨ GlowMatch AI Beauty Assistant
  </h1>

  <p
    style={{
      color: "#666",
      fontSize: "18px",
    }}
  >
    Your Personal AI Makeup & Skincare Expert
  </p>

</div>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          minHeight: "400px",
          marginBottom: "20px",
          backgroundColor: "#fafafa",
          overflowY: "auto"
        }}
      >

        {messages.length === 0 && (
          <div>
            <p>Ask me anything about:</p>

            <ul>
              <li>Foundation recommendations</li>
              <li>Lipstick suggestions</li>
              <li>Blush recommendations</li>
              <li>Skincare routines</li>
              <li>Oily skin management</li>
              <li>Dry skin care</li>
              <li>Makeup application tips</li>
            </ul>
          </div>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor:
                msg.type === "user"
                  ? "#f5d0e6"
                  : "#ffffff",
              border:
                msg.type === "user"
                  ? "1px solid #e8b8d0"
                  : "1px solid #ddd"
            }}
          >

            <strong>
              {msg.type === "user"
                ? "You"
                : "GlowMatch AI Assistant"}
            </strong>

            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                marginTop: "8px"
              }}
            >
              {msg.text}
            </p>

          </div>

        ))}

        {loading && (

          <div
            style={{
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              border: "1px solid #ddd"
            }}
          >

            <strong>GlowMatch AI Assistant</strong>

            <p
              style={{
                fontStyle: "italic",
                marginTop: "8px"
              }}
            >
              GlowMatch AI is thinking...
            </p>

          </div>

        )}

      </div>

      <div>

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask a beauty question..."
          style={{
            width: "70%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#f5d0e6",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

      </div>

      <br />

      <h4>Try asking:</h4>

      <ul>
        <li>Which foundation suits medium skin?</li>
        <li>Best lipstick for tan skin?</li>
        <li>How do I manage oily skin?</li>
        <li>Best blush for fair skin?</li>
        <li>How can I make my lipstick last longer?</li>
        <li>What skincare routine should I follow before makeup?</li>
        <li>What makeup suits a wedding?</li>
      </ul>

    </div>
  );
}

export default Chatbot;
