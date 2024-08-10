import express from 'express'
import handlebars from 'express-handlebars'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import {__dirname} from './utils.js'
import HomeRouters from './routes/home.router.js'
import RealTimeRouters from './routes/realtimeproducts.router.js'
import { Server } from 'socket.io';
import productClass from './class/Product.js'
import mongoose from 'mongoose'

const app = express();
export const product = new productClass(__dirname + '/data/products.json')

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api/carts/',cartRouter);
app.use('/api/products/',productRouter);
app.use('/home',HomeRouters)
app.use('/realTime',RealTimeRouters)


const httpServer = app.listen(8085, () => {
    console.log('Servidor Conectado')
})

mongoose.connect('mongodb+srv://francocassi8:mpWUJxXtmGFzsOiO@coderhousedb.msd69k1.mongodb.net/?retryWrites=true&w=majority&appName=CoderhouseDB', { dbName: 'Supermarket' }).then(() => { console.log('Lista la BD')})

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