const { getUserByEmail, getUserByToken } = require('../users/users.controllers')
const { comparePassword, hashPassword} = require('../utils/crypto')
const generateToken  = require('../utils/generateToken');
const Users = require('../models/users.models')

//* Email y Password del usuario

//? Email es único en la base de datos
const loginUser = async (email, password) => {
    //* Este controllador tiene 2 posibles respuestas  1.- Las credenciales son válidad y retornamos el usuario  2.- las credenciales con invalidad y retornamos false
    try {
        const user = await getUserByEmail(email)
        //? user.password contiene la contraseña encriptada de mi base de datos
        const verifiedPassword = comparePassword(password, user.password)
        if (verifiedPassword) {
            return user
        }
         return false
    } catch (error) {
        return error
    }
}

//? Confirma Cuenta del usuario
const confirmByUser = async (token) => {
    try {
        const data = {
            token: '',
            isVerified: true
        }
        const userConfirm = await Users.update(data,{
            where: {
                token
            }
        })
        return userConfirm
    } catch (error) {
        return error
    }
}

//? Generar Token para restablecer password
const forgotPasswordByUser = async (email) => {
    try {
        const data = {
            token: generateToken()
        }
        const resetPassword = await Users.update(data, {
            where: {
                email, 
                status: 'active'
            }
        })
        return resetPassword
    } catch (error) {
        return error
    }
}

//? Se guarda el nuevo password del usuario
const resetPasswordByUser = async (token, password) => {
    try {
        const newPassword = {
            token: '',
            password: hashPassword(password)
        }
        const updatePassword = await Users.update(newPassword, {
            where: {
                token
            },
            status: 'active'
        })
        return updatePassword
    } catch (error) {
        return error
    }
}

module.exports = {
    loginUser,
    confirmByUser,
    forgotPasswordByUser,
    resetPasswordByUser,
}

