const mysql = require('mysql')

module.exports = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: 'social-network'
})