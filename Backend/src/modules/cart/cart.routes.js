import express from "express";
import { addToCart,getCart,removeCart } from "./cart.controller.js";

const router=express.Router();  

router.post("/addToCart",addToCart);
router.post("/getCart",getCart);
router.post("/removeCart",removeCart);
export default router;