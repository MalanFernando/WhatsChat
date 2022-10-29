//? Dependencies
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    db: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
    },
};
