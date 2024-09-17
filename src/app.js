import { AppInit } from './init/initialConfig.js';
import express from 'express'
import {__dirname} from './utils.js'
import { Server } from 'socket.io';
import productClass from './class/Product.js'

const app = express();
AppInit(app);

export const product = new productClass(__dirname + '/data/products.json')

const httpServer = app.listen(8085, () => {
    console.log('Servidor Conectado')
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('dispositivo conectado')
    const listaDeProductos = await product.getProductList()
    socket.emit('home', listaDeProductos)
    socket.emit('realTimeProducts', listaDeProductos)
    socket.on('createProduct', async(newProduct) =>{
        await product.addProduct(newProduct)
        socket.emit('realtime', productList)
    })
})