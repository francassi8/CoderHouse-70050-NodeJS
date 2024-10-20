import { Router } from "express";
import { login, register } from "../dao/class/user.dao.js";
import { invokePassport } from "../middlewares/handleErrors.js";
import { UserDTO } from '../dto/user.dto.js';

const app = Router();

app.post('/login', login);
app.post('/register', register);

app.get('/current', invokePassport('jwt'), (req, res) => {
    const userDTO = new UserDTO(req.user.nombre, req.user.apellido, req.user.email, req.user.role);
    res.send(userDTO);
})


export default app;