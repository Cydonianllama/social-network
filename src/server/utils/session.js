const connection = require('../utils/connection')
const session = require('express-session')
const mysqlSTORE= require('express-mysql-session')(session)

const mysqlStore_ = new mysqlSTORE({}
    ,connection)

function integration(app){
    app.use(session({
        secret : process.env.SECRET,
        store : mysqlStore_,
        resave : true,
        saveUninitialized : true 
    }))
}

module.exports = integration;