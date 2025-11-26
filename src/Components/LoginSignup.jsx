import React, { useState } from "react";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP ==========================
  const handleSignup = async () => {
    try {
      const res = await fetch("http://18.206.233.191:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
    }
  };

  // LOGIN ============================
  const handleLogin = async () => {
    try {
      const encoded = btoa(`${username}:${password}`);

      const res = await fetch("http://18.206.233.191:3000/login", {
        method: "POST",
        headers: { Authorization: `Basic ${encoded}` },
      });

      const data = await res.json();

      if (data.username) {
        localStorage.setItem("username", data.username);
        alert("Login successful!");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Signup / Login</h2>

      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginSignup;
