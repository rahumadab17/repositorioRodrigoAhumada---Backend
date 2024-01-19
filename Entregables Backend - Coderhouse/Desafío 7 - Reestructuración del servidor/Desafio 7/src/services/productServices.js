import {ProductDao} from '../dao/productDao.js';

export class ProductService{

   static addNewProduct = async (newProductData) => {
        try {
            // Validar que el precio del nuevo producto no sea negativo
            if (newProductData.price < 0) {
                throw new Error('El precio del producto no puede ser negativo.');
            }

            // Luego, creas el producto usando el DAO
            return await ProductDao.addNewProduct(newProductData);
        } catch (error) {
            throw new Error(`Error en el servicio de productos: ${error.message}`);
        }
    };
}