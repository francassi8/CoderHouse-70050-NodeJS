import express from 'express';
import {__dirname} from '../utils.js'
import dotenv from 'dotenv';
import router from '../routes/index.js';
import { connectionDB } from '../mongo/connection.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import { ROUTE_PATH } from '../constants/routesPath.js'
import handlebars from 'express-handlebars'
import cartRouter from '../routes/carts.router.js'
import productRouter from '../routes/products.router.js'
import HomeRouters from '../routes/home.router.js'
import RealTimeRouters from '../routes/realtimeproducts.router.js'
import productsOfCart from '../routes/productsOfCart.router.js'
import loginRouter from '../routes/login.router.js'


export const AppInit = (app) => {
    dotenv.config();
    connectionDB();
    initializePassport();
    passport.initialize();
    app.use(cookieParser(process.env.SECRET));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public')); 
    
    app.use('/', router);
    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    app.use(ROUTE_PATH.api_carts, cartRouter);
    app.use(ROUTE_PATH.api_products, productRouter);
    app.use(ROUTE_PATH.api_session, loginRouter);
    
    app.use(ROUTE_PATH.home,HomeRouters);
    app.use(ROUTE_PATH.realTime,RealTimeRouters);
    app.use(ROUTE_PATH.productsOfCart,productsOfCart);
}
