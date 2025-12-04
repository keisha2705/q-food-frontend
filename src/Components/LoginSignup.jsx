import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dropFood = () => {
    const foodIcons = ["🍔", "🍕", "🍟", "🥗", "🌮", "🍩", "🍣", "🍗"];
    const food = document.createElement("div");
    food.innerText = foodIcons[Math.floor(Math.random() * foodIcons.length)];
    food.style.position = "fixed";
    food.style.left = Math.random() * window.innerWidth + "px";
    food.style.top = "-50px";
    food.style.fontSize = "2.5rem";
    food.style.zIndex = 1000;
    food.style.animation = "fall 3s linear forwards";
    document.body.appendChild(food);
    setTimeout(() => food.remove(), 3000);
  };

  const handleSignup = async () => {
    dropFood();
    try {
      const res = await fetch("http://18.206.233.191:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (res.ok && data.username) {
        localStorage.setItem("username", data.username);
        navigate("/Homepage");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  };

  const handleLogin = async () => {
    dropFood();
    try {
      const encoded = btoa(`${username}:${password}`);
      const res = await fetch("http://18.206.233.191:3000/login", {
        method: "POST",
        headers: { Authorization: `Basic ${encoded}` },
      });
      const data = await res.json();

      if (res.ok && data.username) {
        localStorage.setItem("username", data.username);
        navigate("/Homepage");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div style={wrapperStyle}>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "1rem", fontSize: "2rem" }}>
          {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        {!isLogin && (
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={isLogin ? handleLogin : handleSignup}
          style={buttonStyle}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          style={{ marginTop: "1rem", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Signup" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

// Styles
const wrapperStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #ff7a00, #0068ff)",
  overflow: "hidden",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  width: "90%",
  maxWidth: "450px",
  height: "90%",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const inputStyle = {
  width: "100%",
  padding: "1rem",
  margin: "0.5rem 0",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "1rem",
  background: "linear-gradient(90deg, #0068ff, #ff7a00)",
  border: "none",
  color: "white",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "1rem",
  fontWeight: "bold",
  fontSize: "1rem",
};

export default LoginSignup;
