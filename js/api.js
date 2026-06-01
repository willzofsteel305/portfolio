const API_BASE = "https://YOUR-BACKEND.onrender.com/api";

// Fetch all content
export async function fetchAllContent() {
  const res = await fetch(`${API_BASE}/content`);
  return res.json();
}

// Fetch content by type (music, video, art)
export async function fetchContentByType(type) {
  const res = await fetch(`${API_BASE}/content/${type}`);
  return res.json();
}

// Send contact form
export async function sendContactForm(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
