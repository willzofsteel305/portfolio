const API_BASE = "https://YOUR-BACKEND.onrender.com/api";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/content`);
  return res.json();
}

export async function deleteContent(id) {
  const res = await fetch(`${API_BASE}/content/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}

export async function createContent(data) {
  const res = await fetch(`${API_BASE}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form
  });

  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/contact`);
  return res.json();
}

