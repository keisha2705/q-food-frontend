import React, { useEffect, useState } from "react";

const Cart = () => {
  const username = localStorage.getItem("username");
  const [cart, setCart] = useState([]);

  // LOAD CART ======================
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`http://18.206.233.191:3000/cart/${username}`);
      const data = await res.json();
      setCart(data.items || []);
    };
    fetchCart();
  }, [username]);

  // CLEAR CART ======================
  const clearCart = async () => {
    await fetch(`http://18.206.233.191:3000/cart/${username}`, {
      method: "DELETE",
    });
    setCart([]);
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
