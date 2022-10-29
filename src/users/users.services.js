const userControllers = require('./users.controllers')

//? Obtener la respuesta de todos los usuarios
const getAllUsers = (req, res) => {
    userControllers.getAllUsers()
        .then( response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).json({msg: err.message});
        })
}
//? obtener un solo usuario
const getUserById = (req, res) => {
    const id = req.params.id;
    userControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch( err => {
            res.status(404).json({msg: err.message});
        })
}

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday , gender, country } = req.body;    
    if (firstName && lastName && email && password && phone && birthday ) {
        userControllers.getUserByEmail(email)
            .then(data =>{
                if (data) {
                   return res.status(400).json({msg: 'Usuario ya registrado'})
                } else {
                    userControllers.createUser({ firstName, lastName, email, password, phone, birthday , gender, country })
                    .then( data => {
                        res.status(201).json({msg: 'Usuario registrado Correctamente', data})
                    })
                    .catch( err => {
                        res.status(400).json({msg: err.message});
                    })
                }
            })
    }   else {
        //? Error cuando no mandan todos lo datos necesarios para crear un usuario
        res.status(400).json({msg: 'Favor de completar los siguiente campos', fields: {
            firstName: 'String',
            lastName: 'String',
            email: 'example@example.com',
            password: 'string',
            phone: '+522784563452',
            birthday: 'YYYY/MM/DD'
        }})
    }
}

//? Actualiza un usuario con los datos necesarios
const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phone , gender, country } = req.body;
    userControllers.updateUser(id,  { firstName, lastName, phone , gender, country })
        .then(data => {
            if (data[0]) {
                res.status(200).json({msg: `Usuario con el id:${id}, editado correctamente`})
            } else {
                res.status(400).json({msg: 'ID Invalido'})
            }
        })
        .catch( err => { 
            res.status(400).json({msg: err.message});
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    userControllers.deleteUser(id)
        .then(data => {
            if(data) {
                res.status(204).json()
            } else {
                res.status(400).json({msg: 'ID Invalido'})
            }
        })
        .catch( err => {
            res.status(400).json({msg: err.message});
        })
}

// TODO rutas protegidas /me, con los verbos GET, PATCH, DELETE
//? Validaciones de usuarios autenticados
const getMyUser = (req, res) => {
    const id = req.user.id //? req.user contiene la informacion del token desencriptado
    userControllers.getUserById(id)
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const patchMyUser = (req, res) => {
    const id = req.params.id
    const { firstName, lastName, phone, country} = req.body;
    userControllers.updateUser(id, { firstName, lastName, phone, country})
        .then(data => {
            res.status(200).json({msg: `Usuario editado correctamente`})
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

//? Tipos de delete
//* 1. Por administrador
//* 2. Por mi mismo

const deleteMyUser = (req, res) => {
    const id = req.params.id;
    userControllers.deleteUser(id, {status: 'inactive'}) //? Cambiar el status a inactive, al momento de eliminar un usuario
        .then(() => {
            res.status(200).json({msg: `Usuario eliminado Correctamente`})
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    patchUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}