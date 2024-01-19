import { Product } from '../models/products.js';

export class ProductDao {

    // Obtener todos los productos paginados
    static paginado = async (filtro, opciones) => {
        try {
            const paginado= await Product.paginate(filtro, opciones);
            return paginado   
        } catch (error) {
            throw new Error(`Error al obtener los productos paginados: ${error.message}`);
        }
    };

    // Obtener todas las categorías de productos
    static obtenerCategorias = async () => {
        try {
            const categoriasProduct = await Product.aggregate([
                { $group: { _id: "$category" } }
            ]);

            return categoriasProduct;
        } catch (error) {
            throw new Error(`Error al obtener las categorías de productos: ${error.message}`);
        }
    };

    // Obtener un producto por ID
    static obtenerProductById = async (productId) => {
        try {
            const productoById = await Product.findById(productId);

            if (!productoById) {
                throw new Error('El producto buscado no existe en la base de datos');
            }

            return productoById;
        } catch (error) {
            throw new Error(`Error al obtener el producto por ID: ${error.message}`);
        }
    };

    // Crear un nuevo producto
        static addNewProduct = async (newProductData) => {
        try {
            const newProduct = await Product.create(newProductData);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear un nuevo producto: ${error.message}`);
        }
    };

    // Actualizar un producto por ID
    static updateProduct = async (productId, newData) => {
        try {
            if (newData.code) {
                throw new Error('No se puede modificar el código del producto');
            }

            const updProducto = await Product.findByIdAndUpdate(
                productId,
                { $set: newData },
                { new: true }
            );

            if (!updProducto) {
                throw new Error(`El producto con id ${productId} no se encontró`);
            }

            return updProducto;
        } catch (error) {
            throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
        }
    };

    // Eliminar un producto por ID
    static  deleteProduct = async (productId) => {
        try {
            const delProduct = await Product.findByIdAndDelete(productId);

            if (!delProduct) {
                throw new Error(`El producto con id ${productId} no se encontró`);
            }

            return delProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
        }
    };

}