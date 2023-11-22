const socket = io()

socket.on('mensajeServidor', data => {
    console.log(data)
})

socket.on('actualizacion', function(data) {
  console.log('Productos actualizados:', data.products);
  // Actualizar la lista de productos en la interfaz
  const lista = document.querySelector('#productsList');
  lista.innerHTML = '';

  for (const product of data.products) {
    const elementoLista = document.createElement('li');
    elementoLista.innerHTML = `
      ${product.id} - <strong>${product.title}</strong> - ${product.description} - $${product.price}
    `;
    lista.appendChild(elementoLista);
  }
});

document.getElementById('addProductForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const productDescription = document.getElementById('productDescription').value;
  const productPrice = document.getElementById('productPrice').value;
  const productCategory = document.getElementById('productCategory').value;
  const productThumbnail = document.getElementById('productThumbnail').value;
  const productCode = document.getElementById('productCode').value;
  const productStock = document.getElementById('productStock').value;

  console.log('Product details:', productName, productDescription, productPrice, productCategory, productThumbnail, productCode, productStock);

  socket.emit('addProduct', {
    title: productName,
    description: productDescription,
    price: productPrice,
    category: productCategory,
    thumbnail: productThumbnail,
    code: productCode,
    stock: productStock
  }, function(respuesta) {
    console.log('Callback from server:', respuesta);
  });
});

function addProduct() {
  console.log('addProduct function called');
}