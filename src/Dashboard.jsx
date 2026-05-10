import { useEffect, useState } from "react";

function Dashboard() {
  const [riskData, setRiskData] = useState(null);
  const [users, setUsers] = useState([]);

  // 🔁 AUTO REFRESH DATA
  useEffect(() => {
    const fetchAll = () => {
      fetch("https://threat-analyzer-backend.onrender.com/api/risk")
        .then(res => res.json())
        .then(setRiskData)
        .catch(console.error);

      fetch("https://threat-analyzer-backend.onrender.com/api/users")
        .then(res => res.json())
        .then(setUsers)
        .catch(console.error);
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (!riskData) return "gray";
    if (riskData.risk === "HIGH") return "#ef4444";
    if (riskData.risk === "MEDIUM") return "#f59e0b";
    return "#22c55e";
  };

  // 🔥 DYNAMIC ALERTS
  const getDynamicAlert = () => {
    if (!riskData) return "Monitoring Threat Activity...";

    if (riskData.loginFails >= 10) {
      return "🚨 Potential Brute Force Attempt";
    }

    if (riskData.otpFails >= 7) {
      return "⚠️ Multiple OTP Failures Detected";
    }

    if (riskData.loginFails >= 5) {
      return "⚠️ Suspicious Login Activity";
    }

    if (riskData.risk === "HIGH") {
      return "🔒 Account Temporarily Locked";
    }

    return "✅ System Secure";
  };

  return (
    <div style={styles.container}>

      {/* 🔹 SIDEBAR */}
     <div style={styles.sidebar}>
  <h2>🔐 SOC Panel</h2>

  <div style={styles.menuItem}>Dashboard Overview</div>
  <div style={styles.menuItem}>Threat Alerts</div>
  <div style={styles.menuItem}>Security Logs</div>
</div>
      {/* 🔹 MAIN CONTENT */}
      <div style={styles.main}>

        <h1>🚨 Threat Dashboard</h1>

        {/* 🔥 STATS CARDS */}
        <div style={styles.cardContainer}>
          <Card title="Risk Level" value={riskData?.risk} color={getColor()} />
          <Card title="Threat Score" value={riskData?.percentage + "%"} />
          <Card title="OTP Failures" value={riskData?.otpFails} />
          <Card title="Login Failures" value={riskData?.loginFails} />
        </div>

        {/* 🔥 ALERT */}
        <div style={styles.alertBox}>
          <h3>⚠️ Alert</h3>

          <p
            style={{
              color: "yellow",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          >
            {getDynamicAlert()}
          </p>
        </div>

        {/* 🔥 USERS TABLE */}
        <div style={styles.tableBox}>
          <h3>📋 Suspicious Users</h3>

          <div style={styles.tableHeader}>
            <span>Email</span>
            <span>Event</span>
            <span>Count</span>
          </div>

          {users.map((u, i) => (
            <div key={i} style={styles.row}>
              <span>{maskEmail(u.email)}</span>
              <span>{u.event}</span>
              <span>{u.count}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2 style={{ color: color || "white" }}>{value || "--"}</h2>
    </div>
  );
}

// 🔐 MASK EMAIL (privacy)
function maskEmail(email) {
  if (!email) return "";

  // convert to lowercase
  email = email.toLowerCase().trim();

  const [name, domain] = email.split("@");

  // keep first 3 chars only
  const maskedName = name.slice(0, 3) + "***";

  return `${maskedName}@${domain}`;
}
// 🎨 STYLES
const styles = {
  container: {
    display: "flex",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  sidebar: {
  width: "240px",
  background: "#1e293b",
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
},
  main: {
    flex: 1,
    padding: "20px"
  },
  cardContainer: {
    display: "flex",
    gap: "15px",
    margin: "20px 0"
  },
  card: {
    flex: 1,
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },
  alertBox: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  tableBox: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },
  tableHeader: {
    
    display: "grid",
gridTemplateColumns: "2fr 1fr 80px",
alignItems: "center",
    borderBottom: "2px solid #334155",
    paddingBottom: "10px",
    fontWeight: "bold"
  },
  menuItem: {
  color: "#94a3b8",
  marginTop: "18px",
  fontSize: "18px",
  fontWeight: "500"
},
  row: {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 80px",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #334155"
},
};

export default Dashboard;