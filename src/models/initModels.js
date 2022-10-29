const Users = require('./users.models')
const Messages = require('./message.models')
const Conversations = require('./conversations.models')
const Participants = require('./participants.models')

const initModels = () => {

    //? Un usuario tiene muchas conversaciones
    Users.belongsToMany(Conversations, { through: Participants })
    //? una conversación tiene muchas usuario
    Conversations.belongsToMany(Users, { through: Participants })

    //? Un mensaje, pertenece a un usuario
    Messages.belongsTo(Users)
    //? Un usuario tiene muchos mensajes
    Users.hasMany(Messages)

    //? Un usuario tiene Muchas conversaciones
    // Users.belongsToMany(Conversations, { through: Messages})
    //? Una conversación tiene muchos usuarios
    // Conversations.belongsToMany(Users, { through: Messages })

    //? Un Participante tiene muchas conversaciones
    Participants.hasMany(Conversations)
    //? Una Conversations tiene muchos participantes
    Conversations.hasMany(Participants)

    //? Un mensaje, pertenece a una Conversation
    Messages.belongsTo(Conversations)
    //? Una Conversations tiene muchos mensajes
    Conversations.hasMany(Messages)

}

module.exports = initModels