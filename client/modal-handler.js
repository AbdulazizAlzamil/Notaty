const openAddModal = () => {
  const modal = document.getElementById("addNoteModal");

  clearAddModal();

  modal.style.display = "block";
};

const clearAddModal = () => {
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
  document.getElementById("addError").textContent = "";
};

const closeAddModal = () => {
  const modal = document.getElementById("addNoteModal");

  modal.style.display = "none";
};

const openEditModal = (noteId) => {
  const modal = document.getElementById("editNoteModal");
  modal.dataset.id = noteId;

  getNoteById(noteId)
    .then(({ title, content }) => {
      document.getElementById("editTitle").value = title;
      document.getElementById("editContent").value = content;
    })
    .catch((err) => console.log(err));

  modal.style.display = "block";
};

const closeEditModal = () => {
  const modal = document.getElementById("editNoteModal");

  modal.style.display = "none";
};
