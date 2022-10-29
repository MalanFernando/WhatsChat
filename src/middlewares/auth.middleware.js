//? Middleware para proteger rutas
//* 1.- Revisar si existe un token
//* 2.- Verificar si el token pertenece a un usuario valido
//* 3.-  Modificar el req y agrega req.user con la inforamcion desencriptada del token

const JwtStrategy = require('passport-jwt').Strategy //? Passport maneja estrategias(maneras de hacer un login Facebook, Google, JWT...) para las direfentes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt //? Extrae los header de la petición 
const { jwtSecret } = require('../config')
const { getUserById } = require('../users/users.controllers')


module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }

    passport.use(
        new JwtStrategy(options, async (decoded, done) => { //? done(error, decoded) 
            try {
                const response = await getUserById(decoded.id)
                if (!response) {
                    return done(null, false)
                }
                // console.log('decoded JWT', decoded)
                return done(null, decoded);
            } catch (error) {
                return done(error.message, false)
            }
        })
    )
}

