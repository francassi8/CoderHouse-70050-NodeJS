import ProductRepository from './products.repository.js';
import CartRepository from './cart.repository.js';
import TicketRepository from './ticket.repository.js';

export const productsRepo = new ProductRepository();
export const cartsRepo = new CartRepository();
export const ticketsRepo = new TicketRepository();