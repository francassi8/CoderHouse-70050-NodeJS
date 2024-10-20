import { AppInit } from './init/initialConfig.js';
import express from 'express'
import {__dirname} from './utils.js'
import { Server } from 'socket.io';

const app = express();
AppInit(app);

const httpServer = app.listen(process.env.PORT, () => {
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