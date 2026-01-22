import express from "express";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/order", OrderController.placeOrder);

export default router;

