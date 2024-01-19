import { Router } from 'express';
import { obtenerCart, obtenerCartById, crearCart, updateProductInCart,addNewProduct,deleteCart,delCartProduct} from '../../controllers/cartsControllers.js'

export const cartRouter = Router();

cartRouter.get('/', obtenerCart);
cartRouter.get('/:cid', obtenerCartById);
cartRouter.post('/', crearCart);
cartRouter.put('/:cid/product/:pid', updateProductInCart);
cartRouter.put('/:cid/add/:pid', addNewProduct);
cartRouter.delete('/:cid', deleteCart);
cartRouter.delete('/:cid/product/:pid', delCartProduct);
