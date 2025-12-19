const API_URL = "https://garage-stock-management.onrender.com";

// LOGIN
export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

// REFRESH TOKEN
export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return false;

  try {
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      localStorage.clear();
      return false;
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    return true;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return false;
  }
}

// LOGOUT
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// GET ACCESS TOKEN
export function getAccessToken() {
  return localStorage.getItem("access");
}

// CHECK LOGIN
export function isLoggedIn() {
  return !!localStorage.getItem("access");
}
