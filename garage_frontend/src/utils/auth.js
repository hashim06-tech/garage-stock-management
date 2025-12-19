const API_URL = "https://garage-stock-management.onrender.com";

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

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.reload();
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function isLoggedIn() {
  return !!localStorage.getItem("access");
}
