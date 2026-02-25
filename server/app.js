import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/prodRoutes.js";
// import paymentRoutes from "./src/routes/paymentRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import routers from "./src/routes/paymentRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://react-next-supabase.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// 🔥 MOST IMPORTANT FIX

// 1. ONLY webhook route should use RAW body
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  routers
);

// 2. Rest all routes use JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/auth", userRoutes);

app.use("/books", bookRoutes);

app.use("/product", productRoutes);

// normal payment routes (create, verify etc)
app.use("/payment", routers);

app.use("/orders", orderRoutes);

export default app;
