const { Router } = require('express')
const express = require('express')
const router = express.Router()

router.get('/home',(req,res) => {
    res.render('pages/landingpage')
})

router.get('/login',(req,res)=>{
    res.render('pages/login')
})

router.get('/register',(req,res)=>{
    res.render('pages/register')
})

module.exports = router