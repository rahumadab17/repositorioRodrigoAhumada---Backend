import { Cart } from '../models/carts.js';


export class CartDao {

// Obtener todos los carritos
  static obtenerCart = async () => {
    try {
        const carritos = await Cart.find().populate('cart.productID');
        return carritos;
    } catch (error) {
        throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  };

// Obtener un carrito por ID
  static obtenerCartById = async (cartId) => {
    try {
        const carritoPorId = await Cart.findById(cartId).populate('cart.productID');
        if (!carritoPorId) {
            throw new Error('El carrito buscado no existe en la base de datos');
        }
        return carritoPorId;
    } catch (error) {
        throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
    }
  };

// Crear un nuevo carrito
  static crearCart = async (newCartData) => {
    try {
        const newCart = await Cart.create(newCartData);
        return newCart;
    } catch (error) {
        throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
    }
  };

// Actualizar la cantidad de un producto en el carrito
  static updateProductInCart = async (cartId, productId, nuevaCantidad) => {
    try {
        const product = await Cart.findByIdAndUpdate(
            cartId,
            { $set: { "carrito.$[elem].cant": nuevaCantidad }},
            { arrayFilters: [{ "elem._id": productId }]},
            { new: true }
        );
        return product;
    } catch (error) {
        throw new Error(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
    }
  };

// Añadir un producto al carrito o incrementar la cantidad si ya existe
  static addNewProduct = async (cartId, productId) => {
    try {
        const productExist = await Cart.find({
            _id: cartId,
            cart: { $elemMatch: { productID: productId } }
        });

        if (productExist.length > 0) {
            // Producto ya existe en el carrito, incrementar cantidad
            const updProduct = await Cart.findByIdAndUpdate(
                cartId,
                { $inc: { "cart.$[elem].cant": 1 }},
                { arrayFilters: [{ "elem.productID": productId }]},
                { new: true }
            );
            return updProduct;
        } else {
            // Añadir nuevo producto al carrito
            const addProduct = await Cart.findByIdAndUpdate(
                cartId,
                { $push: { carrito: { productID: productId, cant: 1 } } },
                { new: true }
            ).lean();
            return addProduct;
        }
    } catch (error) {
        throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  };

// Eliminar un carrito por ID
  static deleteCart = async (cartId) => {
    try {
        const delCart = await Cart.findByIdAndDelete(cartId, { new: true });
        if (!delCart) {
            throw new Error(`El carrito con ID ${cartId} no existe`);
        }
        return delCart;
    } catch (error) {
        throw new Error(`Error al eliminar el carrito por ID: ${error.message}`);
    }
  };

// Eliminar un producto del carrito por ID
  static delCartProduct = async (cartId, productId) => {
    try {
        const delProdInCart = await Cart.findByIdAndUpdate(
            cartId,
            { $pull: { carrito: { _id: productId } } },
            { new: true }
        );
        if (!delProdInCart) {
            throw new Error(`El producto con ID ${productId} no existe en el carrito ${cartId}`);
        }
        return delProdInCart;
    } catch (error) {
        throw new Error(`Error al eliminar el producto del carrito por ID: ${error.message}`);
    }
  };
}