import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import ItemList from "./components/ItemList";
import { isLoggedIn, logout } from "./utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Garage Stock Management</h3>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <ItemList role="Owner" />
    </div>
  );
}

export default App;
