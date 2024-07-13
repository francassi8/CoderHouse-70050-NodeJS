import fs from 'node:fs'
import product from './Product.js';

class cart {
    constructor(path, productPath){
         if (typeof path !== 'string' || typeof productPath !== 'string') {
             throw new Error('The "path" argument must be a string');
         }
        this.path = path;
        this.cartList = [];
        this.productInstance = new product(productPath);
    }

    async getCartList(){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        if(list){
            this.cartList = [... JSON.parse(list).data]
            return [... this.cartList]
        }else{
            throw new Error('No hay Carritos creados');
        }
    }

    async getCartByID(cid){
        await this.getCartList()
        const cartID = typeof cid === 'string' ? parseInt(cid, 10) : cid;

        const cartExists = this.cartList.some(cart => cart.id === cartID);
        if (!cartExists) {
            throw new Error('El carrito con id ' + cid + ' no existe');
        }else{
            return this.cartList.find(cart => cart.id === cartID)
        }        

    }

    async createCart(){
        this.cartList = await this.getCartList();
        let newId;

        if (this.cartList.length > 0) {
            newId = Math.max(...this.cartList.map(cart => cart.id))+1
        } else {
            newId = 1
        }
    
        const createdCart = {
            id: newId,
            products: [],
         };

        this.cartList.push(createdCart);
        await  fs.promises.writeFile(this.path, JSON.stringify({ data: this.cartList}))
    }

    async addProductToCart(pid, cid) {
        this.cart = await this.getCartByID(cid);

        if (!this.cart) {
            throw new Error('el carrito '+cid+' no existe');
        }

        const product = await this.productInstance.getProductByID(pid);

        if (!product) {
            throw new Error('el producto '+pid+' no existe')
        }

        const productIndex = this.cart.products.findIndex(product => product.pid === pid);

        if (productIndex !== -1) {
            this.cart.products[productIndex].quantity++;
        } else {
            this.cart.products.push({ pid: pid, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.cartList }));
    }

}

export default cart