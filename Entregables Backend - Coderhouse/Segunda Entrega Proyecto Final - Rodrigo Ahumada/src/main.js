import express from 'express';
import  mongoose from 'mongoose';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { apiRouter } from './Routers/apiRouter.js';
import { webRouter } from './Routers/webRouter.js';
import { MONGODB_CNX_STR, PORT } from './config.js';
import { Product } from './models/productsMongoose.js';
import { Cart } from './models/cartsMongoose.js';


const app = express();

app.engine('.handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static'));

const server = app.listen(PORT, () => {console.log(`servidor http escuchando en el puerto ${PORT}`);});

const io = new Server(server);

try {
  await mongoose.connect(MONGODB_CNX_STR);
  console.log(`Base de datos conectada a ${MONGODB_CNX_STR}`);
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

app.use('/api', apiRouter);
app.use('/', webRouter);

io.on('connection', socket => {
  console.log('Usuario conectado', socket.id);

  socket.emit('mensajeServidor', 'Bienvenido a Rorro Bikes!')

  socket.emit('actualizacion', { products: Product.find() });

  socket.on('createNewCart', async (callback) => {
    // Lógica para crear un nuevo carrito
    try {
        const newCart = await Cart.create({ status: true, cart: [] });
        console.log('Nuevo carrito creado:', newCart);
        callback({ status: 'success' });
        io.sockets.emit('viewCart', { cart: await Cart.findById(newCart._id).populate('cart.productID') });
    } catch (error) {
        console.error('Error al crear un nuevo carrito:', error);
        callback({ status: 'error', error: error.message });
    }
});

socket.on('addToCart', async ({ productId }, callback) => {
  const cartId = 'cart1';
  try {
    await Cart.addProductToCart(cartId, productId);
    console.log('Producto agregado al carrito.');
    callback({ status: 'success' });
    io.emit('viewCart', { cart: (await Cart.findOne({ status: true })).cart });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    callback({ status: 'error', error: error.message });
  }
});

socket.on('deleteCart', async ({ cartId }, callback) => {
  // Lógica para eliminar el carrito
  try {
      await Cart.findByIdAndDelete(cartId);
      console.log('Carrito eliminado.');
      callback({ status: 'success' });
      io.sockets.emit('viewCart', { cart: null }); // No hay carrito después de eliminar
  } catch (error) {
      console.error('Error al eliminar el carrito:', error);
      callback({ status: 'error', error: error.message });
  }
});

})