const express = require('express')
const app = express()
const routes = require('./network/routes')
const path = require('path')
const cookieParser = require('cookie-parser')

const integrationSession = require('./utils/session')
const integrationPassport = require('./utils/passport')

//configuration
require('dotenv').config()

//use for session cookies
app.use(cookieParser(process.env.SECRET))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/controller',express.static(path.resolve('src','client','controllers')))
app.use('/styles',express.static(path.resolve('src','client','styles')))

app.set('views', path.resolve('src', 'server','views'))
app.set('view engine', 'ejs')

integrationSession(app)
integrationPassport.integrationPassport(app)

routes(app)

app.get('/',(req,res)=>{
    res.render('pages/landingpage')
})

app.listen(process.env.PORT,(err)=>{
    if (err) console.log(err)
    else console.log('success in port :',process.env.PORT)
})