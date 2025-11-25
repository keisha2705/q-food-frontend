import React, { useEffect, useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3000/restaurants");

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading)
    return (
      <p
        style={{
          padding: 20,
          textAlign: "center",
          color: "#ffd166",
          fontSize: "1.2rem",
        }}
      >
        Loading restaurants...
      </p>
    );
  if (error)
    return (
      <p style={{ padding: 20, color: "red", textAlign: "center" }}>
        {error}
      </p>
    );
  if (restaurants.length === 0)
    return (
      <p
        style={{
          padding: 20,
          color: "#ffd166",
          textAlign: "center",
          fontSize: "1.1rem",
        }}
      >
        No restaurants found.
      </p>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #1a2233 0%, #2e3b55 100%)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "25px",
        boxSizing: "border-box",
      }}
    >
      {restaurants.map((r) => (
        <div
          key={r._id}
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            background: "#2e3b55",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
          }}
        >
          <img
            src={r.image}
            alt={r.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              backgroundColor: "#444",
              transition: "transform 0.3s",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200.png?text=Image+Unavailable";
            }}
          />

          <div style={{ padding: "15px" }}>
            <h2
              style={{
                margin: "0 0 10px",
                color: "#ffd166",
                fontSize: "1.3rem",
              }}
            >
              {r.name}
            </h2>
            <p style={{ margin: 0, color: "#e9ecf1", opacity: 0.85 }}>
              {r.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
