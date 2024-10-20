import ProductRepository from './products.repository.js';
import CartRepository from './cart.repository.js';	

export const productsRepo = new ProductRepository();
export const cartsRepo = new CartRepository();