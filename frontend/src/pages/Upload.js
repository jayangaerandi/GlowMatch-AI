
import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Upload() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const saveFavorite = async (
  product,
  category
) => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.post(

      axios.post(
        `${API}/favorites`
      ),

      {

        user_email: user.email,

        product_name: product.name,

        brand: product.brand,

        category: category,

        image: product.image,

        price: product.price

      },

      {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    alert(
      "Added to Favorites ❤️"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save favorite"
    );

  }
};


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
            ✨ AI Skin Analysis
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
            Upload your selfie and let GlowMatch AI analyze your skin tone,
            identify beauty needs, and recommend makeup products specially
            selected for you.
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

            <h3>AI Skin Detection</h3>

            <p>
              Detect your skin tone instantly using artificial intelligence.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>💄</div>

            <h3>Personalized Makeup</h3>

            <p>
              Receive foundation, lipstick and blush recommendations that suit
              your complexion.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "60px" }}>🧴</div>

            <h3>Beauty Tips</h3>

            <p>
              Get customized skincare advice and beauty routines based on your
              analysis.
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
            Please log in to upload your image, perform AI-powered skin
            analysis, receive personalized beauty recommendations, and download
            your professional GlowMatch AI Beauty Report.
          </p>

        </div>

      </div>

    </div>

  );

}

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleUpload = async () => {

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "image",
      image
    );

    formData.append(
      "user_email",
      user.email
    );

    try {

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;

  setMessage(data.message);
  setResult(data);

} catch (error) {
  console.error(error);
  setMessage("Upload Failed");
}finally {

      setLoading(false);
    }
  };

  const downloadReport = async () => {

    try {

      const token =
      localStorage.getItem("token");

      const response = await axios.post(
        `${API}/download-report`,
        result,
        {
          responseType: "blob",

          headers: {
            Authorization:
            `Bearer ${token}`
          }
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "GlowMatch_AI_Beauty_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.error(error);

      alert("PDF download failed");
    }
  };

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
      fontSize: "40px",
      marginBottom: "12px",
      background:
        "linear-gradient(90deg,#ff4d8d,#9b5cff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bold",
    }}
  >
    ✨ GlowMatch AI Skin Analysis
  </h1>

  <p
    style={{
      fontSize: "18px",
      color: "#666",
      marginBottom: "6px",
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
      fontSize: "16px",
      maxWidth: "650px",
      margin: "0 auto",
      lineHeight: "1.6",
    }}
  >
    Upload a clear facial image to receive AI-powered skin tone detection,
    personalized beauty advice, and makeup product recommendations tailored
    just for you.
  </p>
</div>

<center>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <br />
      <br />

      {preview && (

        <img
          src={preview}
          alt="Preview"
          width="250"
          style={{
            borderRadius: "12px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.2)"
          }}
        />

      )}

      <br />
      <br />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#ff85c0",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {loading
           ? "🔍 AI Analyzing..."
           : "✨ Upload & Analyze"}
      </button>

      <p>{message}</p>

      {result && (

        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            borderRadius: "15px",
            backgroundColor: "#fafafa",
            border: "1px solid #ddd"
          }}
        >

          <h2>
            🎯 Analysis Result
          </h2>

          <p>
            <strong>
              Faces Detected:
            </strong>{" "}
            {result.faces_detected}
          </p>

          <p>
            <strong>
              Skin Tone:
            </strong>{" "}
            {result.skin_tone}
          </p>

          <p>
            <strong>
              Skin Concern:
            </strong>{" "}
            {result.skin_concern}
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#fff8e6",
              borderRadius: "12px",
              border: "1px solid #ffd591",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >

          <h3
            style={{
              marginBottom: "10px",
              color: "#d48806"
            }}
          >
           ✨ Personalized Beauty Advice
          </h3>

          <p
            style={{
              lineHeight: "1.8",
              margin: 0
            }}
          >
            {result.skin_tip}
          </p>

          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f6ffed",
              borderRadius: "12px",
              border: "1px solid #b7eb8f"
            }}
          >

          <h3>
             💄 Recommended Makeup Look
          </h3>

          <p>
            <strong>Look:</strong>{" "}
            {result.makeup_look?.look_name}
          </p>

          <p>
            <strong>Occasion:</strong>{" "}
            {result.makeup_look?.occasion}
          </p>

          <p>
            <strong>Eye Makeup:</strong>{" "}
            {result.makeup_look?.eye_makeup}
          </p>

          <p>
            {result.makeup_look?.description}
          </p>

          </div>

          <hr />

          <h2>
            💄 Foundation
          </h2>

          <img
            src={
              result.recommendation
                ?.foundation?.image
            }
            alt="Foundation"
            width="180"
          />

          <p>
            {result.recommendation
              ?.foundation?.name}
          </p>

          <p>
            Brand:
            {" "}
            {result.recommendation
              ?.foundation?.brand}
          </p>

          <p>
            Rating:
            {" "}
            ⭐
            {result.recommendation
              ?.foundation?.rating}
          </p>

          <p>
            Price:
            {" "}
            $
            {result.recommendation
              ?.foundation?.price}
          </p>

          <button
            onClick={() =>
              saveFavorite(
              result.recommendation.foundation,
              "Foundation"
              )
            }
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#ff85c0",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
             ❤️ Save Foundation
          </button>

          <hr />

          

          <h2>
            💋 Lipstick
          </h2>

          <img
            src={
              result.recommendation
                ?.lipstick?.image
            }
            alt="Lipstick"
            width="180"
          />

          <p>
            {result.recommendation
              ?.lipstick?.name}
          </p>

          <p>
            Brand:
            {" "}
            {result.recommendation
              ?.lipstick?.brand}
          </p>

          <p>
            Rating:
            {" "}
            ⭐
            {result.recommendation
              ?.lipstick?.rating}
          </p>

          <p>
            Price:
            {" "}
            $
            {result.recommendation
              ?.lipstick?.price}
          </p>

          <button
            onClick={() =>
              saveFavorite(
                result.recommendation.lipstick,
                "Lipstick"
              )
            }
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#ff85c0",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            ❤️ Save Lipstick
          </button>

          <hr />

          

          <h2>
            🌸 Blush
          </h2>

          <img
            src={
              result.recommendation
                ?.blush?.image
            }
            alt="Blush"
            width="180"
          />

          <p>
            {result.recommendation
              ?.blush?.name}
          </p>

          <p>
            Brand:
            {" "}
            {result.recommendation
              ?.blush?.brand}
          </p>

          <p>
            Rating:
            {" "}
            ⭐
            {result.recommendation
              ?.blush?.rating}
          </p>

          <p>
            Price:
            {" "}
            $
            {result.recommendation
              ?.blush?.price}
          </p>

          <button
            onClick={() =>
              saveFavorite(
                result.recommendation.blush,
                "Blush"
              )
            }
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#ff85c0",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            ❤️ Save Blush
          </button>

          <button
            onClick={downloadReport}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#ff85c0,#ff4d94)",
              color: "white",
              cursor: "pointer"
            }}
          >
            📄 Download AI Beauty Report
          </button>

          

        </div>

      )}
      </center>

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


export default Upload;

