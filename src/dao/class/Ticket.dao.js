import { TicketModel } from '../model/ticket.model.js';
import { cartModel } from '../model/cart.model.js';
import { generateCode } from '../../utils.js';

export default class TicketDao {
  constructor() {
    this.ticketModel = TicketModel;
  }

  async createTicket(cart, products, totalAmount) {
    try {
      const ticket = new this.ticketModel({
        code: generateCode(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: cart.user,
        products: products,
      });
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }

  async getById(id) {
    try {
      return await this.ticketModel.findById(id);
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }

  async getAll() {
    try {
      return await this.ticketModel.find();
    } catch (error) {
      throw new Error('Error al obtener los tickets: ' + error.message);
    }
  }

  async getProductsInCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate('products.pid');
      const productsInCart = cart.products.map(product => ({
        pid: product.pid,
        quantity: product.quantity,
      }));
      return productsInCart;
    } catch (error) {
      throw new Error(`Error al obtener los productos del carrito: ${error.message}`);
    }
  }
}
