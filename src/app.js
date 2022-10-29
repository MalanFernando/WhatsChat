//? Dependencies
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
//* Routes
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const conversationRouter = require('./conversations/conversations.router')
//? Files
const { port } = require('./config');
const initModels = require('./models/initModels')
const db = require('./utils/database');

//? Initial Configs
const app = express();
app.use(express.json());

db.authenticate() // ? Authenticate database credentials
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))

db.sync() //? Sync sequelize models
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))
initModels()

//?Configuración de Socket.IO
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('Connection Socket.io')
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/concesartions', conversationRouter)


httpServer.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});