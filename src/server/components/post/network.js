const ctrl = require('./controllers')
const express = require('express')
const router = express.Router()

//authorization for this route (error in verbose but anyway i love twice)
//router.use('/', (req, res, next) => isAuthenticated(req, res, next))

//temporal solution
const response = require('../../utils/response')
function isAuthorized(req, res, next) {
    if (req.isAuthenticated()) return next()
    else response.error(res,'your not auth (temp)')
}

router.get('/getall',(req,res,next) => isAuthorized(req,res,next), (req, res) =>  ctrl.getPosts(req, res))
router.get('/getonce/:idpost',(req,res,next) => isAuthorized(req,res,next) ,(req, res) => ctrl.getPost(req, res))
router.get('/updateone',(req,res,next) => isAuthorized(req,res,next),(req, res) => ctrl.updatePost(req, res))
router.post('/deleteone/:idpost',(req,res,next) => isAuthorized(req,res,next) ,(req, res) => ctrl.deletePost(req, res))
router.post('/createone',(req,res,next) => isAuthorized(req,res,next) ,(req, res) => ctrl.createPost(req, res))

module.exports = router