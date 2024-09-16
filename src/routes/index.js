import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import LoginRouter from './login.router.js'

const app = Router()

app.use(ROUTE_PATH.api_session, LoginRouter)


export default app
