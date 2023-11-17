import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager

export const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products }); 
})

