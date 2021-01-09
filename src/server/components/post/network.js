const ctrl = require('./controllers')
const express = require('express')
const router = express.Router()

//authorization for this route (error in verbose but anyway i love twice)
//router.use('/', (req, res, next) => isAuthenticated(req, res, next))

router.get('/getall', (req, res) => ctrl.getPosts(req, res))
router.get('/getonce/:idpost', (req, res) => ctrl.getPost(req, res))
router.get('/updateone',(req, res) => ctrl.updatePost(req, res))
router.post('/deleteone/:idpost', (req, res) => ctrl.deletePost(req, res))
router.post('/createone', (req, res) => ctrl.createPost(req, res))

module.exports = router