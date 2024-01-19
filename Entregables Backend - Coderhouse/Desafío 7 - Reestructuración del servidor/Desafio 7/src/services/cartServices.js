import {CartDao} from '../dao/cartDao.js';

export class CartService{

    static updateProductInCart = async (cartId, productId, nuevaCantidad) => {
        try {
            // Verificar que la nueva cantidad sea un número válido y no sea negativa
            const cantidadNumerica = parseInt(nuevaCantidad);
            if (isNaN(cantidadNumerica) || cantidadNumerica < 0) {
                throw new Error('La nueva cantidad debe ser un número válido y no puede ser negativa.');
            }

            // Verificar que el producto exista en el carrito antes de actualizar la cantidad
            const carrito = await CartDao.obtenerCartById(cartId);
            const productoEnCarrito = carrito.carrito.find(item => item._id.toString() === productId);
            if (!productoEnCarrito) {
                throw new Error('El producto no existe en el carrito.');
            }

            // Actualizar la cantidad usando el DAO
            return await CartDao.updateProductInCart(cartId, productId, cantidadNumerica);
        } catch (error) {
            throw new Error(`Error en el servicio de carritos: ${error.message}`);
        }
    };
}