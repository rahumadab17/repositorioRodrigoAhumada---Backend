import express from 'express';
import  mongoose from 'mongoose';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { apiRouter } from './Routers/api/api/apiRouter.js';
import { initRouter} from './Routers/api/api/initRouter.js';
import { MONGODB_CNX_STR, PORT } from './config.js';
import { Product } from './models/productsMongoose.js';
import { Cart } from './models/cartsMongoose.js';


const app = express();

try {
  await mongoose.connect(MONGODB_CNX_STR);
  console.log(`Base de datos conectada a ${MONGODB_CNX_STR}`);
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

app.engine('.handlebars', engine());
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./static'));

const server = app.listen(PORT, () => {console.log(`servidor http escuchando en el puerto ${PORT}`);});

const io = new Server(server);

app.use('/', apiRouter);
app.use('/init', initRouter);

// Importar módulos necesarios y configuración

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Manejar evento para unirse a una habitación (carrito)
    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    // Evento para crear un nuevo carrito o obtener el existente
    socket.on('getActiveCart', async () => {
        try {
            // Obtener el ID único del carrito activo del usuario (usaremos el ID del socket)
            const activeCartId = socket.id;

            // Buscar el carrito activo del usuario en la base de datos
            let activeCart = await Cart.findById(activeCartId);

            if (!activeCart) {
                // Si no existe el carrito activo, crear uno nuevo
                activeCart = new Cart({ _id: activeCartId, cart: [] });
                await activeCart.save();

                // Emitir actualización de carritos activos solo al cliente actual
                socket.emit('updateActiveCarts', [activeCart]);
            } else {
                // Emitir actualización de carritos activos solo al cliente actual
                socket.emit('updateActiveCarts', [activeCart]);
            }
        } catch (error) {
            console.error('Error al obtener/crear el carrito activo:', error);
        }
    });


    // Evento para agregar un producto al carrito
    socket.on('addToCart', async (productId) => {
        try {
            console.log(`Añadiendo producto al carrito: ${productId}`);
            // Buscar el producto en la base de datos
            const product = await Product.findById(productId);
            if (!product) {
                console.error('Producto no encontrado');
                return;
            }
            // Obtener el ID único del carrito activo del usuario (puedes adaptar esto según tu lógica de usuario)
            const activeCartId = socket.id; // Aquí asumo que estás utilizando el ID de Socket.IO como identificador único del usuario

            // Buscar el carrito activo del usuario en la base de datos
            const activeCart = await Cart.findOne({ _id: activeCartId });

            if (!activeCart) {
                // Si no existe el carrito activo, crear uno nuevo
                const newCart = new Cart({ _id: activeCartId, cart: [] });
                await newCart.save();

                // Usar el nuevo carrito como carrito activo
                activeCart = newCart;

                // Emitir actualización de carritos activos a todos los clientes
                const activeCarts = await Cart.find();
                io.emit('updateActiveCarts', activeCarts);
            }

            // Verificar si el producto ya está en el carrito
            const existingItem = activeCart.cart.find(item => item.product._id.toString() === productId);

            if (existingItem) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                existingItem.cant += 1;
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                activeCart.cart.push({ productID: product, cant: 1 });
            }

            // Guardar el carrito actualizado en la base de datos
            await activeCart.save();

            // Emitir actualización del carrito al cliente que realizó la acción
            socket.emit('updateCart', activeCart);

            // Emitir actualización del carrito a todos los clientes en la misma habitación (carrito)
            io.to(activeCartId).emit('updateCart', activeCart);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    });

    // Manejar desconexiones de Socket.IO
    socket.on('disconnect', async () => {
        console.log('Cliente desconectado:', socket.id);

        // Guardar el carrito actualizado en la base de datos al desconectar
        try {
            const activeCart = await Cart.findById(socket.id);
            if (activeCart) {
                await activeCart.save();
                io.to(socket.id).emit('updateCart', activeCart); // Emitir actualización del carrito al cliente
                io.emit('updateActiveCarts'); // Emitir actualización de carritos activos a todos los clientes
            }
        } catch (error) {
            console.error('Error al guardar el carrito al desconectar:', error);
        }
    });
});
