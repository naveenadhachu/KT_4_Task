const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// CREATE BOOK
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ BOOKS
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;
