import { TicketModel } from '../model/ticket.model.js';

export default class TicketDao {
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

  generateCode() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
