import { useEffect, useState } from "react";

function Dashboard() {
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    const fetchRisk = () => {
      fetch("https://threat-analyzer-backend.onrender.com/api/risk")
        .then(res => res.json())
        .then(data => setRiskData(data))
        .catch(err => console.error("Error:", err));
    };

    fetchRisk();
    const interval = setInterval(fetchRisk, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚨 Threat Dashboard</h1>

      {riskData ? (
        <div>
          <h2>Risk Level: {riskData.risk}</h2>
          <h3>Threat %: {riskData.percentage}%</h3>

          <p>OTP Failures: {riskData.otpFails}</p>
          <p>Login Failures: {riskData.loginFails}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;