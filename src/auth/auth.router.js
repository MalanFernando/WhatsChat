//? Auth va a contener las rutas de autorización y autenticación
//* Login
//* Register
//* Recovery Password
//* Verify User
const router = require('express').Router()
const authServices = require('./auth.services')
const { registerUser } = require('../users/users.services')


//? /api/vi/auth
router.post('/register', registerUser)
router.post('/login', authServices.login)
router.get('/user-confirm/:token', authServices.confirm )
router.post('/forgot-password', authServices.forgotPassword)
router.post('/forgot-password/:token', authServices.newPassword)

module.exports = router;