const users = require('../SQLmodels/users');
const bcrypt = require('bcrypt');
const ClientSchema = require('../models/ClientModel');
const DeliverySchema = require('../models/DeliveryModel');
const RestaurantSchema = require('../models/RestaurantModel');
const Log = require('../models/LogModel');

const saltRounds = 10;

class UserController {

    static async signup(req, res) {
        try {
            const role = req.headers.role; // Extract the role from the URL
            const { name, email, password, phonenumber, adress, referralCodeused } = req.body;
            const randomHash = crypto.randomBytes(12).toString('base64').slice(0, 12)


            // Hash the password
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create the user in SQL database
            const sqlUser = await users.create({ email, password: hashedPassword, role });

            // Create the user in MongoDB based on role
            const mongoUser = { name, email, phonenumber, adress, referralCodeowned: randomHash, vehicle, referralCodeused: referralCodeused || 'none', password: hashedPassword, sqlId: sqlUser.id, state: 'activated' };

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
            const log = new Log({ value: `A new account with the email: ${email} and the role: ${role} has been created`, type: "authentication" });
            await log.save();
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
                const log = new Log({ value: `${email} with the role: ${role} has logged in`, type: "authentication" });
                await log.save();
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
        const role = req.headers.role; // Extract the role from the URL
        const accessToken = req.header("accessToken") // Get accessToken from the accessToken header
        if (!accessToken) {
            return res.status(401).json({ error: 'Access denied. No accessToken provided.' });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            if (role !== decoded.role) {
                return res.status(401).json({ error: 'Access denied. The role is unvalid.' });
            }
            res.status(200).json({ valid: true, user: decoded });
        } catch (error) {
            res.status(400).json({ valid: false, error: 'Invalid accessToken.' });
        }
    }
}

module.exports = UserController;
