const express = require("express")




const user = require('./user')




const router = express.Router()



// Apply the auth middleware to all routes except login

router.use('/user', user)




module.exports = router