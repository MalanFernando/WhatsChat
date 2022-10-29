const { DataTypes }  = require('sequelize')
const Users = require('./users.models')
const Conversations = require('./conversations.models')
const db = require('../utils/database')

const Participants = db.define('Participants',{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'conversation_id',
        references: {
            key: 'id',
            model: Conversations
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: { //? Llave foranea de Users
            key: 'id',
            model: Users
        }
    }
})

module.exports = Participants