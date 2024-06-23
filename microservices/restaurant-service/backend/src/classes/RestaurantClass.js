const RestaurantSchema = require("../models/RestaurantModel")
// const bcrypt = require("bcryptjs")

class Restaurant {

    static async create(restaurant) {
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
        
        const t = await RestaurantSchema.updateOne({ _id: id }, { $set: restaurant }).exec();
        return t;
    }

    static async remove(restaurant) {
        const t = await RestaurantSchema.deleteOne({ _id: restaurant }).exec()
        return t
    }

    // static async findByUsername(username) {
    //     const t = await AdminSchema.findOne({ username: username }).exec()
    //     return t
    // }

}

module.exports = Restaurant