const express = require("express");
const app = express();
const http = require("http").createServer(app); // promena
const io = require("socket.io")(http); // dodaj socket.io
const Datastore = require("nedb");
const port = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());

const database = new Datastore({ filename: "database.db" });
database.loadDatabase();

// POST /api ostaje skoro isti, ali sa emitom
app.post("/api", (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();

  database.insert(data, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    io.emit("newMessage", newDoc); // EMITUJEMO SVIMA
    res.json(newDoc);
  });
});

app.get("/gimmeData", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    res.json(data);
  });
});

// Socket.io connection log
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
});

// umesto app.listen, sad koristi http.listen
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
