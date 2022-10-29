const bcrypt = require('bcrypt');

//? Encriptar el password
const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10);
}

//? Comparar si la comtraseña es la misma
const comparePassword = (plainPassword, hashPassword) => {
    //* plainPassword: Contraseña que recibimos del login
    //* hashPassword: Contraseña que tenemos guardada en la base de datos
    //? Esta utilidad se usa cuando hacemos un login y recibimos la contraseña del usuario
    //? y la comparamos con la que tenemos en la DB
    return bcrypt.compareSync(plainPassword, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}