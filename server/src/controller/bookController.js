import Book from "../models/Book.js";

// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE BOOK
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD BOOK (Admin)
// 

export const getCategories = async (req, res) => {
  const categories = await Book.distinct("category");

  res.json({
    success: true,
    categories,
  });
};

export const getSampleBooks = async (req, res) => {
  const books = await Book.find().limit(6);

  res.json({
    success: true,
    books,
  });
};

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      category,
      shortDescription,
      longDescription,
      image,
      stock,
    } = req.body;

    const newBook = await Book.create({
      title,
      author,
      price,
      category,
      shortDescription,
      longDescription,
      image,
      stock,
      adminId: req.user._id,   // 👈 important
    });

    res.json({
      success: true,
      message: "Book Added Successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Book Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, price, category, shortDescription, longDescription, image, stock } = req.body;
    const update = {};
    if (title != null) update.title = title;
    if (author != null) update.author = author;
    if (price != null) update.price = Number(price);
    if (category != null) update.category = category;
    if (shortDescription != null) update.shortDescription = shortDescription;
    if (longDescription != null) update.longDescription = longDescription;
    if (image != null) update.image = image;
    if (stock != null) update.stock = Number(stock);

    const book = await Book.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({
      success: true,
      message: "Book Updated",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
