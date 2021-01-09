const user = require('../components/user/network')
const posts = require('../components/post/network')

const routesPages = require('./routespages')

function routes(app){
    app.use('/api/user',user)
    app.use('/post',posts)
    app.use('/',routesPages)
}

module.exports = routes 