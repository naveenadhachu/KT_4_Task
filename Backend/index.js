const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Book = require("./models/Book");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/librarydb")

  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

// Default book insertion
async function insertDefaultBooks() {
  const count = await Book.countDocuments();
  if (count === 0) {
    await Book.insertMany([
      {
        title: "Clean Code",
        author: "Robert Martin",
        category: "Programming",
        publishedYear: 2008,
        availableCopies: 5
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        publishedYear: 2018,
        availableCopies: 10
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        category: "Productivity",
        publishedYear: 2017,
        availableCopies: 4
      }
    ]);
    console.log("Default books added");
  }
}

mongoose.connection.once("open", insertDefaultBooks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
