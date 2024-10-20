import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import LoginRouter from './login.router.js';
import cartRouter from '../routes/carts.router.js'
import productRouter from '../routes/products.router.js'
import HomeRouters from '../routes/home.router.js'
import RealTimeRouters from '../routes/realtimeproducts.router.js'
import productsOfCart from '../routes/productsOfCart.router.js'
import loginRouter from '../routes/login.router.js'

const app = Router()

app.use(ROUTE_PATH.api_session, LoginRouter);
app.use(ROUTE_PATH.api_carts, cartRouter);
app.use(ROUTE_PATH.api_products, productRouter);
app.use(ROUTE_PATH.api_session, loginRouter);

app.use(ROUTE_PATH.home,HomeRouters);
app.use(ROUTE_PATH.realTime,RealTimeRouters);
app.use(ROUTE_PATH.productsOfCart,productsOfCart);


export default app
