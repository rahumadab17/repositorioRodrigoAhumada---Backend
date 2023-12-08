const socket = io();

socket.on('mensajeServidor', data => {
    console.log(data);
});

socket.on('actualizacion', function(data) {
    console.log('Productos actualizados:', data.products);
    if (Array.isArray(data.products)) {
        // Actualizar la lista de productos en la interfaz
        const lista = document.querySelector('#productsList');
        lista.innerHTML = '';

        for (const product of data.products) {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `
                ${product._id} - <strong>${product.title}</strong> - ${product.description} - $${product.price}
                <button onclick="addToCart('${product._id}')">Agregar al Carrito</button>
            `;
            lista.appendChild(elementoLista);
        }
    } else {
        console.error('La propiedad products no es un array:', data.products);
    }
});

socket.on('viewCart', function(data) {
  console.log('Mostrando vista de carrito');
  showCartView(data.cart);
});

// Agregar producto al carrito
document.getElementById('addToCartBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const productId = document.getElementById('productId').value;

  socket.emit('addProductToCart', { productId }, function(response) {
    if (response.status === 'success') {
      console.log('Producto agregado al carrito exitosamente.');
      // Puedes realizar alguna acción adicional si es necesario
    } else {
      console.error('Error al agregar producto al carrito:', response.error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  });
});

// Visualizar el carrito
document.getElementById('viewCartBtn').addEventListener('click', function(event) {
  event.preventDefault();

  socket.emit('getCart', {}, function(data) {
    showCartView(data.cart);
  });
});


function showProductsView(products) {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';

  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${product.id} - <strong>${product.title}</strong> - ${product.description} - $${product.price}
      <button onclick="addToCart('${product.id}')">Agregar al Carrito</button>
    `;
    productsList.appendChild(listItem);
  });
}

function showCartView(cart) {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  cart.forEach(cartItem => {
    const listItem = document.createElement('li');
    listItem.textContent = `${cartItem.productID.title} - Cantidad: ${cartItem.cant}`;
    cartList.appendChild(listItem);
  });
}

document.getElementById('contenedorProductos').addEventListener('click', function (event) {
  if (event.target.classList.contains('addToCartBtn')) {
    const productId = event.target.getAttribute('data-product-id');
    addToCart(productId);
  }
});

// Evento para el botón "Nuevo Carrito"
document.getElementById('newCart').addEventListener('click', function () {
  socket.emit('createNewCart', function (response) {
      console.log('Respuesta del servidor (createNewCart):', response);
  });
});

// Evento para el botón "Eliminar Carrito"
document.getElementById('deleteCart').addEventListener('click', function () {
  socket.emit('deleteCart', { cartId: 'cart1' }, function (response) {
      console.log('Respuesta del servidor (deleteCart):', response);
  });
});
