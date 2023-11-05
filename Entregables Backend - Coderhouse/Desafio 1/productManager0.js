
// Seteamos la clase
class ProductManager {
    constructor() {
      this.products = [];
      this.nextProductId = 1;
    }
  
    addProduct(productData) {
      // Validar que todos los campos sean obligatorios
      const { title, description, price, thumbnail, code, stock } = productData;
      if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que el campo "code" no se repita
      if (this.products.some((product) => product.code === code)) {
        console.error("El código ya existe. No se puede agregar el producto.");
        return;
      }
  
      // Agregar el producto con un id autoincrementable
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
}

  // MAIN (INICIO DEL FLUJO)
  // Creamos el product manager.
  const manager = new ProductManager();
  
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
