import { useEffect, useState } from "react";
import axios from "axios";

function Favorites() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user?.email) {
      fetchFavorites();
    } else {
      setLoading(false);
    }

  }, []);

  const fetchFavorites = async () => {

    try {

      const token =
      localStorage.getItem("token");  

      console.log("TOKEN =", token);

      const response = await axios.get(
        `http://127.0.0.1:5001/favorites/${user.email}`,

        {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }

      );

      setFavorites(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (!user) {

    return (
      <div style={{ padding: "40px" }}>
        <h2>❤️ My Favorites</h2>
        <p>Please login to view your favorites.</p>
      </div>
    );
  }

  if (loading) {

    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading Favorites...</h2>
      </div>
    );
  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (

        <p>No favorite products yet.</p>

      ) : (

        favorites.map((item, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "15px"
            }}
          >

            <img
              src={item.image}
              alt={item.product_name}
              width="120"
            />

            <h3>{item.product_name}</h3>

            <p>
              Brand: {item.brand}
            </p>

            <p>
              Category: {item.category}
            </p>

            <p>
              Price: ${item.price}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default Favorites;
