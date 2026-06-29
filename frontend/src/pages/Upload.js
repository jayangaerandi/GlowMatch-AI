
import { useState } from "react";
import axios from "axios";

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

      "http://127.0.0.1:5001/favorites",

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
      <div style={{ padding: "40px" }}>
        <h2>🔒 Login Required</h2>
        <p>
          Please login to use GlowMatch AI.
        </p>
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

      const token =
      localStorage.getItem("token");

      const response = await axios.post(

      "http://127.0.0.1:5001/upload",

      formData,

      {
        headers: {
          Authorization:
         `Bearer ${token}`
        }
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

    } finally {

      setLoading(false);
    }
  };

  const downloadReport = async () => {

    try {

      const token =
      localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5001/download-report",
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

    <div style={{ padding: "20px" }}>

      <h1>
        ✨ GlowMatch AI Analysis
      </h1>

      <p>
        Welcome, {user.name}
      </p>

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

    </div>
  );
}

export default Upload;

