import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  return (
    <>
      {accessGranted ? (
        <Dashboard />
      ) : (
        <Login onAccess={() => setAccessGranted(true)} />
      )}
    </>
  );
}

export default App;