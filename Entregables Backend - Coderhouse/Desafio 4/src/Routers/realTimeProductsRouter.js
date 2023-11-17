import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager

export const realTimeProductsRouter = express.Router()

realTimeProductsRouter.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
  });

