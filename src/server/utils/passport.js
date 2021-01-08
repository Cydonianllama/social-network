const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const connection =require('../utils/connection')

function integrationPassport(app){
    
    passport.use(new passportLocal(function(username,password,done){
        connection.query(
            `select * from user_ 
            where 
            nickname = '${username}' AND 
            password_ =  '${password}' `,
            (err,result,fieldset)=>{
            if (err) done(err)
            if (result) {
                var user = result[0]
                return done(null,user)
            }else done(null,false)
            done(null,false)
        })
    }))
    passport.serializeUser(function(user,done){
        done(null,user.idUser)
    })
    passport.deserializeUser(function(id,done){
        connection.query(
            `select * from user_ 
            where 
            idUser = ${id}`,
            (err, result, fieldset) => {
                if (err) done(err)
                if (result) {
                    var user = result[0]
                    return done(null, user)
                } else done(null, false)
                done(null, false)
            })
    })

    app.use(passport.initialize())
    app.use(passport.session())

}

module.exports = {integrationPassport,passport}