const updateNotesTable = (noteId, searchTitle) => {
  const table = document.getElementById("notes-table");

  let rowCount = table.rows.length;
  while (--rowCount) {
    table.deleteRow(rowCount);
  }

  getNotes(searchTitle)
    .then((notes) => {
      notes.forEach((note) => {
        const row = table.insertRow(1);
        row.dataset.id = note._id;

        const title = row.insertCell(0);
        const content = row.insertCell(1);
        const updatedDate = row.insertCell(2);
        const actionButtons = row.insertCell(3);

        title.innerHTML = note["title"];
        content.innerHTML = note["content"];
        updatedDate.innerHTML = note["updatedDate"];
        actionButtons.innerHTML = `
          <a href="#" onclick="openEditModal('${note._id}')"><img src="images/edit.png" style="width: 22px;"></a>
          <a href="#" onclick="confirmDeleteNote('${note._id}')"><img src="images/delete.png" style="width: 22px;"></a>
        `;
      });
    })
    .then(() => {
      if (noteId) {
        let row = Array.from(table.rows);
        row = row.find((row) => row.dataset.id == noteId);
        row.style.animation = "new-row 5s";
      }
    });
};

const searchNotes = () => {
  const searchTitle = document.getElementById("searchInput").value;
  updateNotesTable(undefined, searchTitle);
};

const confirmDeleteNote = (noteId) => {
  const action = confirm("Are you sure you want to delete this note?");

  if (action) {
    deleteNote(noteId).then(updateNotesTable);
  }
};

const saveNewNote = () => {
  const title = document.getElementById("addTitle").value;
  const content = document.getElementById("addContent").value;
  const note = {
    title,
    content,
  };

  if (!title || !content)
    document.getElementById("addError").textContent =
      "Please make sure the title and the content are filled up";
  else {
    addNote(note)
      .then((res) => {
        if (res.ok) {
          closeAddModal();
          res.json().then(({ _id }) => {
            updateNotesTable(_id);
          });
        } else {
          res.text().then((err) => {
            document.getElementById("addError").textContent = err;
          });
        }
      })
      .catch((err) => {
        document.getElementById("addError").textContent = err;
      });
  }
};

const saveEditNote = () => {
  const title = document.getElementById("editTitle").value;
  const content = document.getElementById("editContent").value;
  const id = document.getElementById("editNoteModal").dataset.id;
  const note = {
    _id: id,
    title,
    content,
  };

  if (!title || !content)
    document.getElementById("editError").textContent =
      "Please make sure the title and the content are filled up";
  else {
    updateNote(note)
      .then((res) => {
        if (res.ok) {
          closeEditModal();
          updateNotesTable(id);
        } else {
          res.text().then((err) => {
            document.getElementById("editError").textContent = err;
          });
        }
      })
      .catch((err) => {
        document.getElementById("editError").textContent = err;
      });
  }
};
