import fs from 'fs'

export class CartManager {
  constructor(){
    this.path = ('./src/cart.json');
    this.carts = [];
    this.nextCartId = this.carts.length +1;
    }

    getCarts = () => {
        const data = fs.readFileSync(this.path, 'utf-8');
        const carts = JSON.parse(data);
            return carts;
    }
  
    getCartProducts = (id) => {
        const carts = this.getCarts();
        const cart = carts.find(cart=>cart.id === id);
        if(carts){
            return cart.products
        } else {
            console.log('Carrito no existente')
        }
    }

    newCart = () => {
        const id = this.nextCartId++
        const newCart ={id, products: []};

        this.carts = this.getCarts();
        this.carts.push(newCart);

        fs.writeFileSync(this.path, JSON.stringify(this.carts));
        return newCart;
    }

    addProductToCart = (cart_id, product_id) => {
        const carts = this.getCarts();
        console.log(typeof carts)
        console.log(typeof cart_id)
        const cartIndex = carts.findIndex(cart=> cart.id === cart_id);
        console.log(cartIndex)
        if (cartIndex !== -1) {
            const cartProducts = this.getCartProducts(cart_id);
            const existingProductIndex = cartProducts.findIndex(product=> product.product_id === product_id);

            if(existingProductIndex !== -1){
                cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity +1;
            }else{
                cartProducts.push({product_id, quantity : 1})
            }
            carts[cartIndex].products = cartProducts

            fs.writeFileSync(this.path, JSON.stringify(carts));
            console.log('Producto agregado exitosamente')
        } else{
            console.log('Carrito no encontrado')
        }
    }
    
}
