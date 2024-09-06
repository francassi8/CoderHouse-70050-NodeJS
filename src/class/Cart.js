import { cartModel } from '../model/cart.model.js';
import { productModel } from '../model/product.model.js';
import mongoose from 'mongoose';

class Cart {
    constructor() {
        this.cartList = [];
    }

    async getCartList() {
        try {
            this.cartList = await cartModel.find().populate('products.pid');
            return this.cartList;
        } catch (error) {
            throw new Error('No hay carritos creados: ' + error.message);
        }
    }

    async getCartByID(cid) {
        try {
            const cart = await cartModel.findById(cid).populate('products.pid');
            if (!cart) {
                throw new Error('El carrito con id ' + cid + ' no existe');
            }
            return cart;
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    async addProductToCart(pid, cid) {
        try {
            const cart = await this.getCartByID(cid);
            const product = await productModel.findById(pid);
            if (!product) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }

            const objectIdPid = new mongoose.Types.ObjectId(pid);
            const productIndex = cart.products.findIndex(item => item.pid.equals(objectIdPid));
    
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ pid: pid, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error al añadir el producto al carrito: ' + error.message);
        }
    }

    async removeProductFromCart(pid, cid) {
        try {
            const cart = await this.getCartByID(cid);

            if (!pid) {
                cart.products = [];
                await cart.save();
                return cart;
            }

            const product = await productModel.findById(pid);
            if (!product) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }

            const objectIdPid = new mongoose.Types.ObjectId(pid);
            const productIndex = cart.products.findIndex(item => item.pid.equals(objectIdPid));
    
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
            throw new Error('Error al añadir el producto al carrito: ' + error.message);
        }
    }
}

export default Cart;