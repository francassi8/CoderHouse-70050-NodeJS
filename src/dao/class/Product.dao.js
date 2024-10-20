import { productModel } from '../model/product.model.js';

export default class ProductDao {
    async getAll(query, limit, page, sort) {
        try {
            const products = await productModel.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort(sort);
            return products;
        } catch (error) {
            throw new Error(`Error al obtener los Productos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            throw new Error(`Error al obtener los Productos: ${error.message}`);
        }
    }

    async add(product) {
        try {
            const newProduct = await productModel.create(product);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear el Producto: ${error.message}`);
        }
    }

    async update(id, product) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el Producto: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el Producto: ${error.message}`);
        }
    }
}
