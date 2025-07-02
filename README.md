# 📚 Book Notes Web App

A minimal and elegant web app to help you **track the books you've read** and **store personal notes** for each book — built with **Node.js, Express, EJS, and PostgreSQL**. Fetches book cover images automatically using the **Open Library Covers API** via ISBN!

---

## ✨ Features

- 📖 Add books using **ISBN**, title auto-fetches.
- 📝 Save personal notes for each book.
- 🖼️ Book cover image fetched from **Open Library** API.
- 🧾 View details of each book in a clean layout.
- 🗑️ Delete books with a confirmation modal.
- 🎨 Fully responsive and styled with custom **CSS**.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS
- **Database:** PostgreSQL
- **External API:** Open Library Covers API
- **Frontend:** HTML, CSS (Vanilla)

---

## 1. Install dependencies
<pre><code>npm install</code></pre>

## 2. Configure PostgreSQL
Make sure PostgreSQL is running and create a database:
<pre><code>CREATE DATABASE booksNotes;</code></pre>

Then create the table:

<pre><code>CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  isbn TEXT,
  notes TEXT,
  cover_url TEXT
);
</code></pre>

## 3. Run the server
<pre><code>npm start</code></pre>

---

- The server will start on:
🌐 http://localhost:3000

  ### API Used
- [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)

---

## 📁 Folder Structure
<pre><code>├── public/
│   └── assets/
│       └── style/           # CSS
├── views/
│   ├── partials/            # Navbar and layout includes
│   ├── index.ejs            # Home page
│   ├── add.ejs              # Add book form
│   └── details.ejs          # Book details view
├── index.js                 # Main server file
├── package.json
└── README.md
</code></pre>

## 🙋‍♂️ Author
**Achintya Mahajan**
- 💼 [LinkedIn](https://www.linkedin.com/in/iamachintya/)
- 🌐[Portfolio](https://avm08122005.github.io/my-portfolio/)

## ⭐ Show your support

If you found this project helpful, feel free to:

- ⭐ Star it on GitHub  
- 🍴 Fork it and improve it  
- 🧠 Share feedback or contribute  
