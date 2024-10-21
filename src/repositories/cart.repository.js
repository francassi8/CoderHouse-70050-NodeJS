import CartDao from '../dao/class/Cart.dao.js';
import productDao from '../dao/class/Product.dao.js';

export default class CartRepository {
    constructor() {
        this.CartDao = new CartDao();
    }

    getCartList = async () => {
        try {
            const cartList = await this.CartDao.getAll();
            return cartList;
        } catch (error) {
            throw new Error('No hay carritos creados: ' + error.message);
        }
    }

    getCartByID = async(cid) => {
        try {
            const cart = await this.CartDao.getById(cid);
            if (!cart) {
                throw new Error('El carrito con id ' + cid + ' no existe');
            }
            return cart;
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    createCart = async(userID) => {
        try {
            const newCart = await this.CartDao.add(userID);
            return newCart;
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    addProductToCart = async(pid, cid) => {
        try {
            const updatedCart = await this.CartDao.addProductToCart(cid, pid);
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al añadir el producto al carrito: ${error.message}`);
        }
    }
    
    removeProductFromCart = async(pid, cid) => {
        try {
            const cart = await this.CartDao.getById(cid);

            if (!pid) {
                cart.products = [];
                await cart.save();
                return cart;
            }

            const product = await productDao.getById(pid);
            if (!product) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }

            const productIndex = cart.products.findIndex(item => item.pid.equals(pid));
    
            if (productIndex !== -1) {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity--;
                } else {
                    cart.products.splice(productIndex, 1);
                }
            } else {
                throw new Error('El producto con id ' + pid + ' no está en el carrito');
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error al eliminar el producto del carrito: ' + error.message);
        }
    }
}
