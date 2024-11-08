require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT || 3002,
    // Configuración de MySQL
    mysql: {
        host: process.env.MYSQL_HOST || "127.0.0.1",
        database: process.env.MYSQL_DATABASE || "hackaton",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "123456",
    },
    // Configuración de MongoDB
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/hackaton",
        user: process.env.MONGODB_USER || "",
        password: process.env.MONGODB_PASSWORD || "",
    },
    // Token apis
    tokendni: process.env.TOKEN_DNI || ""
};