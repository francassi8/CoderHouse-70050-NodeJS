import ProductRepository from './Products.repository.js';
import CartRepository from './cart.repository.js'
import TicketRepository from './ticket.repository.js';
//import userRepository from './user.repository.js';

export const productsRepo = new ProductRepository();
export const cartsRepo = new CartRepository();
export const ticketsRepo = new TicketRepository();
//export const userRepo = new userRepository()