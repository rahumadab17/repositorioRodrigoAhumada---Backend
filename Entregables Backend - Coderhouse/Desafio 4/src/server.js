import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { ProductManager } from './productManager.js';
<<<<<<< Updated upstream
import { CartManager } from './cartManager.js';
import { productsRouter } from './Routers/productsRouter.js';
import { cartsRouter } from './Routers/cartsRouter.js';
import { homeRouter } from './Routers/homeRouter.js';
import { realTimeProductsRouter } from './Routers/realTimeProductsRouter.js';
=======
import { webRouter } from './Routers/webRouter.js';

export const productManager = new ProductManager;
>>>>>>> Stashed changes

const port = 8080;
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.engine('.handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static'));

<<<<<<< Updated upstream
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', homeRouter)
app.use('/', realTimeProductsRouter)
=======
>>>>>>> Stashed changes

const server = app.listen(port, () => {console.log(`Servidor Express escuchando en el puerto ${port}`);});

const io = new Server(server);

//app.use((req, res, next) => {
//  req['io'] = io
//  next()
//})

app.use('/', webRouter);

<<<<<<< Updated upstream
// Socket.io setup
io.on('connection', (socket) => {
  console.log('Usuario conectado', socket.id);

  // Emitir la lista de productos cuando alguien se conecta
  io.emit('updateProducts', productManager.getProducts());

  // Manejar eventos cuando se agrega un nuevo producto
  socket.on('addProduct', (productData) => {
    productManager.addProduct(productData);
    io.emit('updateProducts', productManager.getProducts());
    console.log('Producto agregado exitosamente');
=======
io.on('connection', socket => {
  console.log('Usuario conectado', socket.id);

  socket.emit('mensajeServidor', 'Bienvenido a Rorro Bikes!')
  
  socket.emit ('actualizacion', {products: productManager.getProducts()})
  
  socket.on('addProduct', async (product, callback) => {
    const respuesta = productManager.addProduct(product)
    if (respuesta) {
      console.log('Producto añadido exitosamente.');
    } else {
      console.log('Error al añadir el producto.');
    } 
    
    callback({status: respuesta}) 
    io.sockets.emit('actualizacion', {products: productManager.getProducts()})
>>>>>>> Stashed changes
  });

  // Manejar eventos cuando se elimina un producto
  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', productManager.getProducts());
    console.log('Producto eliminado exitosamente')
  });

  // Manejar eventos de desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

<<<<<<< Updated upstream
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
=======
>>>>>>> Stashed changes
