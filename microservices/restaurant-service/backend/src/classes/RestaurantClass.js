const RestaurantSchema = require("../models/RestaurantModel")
const bcrypt = require("bcryptjs")

class Restaurant {

    static async create(restaurant) {

        restaurant.password = await bcrypt.hash(restaurant.password, 10)
        const t = await RestaurantSchema.create(restaurant)
        return t
    }

    static async find() {

        const t = await RestaurantSchema.find().exec()
        return t
    }

    static async findById(restaurant_id) {

        const t = await RestaurantSchema.findById(restaurant_id).exec()
        return t
    }

    static async update(id, restaurant) {
        
        restaurant.password = await bcrypt.hash(restaurant.password, 10)
        const t = await RestaurantSchema.updateOne({ _id: id }, { $set: restaurant }).exec();
        return t;
    }

    static async remove(restaurant) {
        const t = await RestaurantSchema.deleteOne({ _id: restaurant }).exec()
        return t
    }

    static async findByEmail(email) {
        const t = await RestaurantSchema.findOne({ email: email }).exec()
        return t
    }
    
    static async findBySqlid(sqlId) {
        const t = await RestaurantSchema.findOne({ sqlId: sqlId }).exec()
        return t
    }

}

module.exports = Restaurant