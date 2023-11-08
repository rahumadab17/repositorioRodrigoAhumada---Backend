import fs from 'fs'

export class ProductManager {
  constructor() {
    this.path = ('C:/Users/roro_/Documents/GitHub/repositorioRodrigoAhumada/Entregables Backend - Coderhouse/Primera Entrega Proyecto Final - Rodrigo Ahumada -v2.0/src/products.json');
    this.products = this.loadProducts();
    this.nextProductId = this.products.length + 1;
  }

  loadProducts() {
  try {
    const data = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(data);
      if (Array.isArray(products)) {
        return products;
      } else {
        console.log('El archivo no contiene un array de productos.');
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(productData) {
    const { title, description, price, category, thumbnail, code, status = true, stock } = productData;
    if (!title || !description || !price || !category || !thumbnail || !code || stock  === undefined) {
      console.error('Todos los campos son obligatorios.');
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
      category,
      thumbnail,
      code,
      stock,
      status
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
      console.error('Producto no encontrado.');
    }
  }

  updateProduct(id, updatedProductData) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
      this.saveProducts();
      return this.products[productIndex];
    } else {
      console.error('Producto no encontrado.');
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
      console.error('Producto no encontrado.');
      return false;
    }
  }
}

//
//  // MAIN (INICIO DEL FLUJO)
//  // Creamos el product manager.
//  const manager = new ProductManager('bodega.json');
//  
//  // Añadimos el producto 1
//  manager.addProduct({
//    title: 'Producto 1',
//    description: 'Descripción del producto 1',
//    price: 9990,
//    thumbnail: 'imagen1.jpg',
//    code: 'p1',
//    stock: 20,
//  });
//
//  // Añadimos el producto 2
//  manager.addProduct({
//    title: 'Producto 2',
//    description: 'Descripción del producto 2',
//    price: 13990,
//    thumbnail: 'imagen2.jpg',
//    code: 'p2',
//    stock: 15,
//  });
//
//  // Añadimos el producto 3
//  manager.addProduct({
//    title: 'Producto 3',
//    description: 'Descripción del producto 3',
//    price: 19990,
//    thumbnail: 'imagen3.jpg',
//    code: 'p3',
//    stock: 50,
//  });
//
//    // Seguimos añadiendo productos
//    manager.addProduct({
//      title: 'Producto 4',
//      description: 'Descripción del producto 4',
//      price: 29990,
//      thumbnail: 'imagen4.jpg',
//      code: 'p4',
//      stock: 10,
//    });
//
//    manager.addProduct({
//      title: 'Producto 5',
//      description: 'Descripción del producto 5',
//      price: 7990,
//      thumbnail: 'imagen5.jpg',
//      code: 'p5',
//      stock: 25,
//    });
//
//    manager.addProduct({
//      title: 'Producto 6',
//      description: 'Descripción del producto 6',
//      price: 8990,
//      thumbnail: 'imagen6.jpg',
//      code: 'p6',
//      stock: 15,
//    });
//
//    manager.addProduct({
//      title: 'Producto 7',
//      description: 'Descripción del producto 7',
//      price: 12990,
//      thumbnail: 'imagen7.jpg',
//      code: 'p7',
//      stock: 20,
//    });
//
//    manager.addProduct({
//      title: 'Producto 8',
//      description: 'Descripción del producto 8',
//      price: 14990,
//      thumbnail: 'imagen8.jpg',
//      code: 'p8',
//      stock: 10,
//    });
//
//    manager.addProduct({
//      title: 'Producto 9',
//      description: 'Descripción del producto 9',
//      price: 9990,
//      thumbnail: 'imagen9.jpg',
//      code: 'p9',
//      stock: 35,
//    });
//
//    manager.addProduct({
//      title: 'Producto 10',
//      description: 'Descripción del producto 10',
//      price: 5990,
//      thumbnail: 'imagen10.jpg',
//      code: 'p10',
//      stock: 25,
//    });
//
//// Ejemplos de las funciones disponibles
//
//const products = manager.getProducts();
//console.log(products);
//
//const product1 = manager.getProductById(1);
//console.log(product1);
//
//manager.deleteProduct(4);
//
//manager.updateProduct(3, {description: 'Esto es el producto 3.0'});
//
//manager.updateProduct(7, {description: 'Este producto es lo mejor que hay'});