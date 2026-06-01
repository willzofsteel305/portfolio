import {
  getToken,
  logout,
  fetchContent,
  deleteContent,
  createContent,
  uploadFile,
  fetchMessages
} from "./api.js";

if (!getToken()) window.location.href = "index.html";

document.getElementById("logout-btn").addEventListener("click", logout);

const contentList = document.getElementById("content-list");
const messagesBox = document.getElementById("messages");
const addStatus = document.getElementById("add-status");

// Load content
async function loadContent() {
  const items = await fetchContent();
  contentList.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <img src="${item.thumbnail || ""}">
      <h3>${item.title}</h3>
      <p>${item.type}</p>
      <button data-id="${item._id}" class="delete-btn">Delete</button>
    `;

    contentList.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await deleteContent(btn.dataset.id);
      loadContent();
    });
  });
}

// Load messages
async function loadMessages() {
  const msgs = await fetchMessages();
  messagesBox.innerHTML = "";

  msgs.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML = `
      <h4>${m.name} (${m.email})</h4>
      <p>${m.subject || ""}</p>
      <p>${m.message}</p>
    `;

    messagesBox.appendChild(div);
  });
}

// Add new content
document.getElementById("add-btn").addEventListener("click", async () => {
  addStatus.textContent = "Uploading...";

  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  let thumbnailUrl = "";
  let fileUrl = "";

  const thumbFile = document.getElementById("thumbnail").files[0];
  const uploadFileInput = document.getElementById("file").files[0];
  const externalUrl = document.getElementById("url").value;

  if (thumbFile) {
    const uploaded = await uploadFile(thumbFile);
    thumbnailUrl = uploaded.fileUrl;
  }

  if (uploadFileInput) {
    const uploaded = await uploadFile(uploadFileInput);
    fileUrl = uploaded.fileUrl;
  } else if (externalUrl) {
    fileUrl = externalUrl;
  }

  const res = await createContent({
    type,
    title,
    description,
    url: fileUrl,
    thumbnail: thumbnailUrl
  });

  addStatus.textContent = "Content added!";
  loadContent();
});

// Initial load
loadContent();
loadMessages();
