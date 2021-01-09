const express = require('express')
const router = express.Router()
const util = require('../utils/passport')

router.post('/login?:username?:password', util.passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home' }))

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) res.render('pages/home')
    else res.render('pages/login')
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.render('pages/login')
})

router.get('/register', (req, res) => {
    res.render('pages/register')
})

router.get('/home', (req, res) => {
    console.log('isAuth', req.isAuthenticated())
    if (req.isAuthenticated()) res.render('pages/home')
    else res.render('pages/login')
})

router.get('/profile',(req,res)=>{
    if(req.user){
        let nickname = req.user.nickname
        console.log('nickname', nickname)
        if (nickname) res.redirect(`/profile/${nickname}`) 
    }else res.send({msg : 'no hay nickname'})
   
})

router.get('/profile/:username',(req,res)=>{
    if (req.isAuthenticated()) res.render('pages/profile')
    else res.render('pages/login')
    
})

router.get('/test',(req,res)=>{
    res.render('pages/pruebas')
})

module.exports = router