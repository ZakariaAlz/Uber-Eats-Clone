const DeveloperSchema = require("../models/DeveloperModel")
const bcrypt = require("bcryptjs")

class Developer {

    static async create(developer) {

        developer.password = await bcrypt.hash(developer.password, 10)
        const t = await DeveloperSchema.create(developer)
        return t
    }

    static async find() {

        const t = await DeveloperSchema.find().exec()
        return t
    }

    static async findById(developer_id) {

        const t = await DeveloperSchema.findById(developer_id).exec()
        return t
    }

    static async update(id, developer) {
        
        developer.password = await bcrypt.hash(developer.password, 10)
        const t = await DeveloperSchema.updateOne({ _id: id }, { $set: developer }).exec();
        return t;
    }

    static async remove(developer) {
        const t = await DeveloperSchema.deleteOne({ _id: developer }).exec()
        return t
    }

    static async findByEmail(email) {
        const t = await DeveloperSchema.findOne({ email: email }).exec()
        return t
    }

}

module.exports = Developer