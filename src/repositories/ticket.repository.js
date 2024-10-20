import { ticketDao } from '../dao/class/Ticket.dao.js';

class TicketRepository {
  constructor() {
    this.ticketDao = ticketDao;
  }

  async createTicket(cart, products) {
    try {
      return await this.ticketDao.createTicket(cart, products);
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
}

export default TicketRepository;