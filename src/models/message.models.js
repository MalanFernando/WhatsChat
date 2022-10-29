const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const Conversations = require('./conversations.models')
const Users = require('./users.models')

const Messages = db.define('messages', { 
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'sender_id',
        references: {
            key: 'id',
            model: Users
        }
    },
    consersationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'conversation_id',
        references: {
            key: 'id',
            model: Conversations
        }
    },
    messages: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Messages