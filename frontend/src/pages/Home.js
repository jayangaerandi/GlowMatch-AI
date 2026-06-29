function Home() {

  const featureCard = {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  return (

    <div
      style={{
        padding: "40px",
        background:
          "linear-gradient(to right,#fff5fa,#eef4ff)",
        minHeight: "100vh"
      }}
    >

      {/* Hero Section */}

      <div
        style={{
          textAlign: "center",
          background:
            "linear-gradient(135deg,#ff4d94,#9b59b6)",
          color: "white",
          padding: "60px",
          borderRadius: "25px",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px"
          }}
        >

          ✨ Welcome to GlowMatch AI

        </h1>

        <h2>

          Your Personal AI Beauty Consultant

        </h2>

        <p
          style={{
            maxWidth: "800px",
            margin: "auto",
            fontSize: "18px",
            lineHeight: "32px"
          }}
        >

          Discover personalized beauty recommendations
          designed specifically for your unique skin tone,
          skin concerns and facial features using
          Artificial Intelligence.

        </p>

      </div>

      {/* Features */}

      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >

        🌸 Why Choose GlowMatch AI?

      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "50px"
        }}
      >

        <div style={featureCard}>
          <h2>🎨</h2>
          <h3>Skin Tone Detection</h3>
          <p>
            AI automatically identifies your
            skin tone for personalized beauty
            recommendations.
          </p>
        </div>

        <div style={featureCard}>
          <h2>🧴</h2>
          <h3>Skin Concern Analysis</h3>
          <p>
            Detects acne, pigmentation,
            dryness and dark circles.
          </p>
        </div>

        <div style={featureCard}>
          <h2>💄</h2>
          <h3>Makeup Recommendation</h3>
          <p>
            Get foundation, lipstick and blush
            recommendations suitable for you.
          </p>
        </div>

        <div style={featureCard}>
          <h2>🤖</h2>
          <h3>AI Beauty Assistant</h3>
          <p>
            Ask beauty questions and receive
            intelligent skincare advice.
          </p>
        </div>

        <div style={featureCard}>
          <h2>❤️</h2>
          <h3>Favorites</h3>
          <p>
            Save your favourite beauty
            products for future use.
          </p>
        </div>

        <div style={featureCard}>
          <h2>📄</h2>
          <h3>Beauty Reports</h3>
          <p>
            Download your complete AI beauty
            analysis report anytime.
          </p>
        </div>

      </div>

      {/* How It Works */}

      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "35px",
          boxShadow:
            "0 8px 18px rgba(0,0,0,0.08)"
        }}
      >

        <h2>

          🚀 How GlowMatch AI Works

        </h2>

        <ol
          style={{
            lineHeight: "35px",
            fontSize: "17px"
          }}
        >

          <li>Create your GlowMatch AI account.</li>

          <li>Upload a clear front-facing selfie.</li>

          <li>AI analyzes your skin tone and skin concerns.</li>

          <li>Receive personalized makeup recommendations.</li>

          <li>Chat with the AI Beauty Assistant.</li>

          <li>Save favourite products and download reports.</li>

        </ol>

      </div>

      {/* User Guidelines */}

      <div
        style={{
          background: "#fff8e6",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "35px"
        }}
      >

        <h2>

          📸 Photo Upload Guidelines

        </h2>

        <ul
          style={{
            lineHeight: "34px"
          }}
        >

          <li>Use a clear front-facing photo.</li>

          <li>Ensure good natural lighting.</li>

          <li>Avoid heavy makeup before analysis.</li>

          <li>Remove sunglasses and hats.</li>

          <li>Only one face should appear in the image.</li>

          <li>Upload high-quality images for accurate AI predictions.</li>

        </ul>

      </div>

      {/* Privacy */}

      <div
        style={{
          background: "#eef9ff",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "35px"
        }}
      >

        <h2>

          🔒 Privacy & Data Protection

        </h2>

        <p
          style={{
            lineHeight: "32px"
          }}
        >

          GlowMatch AI values your privacy and is committed to
          protecting your personal information.

        </p>

        <ul
          style={{
            lineHeight: "32px"
          }}
        >

          <li>Your uploaded images are used only for AI beauty analysis.</li>

          <li>Your personal information is securely stored.</li>

          <li>Passwords are encrypted before storage.</li>

          <li>JWT Authentication protects your account.</li>

          <li>Your beauty history can only be accessed after login.</li>

          <li>Your personal data is never shared with third parties.</li>

          <li>
            GlowMatch AI is designed in accordance with the
            principles of the Personal Data Protection Act,
            No. 9 of 2022 (Sri Lanka).
          </li>

        </ul>

      </div>

      {/* Footer */}

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "#666"
        }}
      >

        <h3>

          GlowMatch AI

        </h3>

        <p>

          AI-Powered Beauty Recommendation Platform

        </p>

        <p>

          Developed for Academic Research and Educational Purposes

        </p>

        <p>

          © 2026 GlowMatch AI | Version 1.0

        </p>

      </div>

    </div>

  );

}

export default Home;