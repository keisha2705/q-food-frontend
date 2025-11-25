import React, { useState, useEffect } from 'react';

const banks = [
  'Nedbank',
  'PayPal',
  'FNB',
  'ABSA',
  'Standard Bank',
];

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    padding: "2rem",
    background: "linear-gradient(180deg, #1a2233 60%, #ff7a59 100%)",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    color: "#e9ecf1",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    margin: "0",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.2rem',
    color: '#0074d9',
    fontWeight: 900,
    fontSize: '1.5rem',
    letterSpacing: '.5px',
  },
  label: {
    display: 'block',
    marginBottom: '.7rem',
    fontWeight: 700,
    color: '#ffd166',
  },
  input: {
    width: '100%',
    padding: '.7rem 1rem',
    borderRadius: 12,
    border: '1px solid #0074d9',
    background: '#f5f8fa',
    color: '#222',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '.7rem 1rem',
    borderRadius: 12,
    border: '1px solid #0074d9',
    background: '#f5f8fa',
    color: '#222',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '.8rem 1rem',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)',
    color: '#fff',
    fontWeight: 800,
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(0, 116, 217, .18)',
    transition: 'background .15s',
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popup: {
    background: "#1a2233",
    padding: "2rem 2.5rem",
    borderRadius: 18,
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.55)",
    minWidth: "300px",
  },
  progressBarContainer: {
    width: "100%",
    height: "15px",
    background: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: "1rem",
  },
  progressBar: {
    height: "100%",
    background: "#4ade80",
    width: "0%",
    transition: "width 0.2s ease",
  },
  successText: {
    color: "#4ade80",
    fontWeight: "bold",
    marginTop: "1rem",
  }
};

function Checkout() {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [processing, setProcessing] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Start processing
    setTimeout(() => {
      setProcessing(false);
      setTracking(true);
    }, 2000); // 2 seconds processing
  };

  // Handle delivery tracking progress
  useEffect(() => {
    if (!tracking) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTracking(false);
          setPaid(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200); // every 200ms
    return () => clearInterval(interval);
  }, [tracking]);

  // Hide "Payment Successful" notification after 5 seconds
  useEffect(() => {
    if (!paid) return;
    const timer = setTimeout(() => {
      setPaid(false);
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [paid]);

  return (
    <>
      {/* Processing Overlay */}
      {processing && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>Processing Payment...</h2>
            <p>Please wait while we confirm your payment.</p>
          </div>
        </div>
      )}

      {/* Delivery Tracking Overlay */}
      {tracking && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>Order is on the way!</h2>
            <p>Tracking your delivery to:</p>
            <p style={{ fontWeight: "bold", color: "#ffd166" }}>{location}</p>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
            <p style={styles.successText}>{progress}%</p>
          </div>
        </div>
      )}

      {/* Payment Success Notification */}
      {paid && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>Payment Successful!</h2>
            <p>Your order will arrive shortly at:</p>
            <p style={{ fontWeight: "bold", color: "#ffd166" }}>{location}</p>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} style={styles.container}>
        <h2 style={styles.heading}>Checkout</h2>

        <label style={styles.label}>
          Select Bank:
          <select
            value={bank}
            onChange={e => setBank(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">--Choose a bank--</option>
            {banks.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Account Number:
          <input
            type="text"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Name on Account:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Delivery Location / Address:
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            placeholder="e.g. 23 Market Street, Johannesburg"
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>Pay Now</button>
      </form>
    </>
  );
}

export default Checkout;
