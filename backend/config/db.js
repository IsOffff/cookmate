const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "mysql",
    user: process.env.MYSQL_USER || "cookmate",
    password: process.env.MYSQL_PASSWORD || "cookmate",
    database: process.env.MYSQL_DATABASE || "cookmate",
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();