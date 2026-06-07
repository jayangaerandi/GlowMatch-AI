import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/history"
      );

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Analysis History</h2>

      {history.length === 0 ? (
        <p>No records found</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px"
            }}
          >
            <p>
              <strong>Image:</strong>
              {" "}
              {item.image_name}
            </p>

            <p>
              <strong>Faces:</strong>
              {" "}
              {item.faces_detected}
            </p>

            <p>
              <strong>Skin Tone:</strong>
              {" "}
              {item.skin_tone}
            </p>

            {typeof item.recommendation === "object" ? (
            <>
            <p>
              <strong>Foundation:</strong>{" "}
              {item.recommendation.foundation}
            </p>

            <p>
               <strong>Lipstick:</strong>{" "}
               {item.recommendation.lipstick}
            </p>

            <p>
              <strong>Blush:</strong>{" "}
              {item.recommendation.blush}
            </p>
            </>
            ) : (
            <p>
              <strong>Recommendation:</strong>{" "}
              {item.recommendation}
            </p>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default History;
