import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div>

        <nav style={{ padding: "20px", background: "#f5d0e6" }}>
          <Link to="/" style={{ marginRight: "20px" }}>
            Home
          </Link>

          <Link to="/upload" style={{ marginRight: "20px" }}>
            Upload
          </Link>

          <Link to="/results" style={{ marginRight: "20px" }}>
            Results
          </Link>

          <Link to="/history" style={{ marginRight: "20px" }}>
            History
          </Link>

          <Link to="/chatbot">
            Chatbot
          </Link>
        </nav>

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<History />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;