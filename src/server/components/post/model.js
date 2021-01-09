const connection = require('../../utils/connection')

const selectPostsByUser = (query,callback) => {
    connection.query(query,callback)
}

const selectPostWithIdUser = (query,callback) => {
    connection.query(query,callback)
}

const deletePostWithIdUser = (query,callback) => {
    connection.query(query,callback)
}

const updatePostWithIdUser = (query,callback) =>{
    connection.query(query,callback)
}

const createPost = (query,callback) => {
    connection.query(query,callback)
}

module.exports = {
    selectPostWithIdUser,
    selectPostsByUser,
    deletePostWithIdUser,
    updatePostWithIdUser,
    createPost} 