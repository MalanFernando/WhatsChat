const { DataTypes }  = require('sequelize')
const db = require('../utils/database')
const Users = require('./users.models')

const Conversations = db.define('conversations',{
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'image_url'
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'created_by',
            references: {
                key: 'id',
                model: Users
            }
        }
})

module.exports = Conversations