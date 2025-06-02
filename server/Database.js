const mongoose = require("mongoose");
const Note = require("./schemas/note");

class Database {
  constructor() {
    this.Url = process.env.MONGODB_URI || "mongodb://localhost:27017/notaty";
  }

  connect() {
    mongoose
      .connect(this.Url)
      .then(() => {
        console.log("Connected to MongoDB successfully!");
        console.log("Database URL:", this.Url);
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
      });
  }

  addNote(note) {
    return new Promise((res, rej) => {
      note["createdDate"] = new Date();
      note["updatedDate"] = new Date();

      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => {
          res(doc);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  getNotes() {
    return new Promise((res, rej) => {
      Note.find({})
        .then((data) => {
          res(data);
        })
        .catch((err) => rej(err));
    });
  }

  getNoteById(id) {
    return new Promise((res, rej) => {
      Note.findById(id)
        .then((data) => res(data))
        .catch((err) => rej(err));
    });
  }

  getNotesByTitle(title) {
    return new Promise((res, rej) => {
      const query = { title: { $regex: new RegExp(title, "i") } };
      Note.find(query)
        .then((data) => res(data))
        .catch((err) => rej(err));
    });
  }

  updateNote(note) {
    note["updatedDate"] = new Date();
    return new Promise((res, rej) => {
      Note.findByIdAndUpdate(note["_id"], note)
        .then((data) => res(data))
        .catch((err) => rej(err));
    });
  }

  deleteNote(id) {
    return new Promise((res, rej) => {
      Note.findByIdAndDelete(id)
        .then((data) => res(data))
        .catch((err) => rej(err));
    });
  }
}

module.exports = Database;
