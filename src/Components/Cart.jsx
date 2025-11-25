import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!username) {
        setError("Please log in to see your cart.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/cart/${username}`);
        if (res.status === 404) {
          // Cart doesn’t exist → create empty cart
          const createRes = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, items: [] }),
          });
          if (!createRes.ok) throw new Error("Failed to create cart");
          const data = await createRes.json();
          setCart(data.cart);
        } else if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const data = await res.json();
          setCart(data);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [username]);

  const handleClearCart = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${username}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      setCart({ items: [] });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleCheckout = () => {
    // Pass the cart total or items if needed
    navigate("/checkout"); // assumes you have a /checkout route
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Calculate total
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.quantity}</td>
                  <td style={tdStyle}>R{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "1rem" }}>Total: R{total.toFixed(2)}</h3>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleClearCart} style={clearButtonStyle}>
              Clear Cart
            </button>
            <button onClick={handleCheckout} style={checkoutButtonStyle}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const thStyle = { borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" };
const tdStyle = { borderBottom: "1px solid #eee", padding: "8px" };
const clearButtonStyle = {
  marginRight: "1rem",
  padding: "0.5rem 1rem",
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const checkoutButtonStyle = {
  padding: "0.5rem 1rem",
  background: "#4ade80",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Cart;
