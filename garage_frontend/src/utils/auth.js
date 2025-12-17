export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  // ✅ If no refresh token, do nothing
  if (!refresh) return false;

  try {
    const res = await fetch("https://garage-stock-management.onrender.com", {
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
    // ✅ IMPORTANT: prevent app crash
    console.error("Refresh token failed:", error);
    return false;
  }
}
