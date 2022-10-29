//? Dependencies
const Sequelize = require('sequelize')

//? Files
const config = require('../config')

const db = new Sequelize({
    dialect: 'postgres',
    host: config.db.host,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
})

module.exports = db