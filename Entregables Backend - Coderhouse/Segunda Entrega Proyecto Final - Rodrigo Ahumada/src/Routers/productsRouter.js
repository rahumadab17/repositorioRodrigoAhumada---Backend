import express from 'express';
import { Product } from '../models/productsMongoose.js'

export const productsRouter = express.Router();

// Endpoint para obtener todos los productos
productsRouter.get('/', async (req, res) => {
    try {
        // Obtener todos los productos desde la base de datos
        const products = await Product.find();

        // Crear nuevos objetos literalmente antes de enviarlos a Handlebars
        const cleanedProducts = products.map(product => ({
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            _id: product._id
        }));

        // Renderizar la vista 'products.handlebars' con los productos limpios
        res.render('products', { products: cleanedProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
productsRouter.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.render('products', { product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productsRouter.get('/filterByCategory/:category', async (req, res) => {
  try {
      const products = await Product.find({ category: req.params.category });
      res.render('products', { products });
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
      res.render('products', { products });
    } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Otros endpoints para filtrar, actualizar, eliminar productos, etc...