const express = require('express');

const UserController = require('../classes/UserClass');



const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/checkAuth", UserController.checkAuth);



module.exports = router;

