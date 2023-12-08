import express from 'express';
import { Product } from '../models/productsMongoose.js'

const productsRouter = express.Router();

// Endpoint para obtener todos los productos
productsRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
productsRouter.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.get('/filterByCategory/:category', async (req, res) => {
  try {
      const products = await Product.find({ category: req.params.category });
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Endpoint para filtrar productos por precio
productsRouter.get('/filterByPrice/:minPrice/:maxPrice', async (req, res) => {
  try {
      const { minPrice, maxPrice } = req.params;
      const products = await Product.find({
          price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
      });
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Otros endpoints para filtrar, actualizar, eliminar productos, etc...

export default productsRouter;