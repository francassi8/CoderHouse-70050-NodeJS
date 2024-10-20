import { UserDTO } from '../dto/user.dto.js';

const authorization = (rolPermitido) => {
  return (req, res, next) => {
    const userDTO = new UserDTO(req.user.nombre, req.user.apellido, req.user.email, req.user.role);
    if (rolPermitido.includes(userDTO.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Acceso no permitido' });
    }
  };
};

export const soloAdmin = authorization(['admin']);
export const soloUser = authorization(['user']);