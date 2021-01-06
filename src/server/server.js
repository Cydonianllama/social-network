const express = require('express')
const app = express()
const routes = require('./network/routes')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/controller',express.static(path.resolve('src','client','controllers')))
app.use('/stylse',express.static(path.resolve('src','client','styles')))

app.set('views', path.resolve('src', 'server','views'))
app.set('view engine', 'ejs')

routes(app)

//configuration
require('dotenv').config()


app.get('/',(req,res)=>{
    res.render('pages/landingpage')
})

app.listen(process.env.PORT,(err)=>{
    if (err) console.log(err)
    else console.log('success in port :',process.env.PORT)
})