# Notaty

A web app for taking, editing, deleting, and searching notes. Built with Node.js, Express, and MongoDB.

## Features

- Create, edit, and delete notes
- Search notes by keywords
- Persistent storage with MongoDB

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- HTML, CSS, JS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdulazizAlzamil/notaty.git
   cd notaty
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`

## Usage

- Add a new note using the "Add Note" button.
- Edit or delete existing notes.
- Use the search bar to filter notes by title.
