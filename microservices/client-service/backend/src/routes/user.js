const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../SQLmodels/users'); // Adjust the path as necessary
const ClientSchema = require('../models/ClientModel');
const DeliverySchema = require('../models/DeliveryModel');
const RestaurantSchema = require('../models/RestaurantModel');
const UserController = require('../classes/UserClass');



const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const role = req.originalUrl.split('/')[1]; // Extract the role from the URL
        const { email, password, ...rest } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in SQL database
        const sqlUser = await users.create({ email, password: hashedPassword, role });

        // Add the SQLid to the MongoDB user data
        const mongoUser = { ...rest, email, password: hashedPassword, role, id: sqlUser.id };

        let createdMongoUser;
        switch (role) {
            case 'client':
                createdMongoUser = await ClientSchema.create(mongoUser);
                break;
            case 'delivery':
                createdMongoUser = await DeliverySchema.create(mongoUser);
                break;
            case 'restaurant':
                createdMongoUser = await RestaurantSchema.create(mongoUser);
                break;
            default:
                return res.status(400).json({ error: 'Invalid role specified' });
        }

        res.status(201).json({ sqlUser, createdMongoUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/checkAuth", UserController.checkAuth);



module.exports = router;

