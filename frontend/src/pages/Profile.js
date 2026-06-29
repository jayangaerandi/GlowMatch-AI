import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user?.email) {
      fetchProfile();
    } else {
      setLoading(false);
    }

  }, []);

  const fetchProfile = async () => {

    try {

      const token =
      localStorage.getItem("token");  

      console.log("TOKEN =", token);

      const response = await axios.get(
        `http://127.0.0.1:5001/profile/${user.email}`,

      {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }
      );

      setProfile(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (!user) {

    return (
      <div style={{ padding: "40px" }}>
        <h2>Profile</h2>
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  if (loading) {

    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>👤 My Profile</h1>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <p>
          <strong>Name:</strong>{" "}
          {profile?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {profile?.email}
        </p>

        <hr />

        <h2>Beauty Insights</h2>

        <p>
          <strong>Total Analyses:</strong>{" "}
          {profile?.total_analyses || 0}
        </p>

        <p>
          <strong>Total AI Consultations:</strong>{" "}
          {profile?.total_chats || 0}
        </p>

      </div>

    </div>

  );
}

export default Profile;