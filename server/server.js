const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Database = require("./Database");
const db = new Database();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/notes", (req, res) => {
  const body = req.body;
  db.addNote(body)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

app.get("/notes", (req, res) => {
  const { title } = req.query;
  if (title) {
    db.getNotesByTitle(title)
      .then((data) => res.send(data))
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    db.getNotes()
      .then((data) => res.send(data))
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

app.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db.getNoteById(id)
    .then((data) => {
      if (!data) res.status(404).send(`Note id doesn't exist: ${id}`);
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/notes/", (req, res) => {
  const note = req.body;

  db.updateNote(note)
    .then((data) => {
      if (!data) res.status(404).send(`Note id doesn't exist: ${id}`);
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  db.deleteNote(id)
    .then((data) => {
      if (!data) res.status(404).send(`Note id doesn't exist: ${id}`);
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db.connect();
});
