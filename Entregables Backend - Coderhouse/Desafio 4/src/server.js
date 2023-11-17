import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { ProductManager } from './productManager.js';
import { CartManager } from './cartManager.js';
import { productsRouter } from './Routers/productsRouter.js';
import { cartsRouter } from './Routers/cartsRouter.js';
import { webRouter } from './Routers/webRouter.js';

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.engine('.handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', webRouter)
app.use('/realTimeProducts', webRouter)


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

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});