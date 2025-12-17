import React, { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import Login from "./components/Login";
import { refreshToken } from "./utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (!access || !refresh) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      const ok = await refreshToken();
      if (!ok) {
        localStorage.clear();
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/me/", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
          },
        });

        if (!res.ok) throw new Error("Role fetch failed");

        const data = await res.json();
        setRole(data.role);
        setLoggedIn(true);
      } catch (err) {
        console.error(err);
        localStorage.clear();
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loggedIn) {
    return <Login onLogin={() => window.location.reload()} />;
  }

  return (
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Garage Stock Management</h2>

      <div>
        <span className="me-3 badge bg-secondary">{role}</span>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>

    <ItemList role={role} />
  </div>
);
}

export default App;
