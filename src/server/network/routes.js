const user = require('../components/user/network')
const routesPages = require('./routespages')

function routes(app){
    app.use('/api/user',user)
    app.use('/',routesPages)
}

module.exports = routes 