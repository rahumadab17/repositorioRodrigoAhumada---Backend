document.addEventListener("DOMContentLoaded", () => {
    const socket = io(); // Conectar al servidor Socket.IO

    // Verificar la conexión de Socket.IO
    socket.on('connect', () => {
        console.log('Conectado al servidor de Socket.IO');

        // Obtener el carrito activo del servidor
        socket.emit('getActiveCart');

        // Unirse a la habitación (carrito) correspondiente al usuario
        socket.emit('joinRoom', socket.id);
    });

    // Manejar el evento de agregar al carrito
    const addToCartButtons = document.querySelectorAll(".addToCartButton");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            console.log(`Agregando producto al carrito: ${productId}`);
            socket.emit("addToCart", productId); // Enviar evento al servidor para agregar al carrito
        });
    });

// Manejar actualizaciones del carrito
socket.on("updateCart", (cart) => {
    console.log("Carrito actualizado:", cart);
    const template = Handlebars.compile(document.getElementById("listaProductos-template").innerHTML);
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = template({ cart: cart.cart });
});
});
