import express from 'express';
import { Product } from '../../../../../../../../Downloads/repositorioRodrigoAhumada-main (2)/repositorioRodrigoAhumada-main/Entregables Backend - Coderhouse/Segunda Entrega Proyecto Final - Rodrigo Ahumada/src/models/productsMongoose.js'
import { Cart } from '../../../../../../../../Downloads/repositorioRodrigoAhumada-main (2)/repositorioRodrigoAhumada-main/Entregables Backend - Coderhouse/Segunda Entrega Proyecto Final - Rodrigo Ahumada/src/models/cartsMongoose.js'

export const cartsRouter = express.Router();

// Endpoint para obtener todos los carritos
cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.render('carts', { carts }); // Renderiza la vista 'carts' con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un carrito por su ID
cartsRouter.get('/:cartId', async (req, res) => {
    try {
        // Obtener el carrito asociado al ID de Socket.IO (puedes usar el mismo ID)
        const cart = await Cart.findById(req.params.cartId).populate('cart.productID');
        res.render('carts', { cart }); // Renderiza la vista 'carts' con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.render('carts', { newCart }); // Renderiza la vista 'carts' con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para agregar un producto al carrito
// Endpoint para agregar un producto al carrito
cartsRouter.post('/:cartId/addProduct', async (req, res) => {
    try {
        const { productID, cant } = req.body;

        // Convertir la cadena productID a un ObjectId válido
        const validProductID = mongoose.Types.ObjectId(productID);
        if (!mongoose.Types.ObjectId.isValid(validProductID)) {
            return res.status(400).json({ error: 'ID de producto no válido' });
        }
        
        // Verificar si el carrito existe
        const cart = await Cart.findById(req.params.cartId).populate('cart.product');
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Verificar si el producto existe
        const product = await Product.findById(validProductID);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingItemIndex = cart.cart.findIndex(item => item.productID.equals(validProductID));

        if (existingItemIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            cart.cart[existingItemIndex].cant += cant;
        } else {
            // Si el producto no está en el carrito, agregarlo con la cantidad proporcionada
            cart.cart.push({ product: validProductID, cant });
        }

        // Guardar el carrito actualizado en la base de datos
        await cart.save();

        // Emitir actualización del carrito al cliente que realizó la acción
        io.to(req.params.cartId).emit('updateCart', cart);

        // Renderizar la vista 'carts' con el carrito actualizado
        res.render('carts', { cart });
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

        res.render('carts', { cart });
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

        res.render('carts', { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});