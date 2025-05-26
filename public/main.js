const socket = io();

// Pošalji poruku
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  socket.emit("chat message", message); // Real-time emit
  input.value = "";
});

// Funkcija za prikaz poruka u istom stilu
function renderMessages(messages) {
  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  messages.forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message-item";

    const userImg = document.createElement("img");
    userImg.src = "img/user-placeholder.png";
    userImg.alt = "user";
    userImg.className = "user-avatar";

    const userWrapper = document.createElement("div");
    userWrapper.className = "user-wrapper";
    userWrapper.appendChild(userImg);

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const time = document.createElement("div");
    time.className = "message-time";
    time.textContent = new Date(msg.timestamp).toLocaleString();

    const text = document.createElement("div");
    text.className = "message-text";
    text.textContent = msg.message;

    messageContent.appendChild(time);
    messageContent.appendChild(text);

    messageDiv.appendChild(userWrapper);
    messageDiv.appendChild(messageContent);

    list.appendChild(messageDiv);
  });
}

// Učitaj poruke iz baze na početku i prikazi
async function loadMessages() {
  const res = await fetch("/api");
  const messages = await res.json();
  renderMessages(messages);
}

// Prikaži novu poruku koja dođe preko socket.io
socket.on("chat message", (msg) => {
  const list = document.getElementById("messagesList");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message-item";

  const userImg = document.createElement("img");
  userImg.src = "img/user-placeholder.png";
  userImg.alt = "user";
  userImg.className = "user-avatar";

  const userWrapper = document.createElement("div");
  userWrapper.className = "user-wrapper";
  userWrapper.appendChild(userImg);

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = new Date(msg.timestamp).toLocaleString();

  const text = document.createElement("div");
  text.className = "message-text";
  text.textContent = msg.message;

  messageContent.appendChild(time);
  messageContent.appendChild(text);

  messageDiv.appendChild(userWrapper);
  messageDiv.appendChild(messageContent);

  list.appendChild(messageDiv);
});

// Start
loadMessages();
