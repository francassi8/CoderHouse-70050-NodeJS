import { TicketModel } from '../model/ticket.model.js';
import { productsRepo } from '../../repositories/index.js';

class TicketDao {
  constructor() {
    this.ticketModel = TicketModel;
  }

  async createTicket(cart, products) {
    try {
      const ticket = new this.ticketModel({
        code: this.generateCode(),
        purchase_datetime: new Date(),
        amount: cart.total,
        purchaser: cart.purchaser,
        products: products,
      });
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  generateCode() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  async getProductsInCart(cart) {
    try {
      const products = await Promise.all(
        cart.products.map(async (product) => {
          const productData = await productsRepo.getById(product.pid);
          return {
            pid: product.pid,
            quantity: product.quantity,
            name: productData.title,
            price: productData.price,
            stock: productData.stock,
          };
        }),
      );
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito: ' + error.message);
    }
  }
}

export const ticketDao = new TicketDao();