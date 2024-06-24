const users = require('../SQLmodels');
const bcrypt = require('bcrypt');
const ClientSchema = require('../models/ClientModel');
const DeliverySchema = require('../models/DeliveryModel');
const RestaurantSchema = require('../models/RestaurantModel');
const users = require('../SQLmodels/users');

const saltRounds = 10;

class UserController {

    static async create(req, res) {
        try {
            const role = req.originalUrl.split('/')[1]; // Extract the role from the URL
            const { email, password } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user in SQL database
            const sqlUser = await users.create({ email, password: hashedPassword, role });

            // Create the user in MongoDB based on role
            const mongoUser = { ...req.body, password: hashedPassword };

            let createdMongoUser;
            switch (role) {
                case 'Client':
                    createdMongoUser = await ClientSchema.create(mongoUser);
                    break;
                case 'Delivery':
                    createdMongoUser = await DeliverySchema.create(mongoUser);
                    break;
                case 'Restaurant':
                    createdMongoUser = await RestaurantSchema.create(mongoUser);
                    break;
                default:
                    return res.status(400).json({ error: 'Invalid role specified' });
            }

            res.status(201).json({ sqlUser, createdMongoUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    static async findAll(req, res) {
        try {
            const users = await users.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findOne(req, res) {
        try {
            const user = await users.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const role = req.originalUrl.split('/')[1]; // Extract the role from the URL
            const { name, email, password, phonenumber, adress, state } = req.body;

            // Hash the password if it's being updated
            let updatedData = { name, email, password, phonenumber, adress, state };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            // Update the user in SQL database
            const [updated] = await users.update(updatedData, { where: { id: req.params.id } });
            if (updated) {
                const updatedUser = await users.findByPk(req.params.id);

                // Update the user in MongoDB based on role
                let mongoUser;
                switch (role.toLowerCase()) {
                    case 'client':
                        mongoUser = await ClientSchema.updateOne({ email }, { $set: updatedData }).exec();
                        break;
                    case 'delivery':
                        mongoUser = await DeliverySchema.updateOne({ email }, { $set: updatedData }).exec();
                        break;
                    case 'restaurant':
                        mongoUser = await RestaurantSchema.updateOne({ email }, { $set: updatedData }).exec();
                        break;
                    default:
                        return res.status(400).json({ error: 'Invalid role specified' });
                }

                res.status(200).json({ updatedUser, mongoUser });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async delete(req, res) {
        try {
            // Delete the user in SQL database
            const deleted = await users.destroy({ where: { id: req.params.id } });
            if (deleted) {
                // Extract the role from the URL
                const role = req.originalUrl.split('/')[1];

                // Delete the user in MongoDB based on role
                let mongoUser;
                switch (role.toLowerCase()) {
                    case 'client':
                        mongoUser = await ClientSchema.deleteOne({ sqlId: req.params.id }).exec();
                        break;
                    case 'delivery':
                        mongoUser = await DeliverySchema.deleteOne({ sqlId: req.params.id }).exec();
                        break;
                    case 'restaurant':
                        mongoUser = await RestaurantSchema.deleteOne({ sqlId: req.params.id }).exec();
                        break;
                    default:
                        return res.status(400).json({ error: 'Invalid role specified' });
                }

                res.status(204).json({ message: 'User deleted', mongoUser });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async signup(req, res) {
        try {
            const role = req.originalUrl.split('/')[1]; // Extract the role from the URL

            const { email, password } = req.body;
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create the user in SQL database
            const sqlUser = await users.create({ email, password: hashedPassword, role });

            // Create the user in MongoDB based on role
            const mongoUser = { ...req.body, password: hashedPassword, sqlId: sqlUser.id };

            let createdMongoUser;
            switch (role.toLowerCase()) {
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

            res.status(201).json({ message: 'User created successfully', sqlUser, createdMongoUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const role = req.originalUrl.split('/')[1]; // Extract the role from the URL
            const { email, password } = req.body;

            // Find the user in SQL database
            const user = await users.findOne({
                where: {
                    email: email,
                    role: role
                }
            });

            // Check if user exists and password is correct
            if (user && await bcrypt.compare(password, user.password)) {
                // Generate a JWT accessToken
                const accessToken = jwt.sign(
                    { 
                        id: user.id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_SECRET_KEY, // Use an environment variable for the secret key
                );

                // Send the response
                res.status(200).json({ message: 'Login successful', accessToken, userInfo: user });
            } else {
                res.status(401).json({ error: 'Invalid email, password, or role' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static checkAuth(req, res) {
        const accessToken = req.header("accessToken"); // Get accessToken from the accessToken header
        if (!accessToken) {
            return res.status(401).json({ error: 'Access denied. No accessToken provided.' });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            res.status(200).json({ valid: true, user: decoded });
        } catch (error) {
            res.status(400).json({ valid: false, error: 'Invalid accessToken.' });
        }
    }
}

module.exports = UserController;
