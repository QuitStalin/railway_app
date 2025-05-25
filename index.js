const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const Datastore = require("nedb");

const port = process.env.PORT || 8000;
const database = new Datastore({ filename: "database.db", autoload: true });

// Middleware
app.use(express.static("public"));
app.use(express.json());

// REST API - za početno učitavanje poruka
app.get("/api", (req, res) => {
  database
    .find({})
    .sort({ timestamp: 1 })
    .exec((err, docs) => {
      if (err) return res.status(500).send(err);
      res.json(docs);
    });
});

// Socket.io dio
io.on("connection", (socket) => {
  console.log("✅ Novi korisnik povezan");

  socket.on("chat message", (msg) => {
    const messageObj = {
      message: msg,
      timestamp: Date.now(),
    };

    database.insert(messageObj); // Sačuvaj u bazu
    io.emit("chat message", messageObj); // Pošalji svima
  });
});

// Start server
http.listen(port, () => {
  console.log(`🚀 Server radi na portu ${port}`);
});
