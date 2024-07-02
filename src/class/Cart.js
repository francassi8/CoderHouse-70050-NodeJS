import fs from 'node:fs'

class cart {
    constructor(path){
        if (typeof path !== 'string') {
            throw new Error('The "path" argument must be a string');
        }
        this.path = path;
        this.cartList = [];
    }

    async getCartList(){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.cartList = [... JSON.parse(list).data]
        return [... this.cartList]
    }

    async getCartByID(cid){
        await this.getCartList()
        const cartID = typeof cid === 'string' ? parseInt(cid, 10) : cid;
        return this.cartList.find(cart => cart.id === cartID)
    }

    async createCart(){
        this.cartList = await this.getCartList();
        let newId;

        //obtener ultimo id y sumar 1 unidad
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

        // Verifico si el producto existe en el carrito
        const productIndex = this.cart.products.findIndex(product => product.pid === pid);

        if (productIndex !== -1) {
            // existe, sumo 1 a q
            this.cart.products[productIndex].q++;
        } else {
            // no esta en el carrito, lo creo
            this.cart.products.push({ pid: pid, q: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.cartList }));
    }

}

export default cart