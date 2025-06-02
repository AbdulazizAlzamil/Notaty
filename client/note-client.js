import baseUrl from "./config.js";

const addNote = async (noteData) => {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  return response;
};

const updateNote = async (noteData) => {
  const response = await fetch(`${baseUrl}/notes/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  return response;
};

const deleteNote = async (noteId) => {
  const response = await fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
  });

  return response;
};

const getNoteById = async (noteId) => {
  const response = await fetch(`${baseUrl}/notes/${noteId}`);

  return response.json();
};

const getNotes = async (noteTitle) => {
  let url = `${baseUrl}/notes`;
  if (noteTitle) url += `?title=${noteTitle}`;

  const response = await fetch(url);

  return response.json();
};
