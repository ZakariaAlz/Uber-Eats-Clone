const express = require('express');

const UserController = require('../classes/UserClass');
const authMiddleware = require('../middleware/authmiddleware');




const router = express.Router();
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/checkAuth", UserController.checkAuth);
router.get('/:id',authMiddleware, UserController.findOne);
router.put('/:id',authMiddleware, UserController.update);
router.delete('/:id',authMiddleware, UserController.delete);



module.exports = router;

