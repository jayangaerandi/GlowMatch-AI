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
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto 50px auto",
    background:
      "linear-gradient(135deg,#ff4d94,#c44dff,#7b61ff)",
    borderRadius: "30px",
    padding: window.innerWidth < 768 ? "35px 20px" : "70px 60px",
    color: "white",
    textAlign: "center",
    boxShadow: "0 18px 45px rgba(0,0,0,.18)",
    overflow: "hidden",
  }}
>

  <div
    style={{
      fontSize: window.innerWidth < 768 ? "45px" : "70px",
      marginBottom: "10px",
    }}
  >
    ✨
  </div>

  <h1
    style={{
      fontSize: window.innerWidth < 768 ? "42px" : "68px",
      fontWeight: "800",
      lineHeight: "1.15",
      marginBottom: "18px",
      marginTop: "0",
    }}
  >
    Welcome to
    <br />
    GlowMatch AI
  </h1>

  <h2
    style={{
      fontSize: window.innerWidth < 768 ? "24px" : "36px",
      fontWeight: "600",
      marginBottom: "25px",
    }}
  >
    Your Personal AI Beauty Consultant
  </h2>

  <p
    style={{
      maxWidth: "850px",
      margin: "0 auto",
      fontSize: window.innerWidth < 768 ? "17px" : "21px",
      lineHeight: "1.8",
      opacity: "0.96",
    }}
  >
    Discover personalized beauty recommendations based on your
    skin tone, skin concerns and facial features using Artificial
    Intelligence. Receive tailored makeup suggestions, skincare
    advice, AI-powered beauty consultations and comprehensive
    beauty analysis reports—all in one intelligent platform.
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginTop: "35px",
    }}
  >

    <button
      style={{
        background: "white",
        color: "#ff4d94",
        border: "none",
        borderRadius: "50px",
        padding: "15px 30px",
        fontSize: "17px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🚀 Get Started
    </button>

    <button
      style={{
        background: "transparent",
        color: "white",
        border: "2px solid white",
        borderRadius: "50px",
        padding: "15px 30px",
        fontSize: "17px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      💄 Explore Features
    </button>

  </div>

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