import { useState } from "react";
import axios from "axios";

function Upload() {

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setMessage(response.data.message);

      // Store AI analysis result
      setResult(response.data);

    } catch (error) {

      console.error(error);
      setMessage("Upload Failed");

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Upload Your Image</h2>

      <input
        type="file"
        onChange={handleImageChange}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Image
      </button>

      <p>{message}</p>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px"
          }}
        >
          <h3>Analysis Result</h3>

          <p>
            <strong>Faces Detected:</strong>{" "}
            {result.faces_detected}
          </p>

          <p>
            <strong>Skin Tone:</strong>{" "}
            {result.skin_tone}
          </p>
        </div>
      )}

    </div>
  );
}

export default Upload;