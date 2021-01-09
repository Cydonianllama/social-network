function response(res,code,status,msg){
    return res.status(code).send({status , msg})
}

function error(res,msg){
    return response(res,500,'error',msg)
}

function success(res,msg){
    return response(res,200,'sucess',msg)
}

module.exports = {error,success}