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
  loadMessages();
});

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

loadMessages();
