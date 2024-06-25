const SaleSchema = require("../models/SaleModel")
const bcrypt = require("bcryptjs")

class Sale {

    static async create(sale) {

        sale.password = await bcrypt.hash(sale.password, 10)
        const t = await SaleSchema.create(sale)
        return t
    }

    static async find() {

        const t = await SaleSchema.find().exec()
        return t
    }

    static async findById(Sale_id) {

        const t = await SaleSchema.findById(Sale_id).exec()
        return t
    }

    static async update(id, sale) {

        sale.password = await bcrypt.hash(sale.password, 10)
        const t = await SaleSchema.updateOne({ _id: id }, { $set: sale }).exec();
        return t;
    }

    static async remove(sale) {
        const t = await SaleSchema.deleteOne({ _id: sale }).exec()
        return t
    }

    static async findByEmail(email) {
        const t = await SaleSchema.findOne({ email: email }).exec()
        return t
    }

}

module.exports = Sale