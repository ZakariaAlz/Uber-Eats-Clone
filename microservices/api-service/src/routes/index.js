const express = require("express")



const auth = require("./auth")
const admin = require('./admin')
const article = require('./article')
const client = require('./client')
const cmdarticle = require('./cmdarticle')
const pub = require('./pub')
const versement = require('./versement')

const router = express.Router()



// Apply the auth middleware to all routes except login
router.use('/auth', auth)
router.use('/admin', admin)
router.use('/article', article)
router.use('/client', client)
router.use('/cmdarticle', cmdarticle)
router.use('/pub', pub)
router.use('/versement', versement)



module.exports = router