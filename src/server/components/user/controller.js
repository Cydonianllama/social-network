const model = require('./model')

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function RegisterUser(req,res){

    const {fullname , username , password ,description , birthdate} = req.body
    let dateCreation = formatDate(new Date().toString())

    console.log(req.body)
    if (req.body === null || req.body === undefined) res.send({success : false})
    
    let query = `call createuser('${dateCreation}','${password}','${username}','${description}','${fullname}','${birthdate}');`
    
    model.insertUser(query,(error,result,fieldset)=>{
        if (error) res.send({success : false})
        else {
            res.send({result})
        }
    })

}

function login(req,res){

    if(req.body === null || req.body === undefined) res.send({success : false})

    model.findUser(`select * from user_ where nickname = '${req.body.username}' `,(error,result,fieldset)=>{
        console.log(result)
        if (error) res.send({success : false})
        else {
            if (result === null) res.send({response : 'no user'})
            else {
                if (result.length === 1) {
                    if (result[0].nickname === req.body.username){
                        if (result[0].password_ === req.body.password){
                            console.log('exito')
                            res.send({response : 'a code for you'})
                        }
                        else{
                            res.send({response:'incorrect password'})
                        }
                    }else{
                        res.send({response : 'incorrect password'})
                    }
                    
                }else{
                    res.send({response : 'internaly error'})
                }
            }
        }
    })
}

function deleteAcountUser(req,res){
    model.deleteUser(`delete from user_ where nickname = '${req.body.username}' `,(error,result,fieldset)=>{
        if (error) res.send({success : false})
        else{
            res.send({result})
        }
    })
}

function updateInformationAccountUser(req,res){
    if (req.body === null || req.body === undefined) res.send({success : false})
    model.updateUser(``,(err,result,fieldset) => {
        if (err) res.send({success : false})
        else {
            res.send({result})
        }
    })
}

function logout(req,res){
    res.send({response : 'logout success'})
}

module.exports = {login,logout,RegisterUser,deleteAcountUser,updateInformationAccountUser}