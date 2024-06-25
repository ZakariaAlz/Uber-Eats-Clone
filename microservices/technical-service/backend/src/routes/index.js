const express = require("express")



const article = require('./article')
const client = require('./client')
const commande = require('./commande')
const delivery = require('./delivery')
const menu = require('./menu')
const restaurant = require('./restaurant')
const developer = require('./Developer')
const component = require('./component')
const sale = require('./sale')
const technical = require('./technical')
const log = require('./log')









const router = express.Router()



// Apply the auth middleware to all routes except login
router.use('/article', article)
router.use('/client', client)
router.use('/commande', commande)
router.use('/delivery', delivery)
router.use('/menu', menu)
router.use('/restaurant', restaurant)
router.use('/developer', developer)
router.use('/component', component)
router.use('/sale', sale)
router.use('/technical', technical)
router.use('/log', log)








module.exports = router