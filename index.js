const express = require("express");
const Datastore = require("nedb");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const db = new Datastore({ filename: "database.db", autoload: true });

app.post("/api", (req, res) => {
  const data = {
    message: req.body.message || "No message",
    timestamp: Date.now(),
  };
  db.insert(data);
  res.json({ status: "success", data });
});

app.get("/api", (req, res) => {
  db.find({})
    .sort({ timestamp: -1 })
    .exec((err, docs) => {
      res.json(docs);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
