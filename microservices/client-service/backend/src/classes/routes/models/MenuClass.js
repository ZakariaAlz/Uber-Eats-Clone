const MenuSchema = require("../models/MenuModel")

class Menu {

    static async create(menu) {

        const t = await MenuSchema.create(menu)
        return t
    }

    static async find() {

        const t = await MenuSchema.find().populate('article').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(menu_id) {

        const t = await MenuSchema.findById(menu_id).exec()
        return t
    }

    static async update(id, menu) {

        const t = await MenuSchema.updateOne({ _id: id }, { $set: menu }).exec()
        return t
    }

    static async remove(menu) {

        const t = await MenuSchema.deleteOne({ _id: menu }).exec()
        return t
    }

    static async findByRestaurant(restaurantId) {

        const t = await MenuSchema.find({restaurant: restaurantId}).sort({ $natural: -1 }).exec()
        return t
    }
}

module.exports = Menu