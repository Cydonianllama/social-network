const connection = require('../../utils/connection')

function insertUser(query_,callback){
    connection.query(query_,callback)
}

function selectUserWhere(callback){
    connection.query('select * from user_',callback)
}

function findUser(query_,callback){
    connection.query(query_,callback)
}

function updateUser(callback){
    connection.query(query,callback)
}

function deleteUser(callback){
    connection.query(query_,callback)
}

module.exports = {selectUserWhere,findUser,updateUser,deleteUser,insertUser}