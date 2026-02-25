import express from "express";
import { myOrders, getConfirmedOrders } from "../controller/orderController.js";
import { protect } from "../midleware/authMiddleware.js";
import { adminAuth } from "../midleware/adminAuth.js";

const routerss = express.Router();

routerss.get("/my", protect, myOrders);
routerss.get("/admin/confirmed", protect, adminAuth, getConfirmedOrders);

export default routerss;
