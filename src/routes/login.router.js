import { Router } from "express";
import { userRepo } from "../repositories/index.js";
import { invokePassport } from "../middlewares/handleErrors.js";
import { UserDTO } from '../dto/user.dto.js';

const app = Router();

app.post('/login', async (req, res) => {
    try {
      await userRepo.login(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al iniciar sesión' });
    }
});
  
app.post('/register', async (req, res) => {
    try {
        await userRepo.register(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al registrar usuario' });
    }
});

app.get('/current', invokePassport('jwt'), (req, res) => {
    const userDTO = new UserDTO(req.user.nombre, req.user.apellido, req.user.email, req.user.role);
    res.send(userDTO);
})


export default app;