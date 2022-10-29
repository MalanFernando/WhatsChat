const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Users = db.define('users',{
    id : {
        primaryKey: true, 
        type: DataTypes.UUID,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    }, 
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profileImage:{
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
        field: 'profile_image'
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }, 
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_verified'
    }
})

module.exports = Users;