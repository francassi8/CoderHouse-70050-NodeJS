import UserDao from "../dao/class/user.dao.js";
import { createHash, generadorToken, isValidPassword } from "../utils.js";
import { UserDTO } from '../dto/user.dto.js';

export default class UserRepository {
    constructor() {
        this.UserDao = new UserDao();
    }

    login = async (req, res) => {
        try{
            const { password, email } = req.body; 
            
            const userFound = await this.UserDao.getUserByEmail({ email });

            if(isValidPassword(userFound, password)){           
                const userDTO = new UserDTO(userFound.nombre, userFound.apellido, userFound.email, userFound.role);
                const token = generadorToken({ email: userFound.email, nombre: userFound.nombre, rol: userFound.role })
                return res.status(200).cookie('currentUser', token,{ maxAge: 120000, signed: true, httpOnly:true }).json({message:'login OK', user: userDTO})
            }
            
            return res.status(200).json({message: 'error login'})
        }catch (e){
            return res.json({ message: e })
        }
    }
    
    register = async (req, res) => {
        try{
            const { nombre, apellido, email, role, password, edad } = req.body;
            const newUser = {
                nombre,
                apellido,
                email,
                role,
                edad,
                password: createHash(password),
            }
    
            const user = await this.UserDao.createUser(newUser);
            const userDTO = new UserDTO(user.nombre, user.apellido, user.email, user.role);
            return res.status(201).json({message: `Usuario creado con exito. Nombre de usuario: ${user.nombre}`, user: userDTO})
        }catch (e){
            return res.status(500).json({message: e})
        }
    }
}


