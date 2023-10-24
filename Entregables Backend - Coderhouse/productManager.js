const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath; // Ruta para trabajar con productos
    this.products = this.loadProducts();
    this.nextProductId = this.products.length + 1;
  }

  // Cargar productos desde el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      if (!Array.isArray(this.products)) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo, se inicia con un arreglo vacío
      return [];
    }
  }

  // Guardar productos en el archivo
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error(`El código ${code} ya existe. No se puede agregar el producto.`);
      return;
    }

    const newProduct = {
      id: this.nextProductId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado.");
    }
  }

  updateProduct(id, updatedProductData) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
      this.saveProducts();
      return this.products[productIndex];
    } else {
      console.error("Producto no encontrado.");
      return null;
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      return true;
    } else {
      console.error("Producto no encontrado.");
      return false;
    }
  }
}

module.exports = ProductManager;

  // MAIN (INICIO DEL FLUJO)
  // Creamos el product manager.
  const manager = new ProductManager('bodega.json');
  
  // Añadimos el producto 1
  manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 9990,
    thumbnail: "imagen1.jpg",
    code: "p1",
    stock: 20,
  });

  // Añadimos el producto 2
  manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 13990,
    thumbnail: "imagen2.jpg",
    code: "p2",
    stock: 15,
  });

  // Añadimos el producto 3
  manager.addProduct({
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 19990,
    thumbnail: "imagen3.jpg",
    code: "p3",
    stock: 50,
  });

  // Obtenemos todos los productos
  const products = manager.getProducts();
  console.log(products);

  // Obtenemos el producto con id 1
  const product1 = manager.getProductById(1);
  console.log(product1);

manager.deleteProduct(1);

manager.updateProduct(3, {description: "Esto es el producto 3.0"});