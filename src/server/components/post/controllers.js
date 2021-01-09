const model = require('./model')
const response = require('../../utils/response')

const getPosts = (req,res) => {
    let userId 
    if (req.user){
        userId = req.user.idUser;
        console.log('userId : ',userId)
        let query = ` select * from post where idUser = '${userId}' `
        model.selectPostsByUser(query, (error, result, fieldset) => {
            if (error) response.error(res, error)
            else {
                let posts = result
                response.success(res, posts)
            }
        })
    }else response.error(res,'your not authenticated and, how pass to here ? ')    
}
const getPost = (req,res) =>{
    if (req.params){
        let {idUser} = req.user
        let {idpost} = req.params
        console.log(req.params)
        let query = `select * from post where idPost = ${idpost} AND idUser=${idUser} `
        model.selectPostWithIdUser(query, (error, result, fieldset) => {
            if (error) response.error(res,error)
            else {
                let post = result[0]
                if (post) response.success(res,post)
                else response.error(res,'id-post not correspond with the posts created by the user')
            }
        })
    }else response.error(res,'your not send me a params indicated the id of the post')
}
const updatePost = (req,res) =>{
    if (req.body){
        let {idPost, text_, idCategory1, idCategory2, idCategory3} = req.body
        let query = `
        update post 
        set 
        text_ = '${text_}',
        idCategory1 = ${idCategory1},
        idCategory2 = ${idCategory2},
        idCategory3 = ${idCategory3}
        where idPost = ${idPost};`
        model.updatePostWithIdUser(query, (error, result, fieldset) => {
            if (error) response.error(res,error)
            else {
                let responseQuery = result
                response.success(res,responseQuery)
            }
        })  
    }else response.error(res,'need send a request body with data to insert')
}
const deletePost = (req,res) =>{
    if (req.params){
        let { idPost } = req.params
        let query = ``
        model.deletePostWithIdUser(query, (error, result, fieldset) => {
            if (error) response.error(res,'query error')
            else{
                let responseQuery = result
                response.success(res,responseQuery)
            }
        })
    }else response.error(res,'dont detect any param required for this action')
}
const createPost = (req,res) =>{
    if (req.user === null || req.user === undefined) response.error(res,'user dont finded, authorizise denied')
    if(req.body){
        let {idUser} = req.user 
        let {text_,idCategory1,idCategory2,idCategory3} = req.body
        let query = `insert into post(idUser,text_,idCategory1,idCategory2,idCategory3) values(${idUser},'${text_}',${idCategory1},${idCategory2},${idCategory3});`
        model.createPost(query, (error, result, fieldset) => {
            if (error) response.error(res,error)
            else {
                let responseQuery = result
                response.success(res,responseQuery)
            }
        })
    }else response.error(res,'error in creation')
}
module.exports = { 
    getPost, 
    getPosts,
    updatePost,
    deletePost,
    createPost}