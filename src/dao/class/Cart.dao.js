import { productsRepo, cartsRepo } from '../../repositories/index.js';
import mongoose from 'mongoose';

export default class CartDao {
    constructor() {
        this.cartsRepo = cartsRepo;
    }

    getCartList = async () => {
        try {
            this.cartList = await cartsRepo.getAll();
            return this.cartList;
        } catch (error) {
            throw new Error('No hay carritos creados: ' + error.message);
        }
    }

    getCartByID = async(cid) => {
        try {
            const cart = await cartsRepo.getById(cid);
            if (!cart) {
                throw new Error('El carrito con id ' + cid + ' no existe');
            }
            return cart;
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    createCart = async() => {
        try {
            const newCart = new cartsRepo.add();
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    addProductToCart = async(pid, cid) => {
        try {
            const updatedCart = await this.cartRepository.addProductToCart(cid, pid);
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al añadir el producto al carrito: ${error.message}`);
        }
    }
    
    removeProductFromCart = async(pid, cid) => {
        try {
            const cart = await this.getById(cid);

            if (!pid) {
                cart.products = [];
                await cart.save();
                return cart;
            }

            const product = await productsRepo.getById(pid);
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
