const User = require('../models/users.models')
const uuid = require('uuid');
const { hashPassword } = require('../utils/crypto');
const generateToken  = require('../utils/generateToken');

const getAllUsers = async () => {
    const data = await User.findAll({
        where: {
            status: 'active'
        }
    });
    return data;
}

const getUserById = async (id) => {
    const data = await User.findOne({
        where: {
            id,
            status: 'active'
        }
    });
    return data;
}

const createUser = async (data) => {
    const newUser = await User.create({ //? Creando nuevo registro de usuario
        id: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword(data.password),
        phone: data.phone,
        profileImage: data.profileImage,
        birthday: data.birthday,
        gender: data.gender,
        country: data.country,
        token: generateToken()
    });
    return newUser;
}

const updateUser = async (id, data) => {
    const result = await User.update(data,{ //? Actualizar usuario
        where: {
            id,
            status: 'active'
        }
    });
    return result;
}

const deleteUser = async (id) => {
    const data = await User.destroy({ //? Eliminar usuario
        where: {
            id
        }
    });
    return data;
}

const getUserByEmail = async (email) => {
    const data = await User.findOne({ //? Consulta para traernos el usuario por su email
        where: {
            email, 
            status: 'active'
        }
    });
    return data;
}

const getUserByToken = async (token) => {
    const data = await User.findOne({ //? Consulta para traernos el usuario por su token
        where: {
            token,
            status: 'active'
        }
    })
    return data
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByToken
}