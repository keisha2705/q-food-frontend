import React, { useEffect, useState } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch("http://localhost:3000/restaurants");
      const data = await res.json();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

  const addToCart = async (item) => {
    if (!username) return alert("Please log in first");

    const res = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        items: [{ restaurantId: item._id, name: item.name, price: item.price, description: item.description || 0, quantity: 1, image: item.image }],
      }),
    });
    const data = await res.json();
    if (res.ok) alert("✅ Added to cart!");
    else alert("❌ Error: " + data.error);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #1a2233 0%, #2e3b55 100%)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "25px",
        boxSizing: "border-box",
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item._id}
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
            src={item.image}
            alt={item.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              backgroundColor: "#444",
              transition: "transform 0.3s",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x180.png?text=Image+Unavailable";
            }}
          />
          <div style={{ padding: "15px" }}>
            <h2 style={{ margin: "0 0 10px", color: "#ffd166", fontSize: "1.2rem" }}>
              {item.name}
            </h2>
            <p style={{ margin: "0 0 10px", color: "#e9ecf1", opacity: 0.85 }}>
              R{item.price || 0}
            </p>
            <button
              onClick={() => addToCart(item)}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0, 116, 217, 0.18)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,116,217,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,116,217,0.18)";
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
