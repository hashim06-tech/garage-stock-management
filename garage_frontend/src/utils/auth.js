const API_URL = "https://garage-stock-management.onrender.com";

/**
 * Login user and get JWT tokens
 */
export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return await response.json();
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

/**
 * Get access token
 */
export function getAccessToken() {
  return localStorage.getItem("access");
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
  return !!localStorage.getItem("access");
}
