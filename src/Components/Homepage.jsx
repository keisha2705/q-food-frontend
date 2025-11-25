import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockDishes = [
  {
    _id: "1",
    name: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    rating: "4.7",
    price: 89,
  },
  {
    _id: "2",
    name: "Chicken Alfredo Pasta",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    rating: "4.5",
    price: 120,
  },
  {
    _id: "3",
    name: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    rating: "4.9",
    price: 190,
  },
];

const Homepage = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const goToMenu = () => {
    navigate("/Menu");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(to bottom, #0f1115, #1a1f2e)",
        color: "#e9ecf1",
        paddingBottom: "3rem",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "2rem auto",
          padding: "2rem",
          background: "#1a2233",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          gap: "2rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2.5rem", color: "#ff7a59" }}>
            Hungry? It's Q delivered.
          </h1>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
            Fresh meals from your favourite spots—fast.
          </p>
          <button
            style={{
              padding: "0.8rem 1.5rem",
              background: "linear-gradient(90deg, #0074d9, #ff7a59)",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              fontSize: "1rem",
            }}
            onClick={goToMenu}
          >
            Order Now
          </button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Delicious food"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </section>

      {/* Popular Dishes */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "2rem auto",
          padding: "2rem",
          background: "#171b26",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#ffd166",
            marginBottom: "1.5rem",
          }}
        >
          Popular Dishes
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mockDishes.map((dish) => (
            <div
              key={dish._id}
              style={{
                background: "#1a2233",
                padding: "1rem",
                borderRadius: "12px",
                textAlign: "center",
                color: "#e9ecf1",
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={dish.image}
                alt={dish.name}
                style={{
                  width: "100%",
                  maxWidth: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  margin: "0 auto 0.8rem",
                }}
              />
              <h3 style={{ color: "#ffd166", fontWeight: "bold" }}>
                {dish.name}
              </h3>
              <p style={{ color: "#b0b7c3", margin: "0.2rem 0" }}>
                ⭐ {dish.rating} — R{dish.price}
              </p>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "linear-gradient(90deg, #0074d9, #ff7a59)",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: "0.5rem",
                }}
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
