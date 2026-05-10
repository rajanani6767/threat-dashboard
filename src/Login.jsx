import { useState } from "react";

function Login({ onAccess }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 🔐 DEMO ACCESS KEY
    if (key === "DEMO2026") {
      onAccess();
    } else {
      setError("Invalid Demo Access Key");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

       <h1 style={styles.title}>
  🔐 Security Dashboard Access
</h1>

<p style={styles.demoKey}>
  Demo Access Key: <b>DEMO2026</b>
</p>

        <p style={styles.subtitle}>
          Authorized Demo Access Only
        </p>

        <input
          type="password"
          placeholder="Enter Demo Access Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Enter Dashboard
        </button>

        {error && <p style={styles.error}>{error}</p>}

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#0f172a",
    fontFamily: "Arial",
    color: "white"
  },
  title: {
  fontSize: "42px",
  lineHeight: "50px",
  marginBottom: "10px",
  fontWeight: "bold"
},

demoKey: {
  marginTop: "10px",
  color: "#facc15",
  fontSize: "16px",
  fontWeight: "bold"
},

  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "16px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(0,0,0,0.4)"
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "25px"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    fontSize: "16px",
    outline: "none",
    marginBottom: "20px",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    marginTop: "15px",
    color: "#f87171",
    fontWeight: "bold"
  }
};

export default Login;