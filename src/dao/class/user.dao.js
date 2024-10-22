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

  async getUserById(id) {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

  async updateUser(id, user) {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
        await UserModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }
}

