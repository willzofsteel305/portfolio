import { login, setToken } from "./api.js";

document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  status.textContent = "Logging in...";

  const res = await login(username, password);

  if (res.token) {
    setToken(res.token);
    window.location.href = "dashboard.html";
  } else {
    status.textContent = "Invalid credentials";
  }
});
