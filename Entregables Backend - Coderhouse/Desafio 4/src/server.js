import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { ProductManager } from './productManager.js';
import { webRouter } from './Routers/webRouter.js';

export const productManager = new ProductManager;

const port = 8080;
const app = express();

app.engine('.handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static'));

const server = app.listen(port, () => {console.log(`Servidor Express escuchando en el puerto ${port}`);});

const io = new Server(server);

app.use('/', webRouter);

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
  });

});