import express from 'express';
import { Product } from '../models/productsMongoose.js'
import { Cart } from '../models/cartsMongoose.js'

const cartsRouter = express.Router();

// Endpoint para obtener todos los carritos
cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un carrito por su ID
cartsRouter.get('/:cartId', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('cart.productID');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para agregar un producto al carrito
cartsRouter.post('/:cartId/addProduct', async (req, res) => {
    try {
        const { productID, cant } = req.body;
        
        // Verificar si el producto existe
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el carrito existe
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Agregar el producto al carrito
        cart.cart.push({ productID, cant });
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint para actualizar un producto en el carrito
cartsRouter.put('/:cartId/updateProduct/:productId', async (req, res) => {
    try {
        const { cant } = req.body;

        // Verificar si el carrito existe
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Buscar el índice del producto en el carrito
        const productIndex = cart.cart.findIndex((item) => item.productID === req.params.productId);

        // Verificar si el producto está en el carrito
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        // Actualizar la cantidad del producto en el carrito
        cart.cart[productIndex].cant = cant;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para eliminar un producto del carrito
cartsRouter.delete('/:cartId/removeProduct/:productId', async (req, res) => {
    try {
        // Verificar si el carrito existe
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Filtrar los productos que no sean el que se desea eliminar
        cart.cart = cart.cart.filter((item) => item.productID !== req.params.productId);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default cartsRouter;