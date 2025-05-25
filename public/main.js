const socket = io();

// Pošalji poruku
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  socket.emit("chat message", message); // Real-time emit
  input.value = "";
});

// Učitaj poruke iz baze na početku
async function loadMessages() {
  const res = await fetch("/api");
  const messages = await res.json();
  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  messages.forEach((msg) => {
    const li = document.createElement("li");
    const time = new Date(msg.timestamp).toLocaleString();
    li.textContent = `[${time}] ${msg.message}`;
    list.appendChild(li);
  });
}

// Prikaži nove poruke koje dođu preko socket.io
socket.on("chat message", (msg) => {
  const list = document.getElementById("messagesList");
  const li = document.createElement("li");
  const time = new Date(msg.timestamp).toLocaleString();
  li.textContent = `[${time}] ${msg.message}`;
  list.appendChild(li);
});

// Start
loadMessages();
