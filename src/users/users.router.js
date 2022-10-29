const router = require('express').Router();
const userServices = require('./users.services')
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
require('../middlewares/auth.middleware')(passport)

//? Rutas raiz
router.get('/', passport.authenticate('jwt', { session: false }), userServices.getAllUsers)

//? Ruta de información propia del usuario
router.route('/me')
    .get( passport.authenticate('jwt', { session: false }), userServices.getMyUser)
    .patch( passport.authenticate('jwt', { session: false }), userServices.patchMyUser)
    .delete( passport.authenticate('jwt', { session: false }),userServices.deleteMyUser )

//? Rutas dinamicas por ID
//* Ruta /api/v1/users
router.route('/:id')
    .get(userServices.getUserById)
    .patch(passport.authenticate('jwt', { session: false }), adminValidate, userServices.patchUser)
    .delete(passport.authenticate('jwt', { session: false }), adminValidate, userServices.deleteUser)
    
module.exports = router;