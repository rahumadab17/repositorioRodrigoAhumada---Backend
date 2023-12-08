document.addEventListener("DOMContentLoaded", () => {
  const socket = io(); // Conectar al servidor Socket.IO

  // Manejar el evento de agregar al carrito
  const addToCartButtons = document.querySelectorAll(".addToCartButton");
  addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const productId = button.getAttribute("data-product-id");
          socket.emit("addToCart", productId); // Enviar evento al servidor para agregar al carrito
      });
  });

  // Manejar actualizaciones del carrito
  socket.on("updateCart", (cart) => {
      // Renderizar la lista de productos en el carrito usando Handlebars
      const template = Handlebars.compile(document.getElementById("listaProductos-template").innerHTML);
      const listaProductos = document.getElementById("listaProductos");
      listaProductos.innerHTML = template({ cart: cart.cart });
  });

  // Manejar actualizaciones de la lista de carritos activos (opcional)
  socket.on("updateActiveCarts", (activeCarts) => {
      // Renderizar la lista de carritos activos usando Handlebars (si es necesario)
      const template = Handlebars.compile(document.getElementById("listaCart-template").innerHTML);
      const listaCart = document.getElementById("listaCart");
      listaCart.innerHTML = template({ carts: activeCarts });
  });
});