import { UserModel } from '../model/user.model.js';

export default class UserDao {
  async getUserByEmail(email) {
    try {
        const user = await UserModel.findOne( email ).lean();
        return user;
    } catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

  async createUser(user) {
    try {
        const newUser = await UserModel.create(user);
        return newUser;
    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

}

