const response = require('./response')

const isAuthenticated_ = (req,res,next) => {
    console.log('user _ in is auth : ', req.user)
    console.log('for utils isAuth : ',req.isAuthenticated())
    if (req.isAuthenticated()) return next()
    else return response.error(res, 'not authenticated (from middleware)')
}

module.exports = isAuthenticated_