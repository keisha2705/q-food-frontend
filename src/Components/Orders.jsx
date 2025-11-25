import React, { useEffect, useState } from "react";

const Orders = () => {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!username) return;
    try {
      const res = await fetch(`http://localhost:3000/orders/${username}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    }
  };

  useEffect(() => { fetchOrders(); }, [username]);

  if (!username) return <p>Please log in to view your orders.</p>;
  if (!orders.length) return <p>No orders yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Orders</h1>
      {orders.map((o) => (
        <div key={o._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
          <p>Order ID: {o._id}</p>
          <p>Status: {o.status}</p>
          <p>Total: R{o.total}</p>
          <ul>
            {o.items.map((i, idx) => <li key={idx}>{i.name} x {i.quantity}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
