const TechnicalSchema = require("../models/TechnicalModel")
const bcrypt = require("bcryptjs")

class Technical {

    static async create(technical) {

        technical.password = await bcrypt.hash(technical.password, 10)
        const t = await TechnicalSchema.create(technical)
        return t
    }

    static async find() {

        const t = await TechnicalSchema.find().exec()
        return t
    }

    static async findById(Technical_id) {

        const t = await TechnicalSchema.findById(Technical_id).exec()
        return t
    }

    static async update(id, technical) {

        technical.password = await bcrypt.hash(technical.password, 10)
        const t = await TechnicalSchema.updateOne({ _id: id }, { $set: technical }).exec();
        return t;
    }

    static async remove(technical) {
        const t = await TechnicalSchema.deleteOne({ _id: technical }).exec()
        return t
    }

    static async findByEmail(email) {
        const t = await TechnicalSchema.findOne({ email: email }).exec()
        return t
    }

}

module.exports = Technical