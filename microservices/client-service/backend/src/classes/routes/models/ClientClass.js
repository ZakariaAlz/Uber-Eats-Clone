const ClientSchema = require("../models/ClientModel")
const bcrypt = require("bcryptjs")

class Client {

    static async create(client) {

        client.password = await bcrypt.hash(client.password, 10)
        const t = await ClientSchema.create(client)
        return t
    }

    static async find() {

        const t = await ClientSchema.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(client_id) {

        const t = await ClientSchema.findById(client_id).exec()
        return t
    }

    static async update(id, client) {
        client.password = await bcrypt.hash(client.password, 10)
        const t = await ClientSchema.updateOne({ _id: id }, { $set: client }).exec()
        return t
    }

    static async remove(client) {

        const t = await ClientSchema.deleteOne({ _id: client }).exec()
        return t
    }

    static async findByEmail(email) {

        const t = await ClientSchema.findOne({ email: email }).exec()
        return t
    }
}

module.exports = Client