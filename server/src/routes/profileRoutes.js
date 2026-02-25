import express from "express";
import User from "../models/userModels.js";
import { protect } from "../midleware/authMiddleware.js";

const router = express.Router();


// ============================
// GET PROFILE
// ============================
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ============================
// UPDATE PROFILE
// ============================
router.put("/", protect, async (req, res) => {
  try {
    const { name, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, address },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

export default router;