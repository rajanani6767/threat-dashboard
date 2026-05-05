import { useEffect, useState } from "react";

function Dashboard() {
  const [riskData, setRiskData] = useState(null);
  const [users, setUsers] = useState([]);
  const [authorized, setAuthorized] = useState(false); // ✅ FIXED POSITION

  // 🔐 AUTH CHECK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const token = tokenFromUrl || localStorage.getItem("token");

    if (!token) {
      alert("Login required 🔐");
      return;
    }

    try {
      const user = JSON.parse(atob(token.split('.')[1]));

      if (user.role !== "admin") {
        alert("Admin only 🚫");
        return;
      }

      setAuthorized(true); // ✅ allow UI

      localStorage.setItem("token", token);

      // clean URL for GitHub Pages
      window.history.replaceState({}, document.title, "/iam-project/");

    } catch (err) {
      console.error(err);
      alert("Invalid token ❌");
    }
  }, []);

  // 📊 RISK DATA
  useEffect(() => {
    const fetchRisk = () => {
      fetch("https://threat-analyzer-backend.onrender.com/api/risk")
        .then(res => res.json())
        .then(data => setRiskData(data))
        .catch(err => console.error(err));
    };

    fetchRisk();
    const interval = setInterval(fetchRisk, 5000);

    return () => clearInterval(interval);
  }, []);

  // 👥 USERS DATA
  useEffect(() => {
    fetch("https://threat-analyzer-backend.onrender.com/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const getColor = () => {
    if (!riskData) return "gray";
    if (riskData.risk === "HIGH") return "red";
    if (riskData.risk === "MEDIUM") return "orange";
    return "green";
  };

  // 🚫 BLOCK UI IF NOT AUTHORIZED
  if (!authorized) {
    return (
      <div style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}>
        <h2>Access Denied 🚫</h2>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>

      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        🚨 Threat Dashboard
      </h1>

      {riskData ? (
        <div style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}>
          
          <h2 style={{ color: getColor() }}>
            Risk: {riskData.risk}
          </h2>

          <div style={{
            height: "10px",
            background: "#334155",
            borderRadius: "5px",
            margin: "15px 0"
          }}>
            <div style={{
              width: `${riskData.percentage}%`,
              height: "100%",
              background: getColor(),
              borderRadius: "5px"
            }}></div>
          </div>

          <p style={{ color: "yellow", fontWeight: "bold" }}>
            {riskData.alert}
          </p>

          <p>Threat %: {riskData.percentage}%</p>

          <hr style={{ margin: "15px 0", borderColor: "#334155" }} />

          <p>🔐 OTP Failures: {riskData.otpFails}</p>
          <p>⚠️ Login Failures: {riskData.loginFails}</p>

        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* 👥 USERS SECTION */}
      <div style={{ marginTop: "30px" }}>
        <h3>🚨 Suspicious Users</h3>
        {users.map((u, i) => (
          <p key={i}>
            {u.email} → {u.event} ({u.count})
          </p>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;