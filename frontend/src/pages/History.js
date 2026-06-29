
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

      <div style={{ padding: "20px" }}>

        <h2>🔒 Login Required</h2>

        <p>
          Please login to view your
          analysis history.
        </p>

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

    <div style={{ padding: "20px" }}>

      <h1>
        📜 My Analysis History
      </h1>

      <p>
        Welcome back,
        {" "}
        <strong>
          {user.name}
        </strong>
      </p>

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

export default History;
