import { Router } from 'express';
import { obtenerProductos, obtenerCategorias, obtenerProductById,addNewProduct,updateProduct,deleteProduct} from '../../controllers/productsControllers.js';

export const productsRouter = Router();

productsRouter.get('/', obtenerProductos);
productsRouter.get('/cat/', obtenerCategorias);
productsRouter.get('/:pid', obtenerProductById);
productsRouter.post('/', addNewProduct);
productsRouter.put('/:pid', updateProduct);
productsRouter.delete('/:pid', deleteProduct);