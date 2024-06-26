const LogSchema = require("../models/LogModel")

class Log {

    static async create(log) {

        const t = await LogSchema.create(log)
        return t
    }
    

    static async find() {

        const t = await LogSchema.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(log_id) {

        const t = await LogSchema.findById(log_id).exec()
        return t
    }

    
    static async update(id, log) {

        const t = await LogSchema.updateOne({ _id: id }, { $set: log }).exec()
        return t
    }

    static async remove(log) {

        const t = await LogSchema.deleteOne({ _id: log }).exec()
        return t
    }

    static async findByRestaurant(restaurant) {

        const t = await LogSchema.find({restaurant: restaurant}).sort({ $natural: -1 }).exec()
        return t
    }
}

module.exports = Log