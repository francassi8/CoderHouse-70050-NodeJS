import { ProductDTO } from "../dto/product.dto.js";
import ProductDao from '../dao/class/Product.dao.js';

export default class ProductRepository {
    constructor() {
        this.ProductDao = new ProductDao();
    }

    getProductList = async(query, limit, page, sort) => {
        try {
            const productList = await this.ProductDao.getAll(query, limit, page, sort);
            return productList.map(product => new ProductDTO(product));
        } catch (error) {
            throw new Error('Error al obtener los Productos: ' + error.message);
        }
    }

    getProductByID = async(pid) => {
        const product = await this.ProductDao.getById(pid);
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
            const newProduct = await this.ProductDao.add(product);
            return new ProductDTO(newProduct);
        } catch (error) {
            throw new Error('Error al anadir el Producto: ' + error.message);
        }
        
    }
    
    updateProduct = async(pid, updatedProduct) => {
        try {
            const updated = await this.ProductDao.update(pid, updatedProduct);
            if (!updated) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }
            return new ProductDTO(updated);
        } catch (error) {
            throw new Error('Error al actualizar el Producto: ' + error.message);
        }
    }

    updateStock = async(pid, quantity) => {
        try {
            const updated = await this.ProductDao.updateStock(pid, quantity);
            if (!updated) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }
            return new ProductDTO(updated);
        } catch (error) {
            throw new Error('Error al actualizar el Stock: ' + error.message);
        }
    }

    deleteProduct = async(pid)=> {
        try {
            const deleted = await this.ProductDao.delete(pid);
            if (!deleted) {
                throw new Error('El producto con id ' + pid + ' no existe');
            }

            return new ProductDTO(deleted);
        } catch (error) {
            throw new Error('Error al eliminar el Producto: ' + error.message);
        }
    }
}
