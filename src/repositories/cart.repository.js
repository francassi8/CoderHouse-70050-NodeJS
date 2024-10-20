import { cartModel } from '../dao/model/cart.model.js';
import mongoose from 'mongoose';

class CartRepository {
    async getAll(filter, limit, page, sort) {
        try {
            const carts = await cartModel.find(filter)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort(sort)
                .populate('products.pid');
            return carts;
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const cart = await cartModel.findById(id).populate('products.pid');
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    async add(cart) {
        try {
            const newCart = await cartModel.create(cart);
            return newCart;
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const objectIdPid = new mongoose.Types.ObjectId(productId);
            const updatedCart = await cartModel.updateOne(
                { _id: cartId, "products.pid": objectIdPid },
                { $inc: { "products.$.quantity": 1 } }
            );

            if (updatedCart.nModified === 0) {
                await cartModel.updateOne(
                    { _id: cartId },
                    { $addToSet: { products: { pid: objectIdPid, quantity: 1 } } }
                );
            }

            const cart = await cartModel.findById(cartId);
            return cart;
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
        }
    }

    async update(id, cart) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(id, cart, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al actualizar el carrito: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(id);
            return deletedCart;
        } catch (error) {
            throw new Error(`Error al eliminar el carrito: ${error.message}`);
        }
    }
}

export default CartRepository;