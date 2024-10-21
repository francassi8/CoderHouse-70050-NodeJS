import { cartModel } from '../model/cart.model.js';
import mongoose from 'mongoose';

export default class CartDao {
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

    async add(userID) {
        try {
            const newCart = await cartModel.create({user: userID});
            return newCart;
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
          const objectIdPid = new mongoose.Types.ObjectId(productId);
          const cart = await cartModel.findOneAndUpdate(
            { _id: cartId },
            {
              $inc: {
                "products.$[product].quantity": 1
              }
            },
            {
              arrayFilters: [{ "product.pid": objectIdPid }],
              new: true
            }
          );
      
          if (!cart.products.some(product => product.pid.equals(objectIdPid))) {
            await cartModel.updateOne(
              { _id: cartId },
              { $addToSet: { products: { pid: objectIdPid, quantity: 1 } } }
            );
          }
      
          return await cartModel.findById(cartId);
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
