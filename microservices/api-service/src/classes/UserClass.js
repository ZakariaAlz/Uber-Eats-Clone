const { users } = require('../SQLmodels');
const bcrypt = require('bcrypt');
const ClientSchema = require('../models/ClientModel');
const DeliverySchema = require('../models/DeliveryModel');
const RestaurantSchema = require('../models/RestaurantModel');

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

    }

    static async findAll(req, res) {
        try {
            const user = await users.findAll();
            res.status(200).json(user);
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
            const { first_name, last_name, phone, email, password, state } = req.body;

            // Hash the password if it's being updated
            let updatedData = { first_name, last_name, phone, email, state, role };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            // Update the user in SQL database
            const [updated] = await users.update(updatedData, { where: { id: req.params.id } });
            if (updated) {
                const updatedUser = await users.findByPk(req.params.id);

                // Update the user in MongoDB based on role
                let mongoUser;
                switch (role) {
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
            const deleted = await users.destroy({ where: { id: req.params.id } });
            if (deleted) {
                // Delete the user in MongoDB based on role
                const role = req.originalUrl.split('/')[1];
                let mongoUser;
                switch (role) {
                    case 'client':
                        mongoUser = await ClientSchema.deleteOne({ _id: req.params.id }).exec();
                        break;
                    case 'delivery':
                        mongoUser = await DeliverySchema.deleteOne({ _id: req.params.id }).exec();
                        break;
                    case 'restaurant':
                        mongoUser = await RestaurantSchema.deleteOne({ _id: req.params.id }).exec();
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
}

module.exports = UserController;
