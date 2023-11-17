import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager

export const webRouter = express.Router()

webRouter.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products }); 
})

webRouter.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
  });
