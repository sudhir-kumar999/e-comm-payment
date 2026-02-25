import express from "express"
import { getMe, login, logout, register } from "../controller/authController.js"
import { protect } from "../midleware/authMiddleware.js"
import { authorize } from "../midleware/authorize.js"
const router =express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/logout",protect,logout)
router.get("/fetch", protect, authorize("user", "admin"), getMe)

export default router