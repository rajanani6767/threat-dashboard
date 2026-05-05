import { useEffect, useState } from "react";

function Dashboard() {
  const [riskData, setRiskData] = useState(null);
  const [users, setUsers] = useState([]);

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

      <h1>🚨 Threat Dashboard</h1>

      {riskData ? (
        <div>
          <h2 style={{ color: getColor() }}>
            Risk: {riskData.risk}
          </h2>
          <p>{riskData.alert}</p>
          <p>Threat %: {riskData.percentage}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div>
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