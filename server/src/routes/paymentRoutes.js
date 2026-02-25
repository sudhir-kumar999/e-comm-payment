import express from "express";
import { createOrder, verifyPayment } from "../controller/paymentController.js";
import { razorpayWebhook } from "../controller/webhookController.js";
import { protect } from "../midleware/authMiddleware.js";

const routers = express.Router();

routers.post("/create", protect, createOrder);
routers.post("/verify", verifyPayment);
routers.post("/webhook", razorpayWebhook);

export default routers;
