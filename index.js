import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("Select * from books order by id desc");
    res.render("index", { books: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error fetching books");
  }
});

app.post("/add", async (req, res) => {
  const { isbn, notes } = req.body;

  try {
    const response = await axios.get(
      `https://openlibrary.org/isbn/${isbn}.json`
    );
    const bookData = response.data;
    const title = bookData.title;

    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

    await db.query(
      "INSERT INTO books (title, isbn, notes, cover_url) VALUES ($1, $2, $3, $4)",
      [title, isbn, notes, coverUrl]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error.message);
    res.send(
      "Failed to add book. Make sure the ISBN is correct and exists on Open Library."
    );
  }
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await db.query("Select * from books where id = $1", [
      bookId,
    ]);

    if (result.rows.length === 0) {
      return res.send("No book found");
    }

    const book = result.rows[0];
    res.render("details.ejs", { book });
  } catch (err) {
    console.error(err);
    res.send("Error fetching book details");
  }
});

app.post("/delete/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.send("Failed to delete book.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
