import { ProductDTO } from "../../dto/product.dto.js";
import { productsRepo } from '../../repositories/index.js';

export default class ProductDAO {
    constructor() {
        this.productsRepo = productsRepo;
    }

    getProductList = async(query, limit, page, sort) => {
        try {
            const productList = await this.productsRepo.getAll(query, limit, page, sort);
            return productList.map(product => new ProductDTO(product));
        } catch (error) {
            throw new Error('Error al obtener los Productos: ' + error.message);
        }
    }

    getProductByID = async(pid) => {
        const product = await this.productsRepo.getById(pid);
        if (!product) {
            throw new Error('El producto con id ' + pid + ' no existe');
        } else {
            return new ProductDTO(product);
        }
    }

    addProduct = async(product) => {
        let errorMessage = '';

        if (!product.title) {
            errorMessage = 'Nombre';
        }
        if (!product.description) {
            errorMessage += ' Descripcion';
        }
        if (!product.price) {
            errorMessage += ' Precio';
        }
        if (!product.stock) {
            errorMessage += ' Stock';
        }
        if (!product.category) {
            errorMessage += ' Categoria';
        }

        if (errorMessage) {
            throw new Error('Se requieren los siguientes campos: ' + errorMessage);
        }

        try {
            const newProduct = await this.productsRepo.add(product);
            return new ProductDTO(newProduct);
        } catch (error) {
            throw new Error('Error al anadir el Producto: ' + error.message);
        }
        
    }
    
    updateProduct = async(updatedProduct, pid) => {
        try {
            const productId = typeof pid === 'string' ? parseInt(pid, 10) : pid;
            const updated = await this.productsRepo.update(productId, updatedProduct);
            if (!updated) {
                throw new Error('El producto con id ' + productId + ' no existe');
            }
            return new ProductDTO(updated);
        } catch (error) {
            throw new Error('Error al actualizar el Producto: ' + error.message);
        }
    }

    deleteProduct = async(pid)=> {
        try {
            const deleted = await this.productsRepo.delete(id);
            if (!deleted) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }

            return new ProductDTO(deleted);
        } catch (error) {
            throw new Error('Error al eliminar el Producto: ' + error.message);
        }
    }
}
