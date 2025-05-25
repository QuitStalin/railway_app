const socket = io(); // konekcija sa serverom

document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  input.value = "";
  // Ne moraš više ručno pozivati loadMessages jer će real-time ažurirati
});

// Prvo učitavanje svih poruka
async function loadMessages() {
  const res = await fetch("/api");
  const messages = await res.json();
  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  messages.forEach((msg) => {
    appendMessage(msg);
  });
}

function appendMessage(msg) {
  const li = document.createElement("li");
  const time = new Date(msg.timestamp).toLocaleString();
  li.textContent = `[${time}] ${msg.message}`;
  document.getElementById("messagesList").appendChild(li);
}

// Realtime: kada stigne nova poruka, odmah je prikaži
socket.on("newMessage", (data) => {
  appendMessage(data);
});

loadMessages();
