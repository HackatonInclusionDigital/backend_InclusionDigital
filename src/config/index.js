require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT || 3002,
    // Configuración de MySQL
    mysql: {
        host: process.env.MYSQL_HOST || "",
        database: process.env.MYSQL_DATABASE || "",
        user: process.env.MYSQL_USER || "",
        password: process.env.MYSQL_PASSWORD || "",
    },
    // Configuración de MongoDB
    mongodb: {
        uri: process.env.MONGODB_URI || "",
        user: process.env.MONGODB_USER || "",
        password: process.env.MONGODB_PASSWORD || "",
    },
};