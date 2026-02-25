import express from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  getCategories,
  getSampleBooks,
  deleteBook,
} from "../controller/bookController.js";
import { adminAuth } from "../midleware/adminAuth.js";
import { protect } from "../midleware/authMiddleware.js";

const router = express.Router();

// 🔥 SPECIFIC ROUTES PEHLE

router.get("/categories", getCategories);
router.get("/sample", getSampleBooks);

// 🔥 GENERAL ROUTES BAAD ME

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", addBook);
router.post("/add", protect, adminAuth, addBook);
router.put("/:id", protect, adminAuth, updateBook);
router.delete("/:id", protect, adminAuth, deleteBook);


export default router;
