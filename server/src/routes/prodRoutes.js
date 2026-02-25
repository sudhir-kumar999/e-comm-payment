import express from "express";
import { protect } from "../midleware/authMiddleware.js";
import { productDetails } from "../controller/prodController.js";
import { authorize } from "../midleware/authorize.js";
const routing = express.Router();

routing.get("/details", protect,authorize("user"), productDetails);

export default routing;
