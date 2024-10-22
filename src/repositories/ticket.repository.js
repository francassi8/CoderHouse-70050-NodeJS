import TicketDao from '../dao/class/Ticket.dao.js';

export default class TicketRepository {
  constructor() {
    this.ticketDao = new TicketDao();
  }

  async createTicket(cart, products) {
    try {
      const productsInCart = await this.getProductsInCart(cart._id);
      const totalAmount = productsInCart.reduce((acc, product) => acc + product.pid.price * product.quantity, 0);
      const ticket = await this.ticketDao.createTicket(cart, products, totalAmount);
      return ticket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }

  async getById(id) {
    try {
      return await this.ticketDao.getById(id);
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }

  async getAll() {
    try {
      return await this.ticketDao.getAll();
    } catch (error) {
      throw new Error('Error al obtener los tickets: ' + error.message);
    }
  }

  async getProductsInCart(cartId) {
    try {
      return await this.ticketDao.getProductsInCart(cartId);
    } catch (error) {
      throw new Error(`Error al obtener los productos del carrito: ${error.message}`);
    }
  }

  async getTicketByCode(code) {
    try {
      const ticket = await this.ticketDao.getTicketByCode(code);
      return ticket;
    } catch (error) {
      throw new Error(`Error al obtener el ticket: ${error.message}`);
    }
  }
}
